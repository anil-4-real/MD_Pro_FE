import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const showToast = (message, type) => {
    toast(message, { type });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + "users/login",
        {
          email,
          password,
        }
      );
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("isAuthenticated", true);
        showToast("Login successful", "success");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 3000);
      } else if (res.status === 400) {
        showToast("Invalid Credentials", "error");
      } else {
        showToast("Something went wrong", "error");
      }
    } catch (e) {
      showToast("invalid credentials / something went wrong", "error");
    }
  };

  return (
    <div className="container  min-h-screen">
      <div className="mt-16">
        <h1 className="text-3xl text-center p-4 text-slate-800 font-light dark:text-neutral-400">
          Login
        </h1>
        <div className="py-4 px-2 bg-neutral-100 dark:bg-slate-900 shadow-lg rounded-md mt-6">
          <div className="p-4 min-w-full">
            <label className="text-lg text-neutral-600 block dark:text-neutral-300">
              Email
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="border rounded-md border-blue-500 p-2 w-full dark:bg-slate-300"
            />
          </div>
          <div className="p-4 min-w-full">
            <label className="text-lg text-neutral-600 block dark:text-neutral-300">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              type="password"
              className="border border-blue-500 rounded-md p-2  w-full dark:bg-slate-300"
            />
          </div>

          <div className="p-4">
            <button
              type="button"
              onClick={handleLogin}
              className="px-2 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-900 hover:ease-in duration-200"
            >
              Login
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
              new user? click&nbsp;
              <Link
                to="/signup"
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

export default Login;
