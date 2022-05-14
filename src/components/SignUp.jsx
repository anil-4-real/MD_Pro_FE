import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const navigate = useNavigate();

  const showToast = (message, type) => {
    toast(message, { type });
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + "users/signup",

        {
          email,
          name,
          password,
        }
      );
      if (res.data.statusCode === 201) {
        showToast("Account created successfully", "success");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else if (res.data.statusCode === 400) {
        showToast("Email already exists", "error");
        setButtonDisabled(false);
      } else {
        showToast("Something went wrong", "error");
        setButtonDisabled(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container min-h-screen">
      <div className="mt-16">
        <h1 className="text-3xl text-center p-4 text-slate-800 font-light dark:text-neutral-400">
          Sign Up
        </h1>
        <div
          className="py-4 px-2 bg-neutral-100 dark:bg-slate-900 shadow-lg rounded-md mt-6"
          noValidate
        >
          <div className="p-4 min-w-full">
            <label className="text-lg text-neutral-600 block dark:text-neutral-300">
              Name
            </label>
            {name.trim().length < 4 && (
              <div className="mb-2 text-xs text-red-600 dark:text-red-400">
                min 4 characters
              </div>
            )}
            <input
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              type="text"
              className="border rounded-md border-blue-500 p-2 w-full dark:bg-slate-300"
            />
          </div>
          <div className="p-4 min-w-full">
            <label className="text-lg text-neutral-600 block dark:text-neutral-300">
              Email
            </label>
            {!emailRegex.test(email) && (
              <div className="text-xs mb-2 text-red-600 dark:text-red-400">
                invalid email address
              </div>
            )}

            <input
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              type="email"
              className="border rounded-md border-blue-500 p-2 w-full dark:bg-slate-300"
            />
          </div>
          <div className="p-4 min-w-full">
            <label className="text-lg text-neutral-600 block dark:text-neutral-300">
              Password
            </label>
            {password.length < 4 && (
              <div className="text-xs mb-2 text-red-600 dark:text-red-400">
                min 4 characters
              </div>
            )}
            <input
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              type="password"
              className="border border-blue-500 rounded-md p-2  w-full dark:bg-slate-300"
            />
          </div>
          <div className="p-4 min-w-full">
            <label className="text-lg text-neutral-600 block dark:text-neutral-300">
              Confirm Password
            </label>
            {password !== confirmPassword && (
              <div className="text-xs mb-2 text-red-600 dark:text-red-400">
                passwords do not match
              </div>
            )}
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              type="password"
              className="border border-blue-500 rounded-md p-2  w-full dark:bg-slate-300"
            />
          </div>

          <div className="p-4">
            <button
              type="button"
              disabled={buttonDisabled}
              onClick={() => {
                if (
                  name.trim().length < 4 ||
                  email.trim() === "" ||
                  !emailRegex.test(email) ||
                  password.length < 4 ||
                  password !== confirmPassword
                ) {
                  showToast("Please fill all the fields correctly", "error");
                } else {
                  setButtonDisabled(true);
                  handleSignUp();
                }
              }}
              className="px-2 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-900 hover:ease-in duration-200"
            >
              Sign up
            </button>
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
            />

            <p className="text-center text-slate-600 dark:text-slate-400 my-6">
              already have an account? click&nbsp;
              <Link
                to="/login"
                className="text-blue-600 underline cursor-pointer"
              >
                here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
