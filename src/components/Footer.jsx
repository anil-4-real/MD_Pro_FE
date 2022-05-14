import React from "react";

const Footer = () => {
  //create a footer
  return (
    <div className="container h-full">
      <footer className="flex flex-col justify-center items-center mt-10">
        <h1 className="text-xl md:text-2xl text-slate-800 dark:text-slate-300 m-0 py-1 ">
          Made by{" "}
          <a
            href="https://github.com/anil-4-real"
            target="_blank"
            className="cursor-pointer"
          >
            Anil Kumar MR
          </a>
        </h1>
        <h6 className="mb-2 text-xs md:text-s text-slate-800 dark:text-slate-300">
          &copy; All rights reserrved
        </h6>
      </footer>
    </div>
  );
};

export default Footer;
