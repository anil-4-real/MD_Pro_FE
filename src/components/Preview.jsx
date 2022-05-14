import React from "react";
import Markdown from "markdown-to-jsx";
import keyboard from "../assets/keyboard.png";

const Preview = ({ value, show }) => {
  return (
    <div className="h-full">
      <div className="preview-window-wrapper">
        <div
          id="preview"
          className="border-b-4 border-neutral-200 dark:border-fuchsia-900 mb-4 py-2"
        >
          <div className="flex justify-between items-center h-20">
            <h1 className="dark:text-slate-300 text-2xl text-center ml-2">
              Live Preview
            </h1>
            {show && (
              <a
                title="View input"
                className="md:hidden flex justify-center items-center flex-col p-2"
                href="#input"
              >
                <img
                  className="w-6 h-6 md:w-10 md:h-10"
                  src={keyboard}
                  alt="preview"
                />
                <span className="text-slate-700 dark:text-neutral-300 text-xs mt-1">
                  input
                </span>
              </a>
            )}
          </div>
        </div>
        <div className="flex border-l-4 overflow-x-scroll w-100 preview-window-wrapper border-neutral-200 dark:border-fuchsia-900 rounded-none outline-none min-h-screen px-4 py-0 bg-neutral-100 editor-window dark:bg-slate-800 dark:text-slate-100">
          <Markdown options={{ forceBlock: true }} children={value} />
        </div>
      </div>
    </div>
  );
};

export default Preview;
