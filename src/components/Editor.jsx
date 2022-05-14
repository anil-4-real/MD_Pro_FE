import React, { useState, useRef, useEffect } from "react";
import Preview from "./Preview";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import save from "../assets/save.png";
import importIcon from "../assets/importIcon.png";
import view from "../assets/view.png";
import download from "../assets/download.png";
import SaveModal from "./SaveModal";
import { saveAs } from "file-saver";

const Editor = () => {
  const starterText = `# ***hello*** there! 
## Welcome to ***MD Pro***
### Start writing your markdown here.
#### ***alternatively, you can import your own markdown file.***
#### **make sure to create an account to access all features**`;

  // set initial state for input value as starter text if the input value is empty else set the input value as localStorage.getItem("changes")
  const [inputValue, setInputValue] = useState(
    localStorage.getItem("tempMd") || starterText
  );

  const [fileInput, setFileInput] = useState(null);
  const [showSaveForm, setShowSaveForm] = useState(false);

  //re-render the preview when the input value is changed
  useEffect(() => {
    if (fileInput) {
      readFile(fileInput);
    }
  }, [fileInput]);

  // refs for the input and wrapper
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  //   get line count of the input value and return
  const liveCountFn = () => {
    const lines = inputValue.split("\n");
    return lines;
  };

  //generate a text file from the input value
  const generateMarkdownFile = () => {
    const lines = inputValue.split("\n");
    const text = lines.join("\r\n");
    const blob = new Blob([text], { type: "text/plain" });
    saveAs(
      blob,
      fileInput ? fileInput.name.split(".")[0] + ".md" : "untitled" + ".md"
    );
  };

  // read file and set value to editor
  const readFile = async () => {
    const reader = new FileReader();
    reader.readAsText(fileInput);
    reader.onload = (e) => {
      setInputValue(e.target.result);
      localStorage.setItem("tempMd", e.target.result);
    };
    reader.onerror = () => {
      console.log(reader.error);
    };
  };

  // show toast function
  const showToast = (message, type) => {
    toast(message, { type });
  };

  return (
    <div className="editor-wrapper shadow-lg h-full bg-neutral-100 dark:bg-slate-800">
      <div className="flex justify-between editor-wrapper">
        <div className="rounded-sm w-full">
          <div
            id="input"
            className="flex justify-between items-center border-b-4 border-neutral-200 dark:border-fuchsia-900 mb-4 py-2"
          >
            <div className="flex flex-col items-center justify-center">
              <h1 className="dark:text-slate-300 ml-2 text-2xl text-center">
                Input
              </h1>
              <span className="text-slate-700 italic text-lg ml-2 cursor-text dark:text-neutral-300">
                {fileInput ? fileInput.name.split(".")[0] : "untitled"}
              </span>
            </div>
            <div className="flex items-center justify-between h-20 border-r-4 border-neutral-200 dark:border-blue-700">
              <a
                title="View live preview"
                href="#preview"
                className="md:hidden flex justify-center items-center flex-col p-2"
              >
                <img
                  className="w-6 h-6 md:w-10 md:h-10"
                  src={view}
                  alt="preview"
                />
                <span className="text-slate-700 dark:text-neutral-300 text-xs mt-1">
                  preview
                </span>
              </a>
              <label
                htmlFor="file"
                title="Import a markdown file"
                className="p-2 flex flex-col items-center justify-center cursor-pointer text-sm"
              >
                <img
                  src={importIcon}
                  alt="import"
                  className="w-6 h-6 md:w-10 md:h-10"
                />
                <span className="text-slate-700 dark:text-neutral-300 text-xs mt-1">
                  import
                </span>
              </label>
              <input
                type="file"
                id="file"
                className="hidden"
                multiple={false}
                accept=".md"
                onChange={(e) => {
                  if (e.target.files[0].name.endsWith(".md")) {
                    setFileInput(e.target.files[0]);
                  } else {
                    showToast("please select .md file only", "error");
                  }
                }}
              />
              {localStorage.getItem("isAuthenticated") === "true" && (
                <button
                  title="Saving will create a new file in your account, head to dashboard to edit your existing files"
                  onClick={() => setShowSaveForm((prev) => !prev)}
                  className="p-2 text-xs text-center text-slate-700 dark:text-neutral-300"
                >
                  <img
                    className="w-6 h-6 md:w-10 md:h-10 mb-1"
                    src={save}
                    alt="save"
                  />
                  save
                </button>
              )}

              <button
                title="Download to your local drive"
                onClick={generateMarkdownFile}
                className="p-2 mr-2 text-xs text-center text-slate-700 dark:text-neutral-300 flex flex-col justify-center items-center"
              >
                <img
                  className="w-6 h-6 md:w-10 md:h-10 mb-1"
                  src={download}
                ></img>
                download
              </button>
            </div>
          </div>
          {/* input box */}
          <div className="">
            <div className="flex border-l-4 border-neutral-200 dark:border-fuchsia-900 h-full overflow-hidden">
              <div>
                {liveCountFn().map((line, i) => {
                  return (
                    <div
                      className="text-right px-1 dark:text-slate-200 bg-slate-300 dark:bg-blue-900"
                      key={i}
                    >
                      {i + 1}
                    </div>
                  );
                })}
              </div>
              <textarea
                ref={inputRef}
                spellCheck="false"
                onChange={(e) => {
                  e.preventDefault();
                  setInputValue(e.target.value);
                  localStorage.setItem("tempMd", e.target.value);
                }}
                value={inputValue}
                className="rounded-none min-h-screen w-full outline-none px-2 bg-neutral-100 editor-window overflow-scroll font-mono resize-none dark:bg-slate-800 dark:text-slate-100"
              />
              <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
              />
              <SaveModal
                toggle={showSaveForm}
                fileName={fileInput ? fileInput.name.split(".")[0] : "untitled"}
                fileContent={inputValue}
              />
            </div>
          </div>
        </div>
        <Preview value={inputValue} previewRef={wrapperRef} show={true} />
      </div>
    </div>
  );
};

export default Editor;
