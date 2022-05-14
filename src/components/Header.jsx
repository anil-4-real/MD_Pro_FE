import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import moonLight from "../assets/moonLight.png";
import sun from "../assets/sun.png";

const Header = () => {
  const [btnSrc, setBtnSrc] = useState(sun);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [renderLogout, setRenderLogout] = useState(
    localStorage.getItem("isAuthenticated") === "true" ? true : false
  );
  useEffect(() => {
    toggleDarkMode();
  }, []);

  const navRef = useRef(null);
  const navListRef = useRef(null);

  const toggleDarkMode = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setBtnSrc(moonLight);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setBtnSrc(sun);
    }
  };

  return (
    <header className="container flex items-center justify-between relative h-20">
      {/* brand */}
      <div className="flex flex-col">
        <h1
          onClick={() => {
            window.location.href = "/";
          }}
          className="italic cursor-pointer text-sky-500 font-bold text-2xl"
        >
          MD Pro.
        </h1>
        <sup className="text-sm text-slate-400 dark:text-neutral-300">
          A free to use Markdown tool
        </sup>
      </div>

      {/* navbar */}
      <nav ref={navRef} className="dark:text-neutral-300 hidden md:block">
        <ul ref={navListRef} className="list-none flex items-center">
          <li className="p-4 ml-4">
            <Link
              to="/"
              className="text-slate-700 dark:text-neutral-50 hover:border-b-2 hover:border-blue-700 p-1"
            >
              Home
            </Link>
          </li>

          {renderLogout ? (
            <>
              <li className="p-4 ml-4">
                <Link
                  to="/dashboard"
                  className="text-slate-700 dark:text-neutral-50 hover:border-b-2 hover:border-blue-700 p-1"
                >
                  Dashboard
                </Link>
              </li>
              <li className="hover:text-slate-600 dark:hover:text-neutral-50 p-4 ml-4">
                <button
                  onClick={() => {
                    localStorage.removeItem("isAuthenticated");
                    localStorage.removeItem("token");
                    window.location.href = "/";
                  }}
                  className="px-2 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-900 hover:ease-in duration-200"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="hover:text-slate-600 dark:hover:text-neutral-50 p-4 ml-4">
              <Link
                to="/login"
                className="px-2 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-900 hover:ease-in duration-200"
              >
                Login
              </Link>
            </li>
          )}
          <li className="p-4 ml-4">
            <button
              onClick={() => {
                if (localStorage.theme === "dark") {
                  localStorage.theme = "light";
                  toggleDarkMode();
                } else if (localStorage.theme === "light") {
                  localStorage.theme = "dark";
                  toggleDarkMode();
                }
              }}
              className="bg-neutral dark:bg-neutral-200 text-white font-bold p-1 rounded"
            >
              <img className="h-6 w-6" src={btnSrc} />
            </button>
          </li>
        </ul>
      </nav>
      <div
        className="cursor-pointer absolute right-8 md:hidden block"
        onClick={() => {
          setToggleMenu((prev) => !prev);
          if (!toggleMenu) {
            navRef.current.classList.add(
              "bg-neutral-50",
              "dark:bg-slate-900",
              "absolute",
              "top-16",
              "right-4",
              "w-full",
              "opacity-95"
            );
            navListRef.current.classList.remove("items-center");
            navListRef.current.classList.add("flex-col", "items-end");
            navRef.current.classList.remove("hidden");
          } else {
            navRef.current.classList.add("hidden");
            navListRef.current.classList.add("items-center");
            navListRef.current.classList.remove("flex-col", "items-end");
            navRef.current.classList.remove(
              "bg-neutral-50",
              "dark:bg-slate-900",
              "absolute",
              "top-16",
              "right-4",
              "w-full",
              "opacity-95"
            );
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="30px"
          viewBox="0 0 24 24"
          width="30px"
          fill="gray"
        >
          <path d="M0 0h24v24H0V0z" fill="none"></path>
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
        </svg>
      </div>
    </header>
  );
};

export default Header;
