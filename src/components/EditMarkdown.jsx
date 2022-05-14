import React, { useState, useRef, useEffect } from "react";
import Preview from "./Preview";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import save from "../assets/save.png";
import download from "../assets/download.png";
import { saveAs } from "file-saver";
import axios from "axios";

const EditMarkdown = () => {
  const { state } = useLocation();
  const { markdownId } = useParams();

  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  //   get line count
  const liveCountFn = () => {
    const lines = inputValue.split("\n");
    return lines;
  };
  const navigate = useNavigate();

  //generate a text file from the input value
  const generateMarkdownFile = () => {
    const lines = inputValue.split("\n");
    const text = lines.join("\r\n");
    const blob = new Blob([text], { type: "text/plain" });
    saveAs(
      blob,
      state.title.length > 0 ? state.title.trim() + ".md" : "untitled" + ".md"
    );
  };

  useEffect(() => {
    setInputValue(state.content);
    return () => {
      setInputValue(localStorage.getItem("changes"));
    };
  }, []);

  // show toast function
  const showToast = (message, type) => {
    toast(message, { type });
  };

  //save markdown to database and show toast
  const handleFileEdit = async () => {
    try {
      const res = await axios.put(
        process.env.REACT_APP_API_URL + "users/markdowns/" + markdownId,
        {
          content: inputValue,
        },
        {
          headers: { authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (res.status === 200) {
        localStorage.removeItem("changes");
        showToast("File changes updated successfully", "success");
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      } else {
        showToast("Something went wrong", "error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container editor-wrapper h-full">
      <div className="bg-neutral-100 dark:bg-slate-800 border-2 border-blue-700">
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
                <span className="text-slate-700 italic text-lg ml-2 dark:text-neutral-300">
                  {state.title}
                </span>
              </div>
              <div className="flex items-center justify-between h-20 border-r-4 border-neutral-200 dark:border-blue-700">
                <button
                  onClick={() => {
                    handleFileEdit();
                  }}
                  title="Save changes to your account"
                  className="p-2 text-xs text-center text-slate-700 dark:text-neutral-300"
                >
                  <img
                    className="w-6 h-6 md:w-10 md:h-10 mb-1"
                    src={save}
                    alt="save"
                  />
                  save
                </button>

                <button
                  onClick={generateMarkdownFile}
                  title="Download to your local drive"
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
                  {inputValue &&
                    liveCountFn().map((line, i) => {
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
                    setInputValue(e.target.value);
                    localStorage.setItem("changes", e.target.value);
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
              </div>
            </div>
          </div>
          <Preview value={inputValue} previewRef={wrapperRef} show={false} />
        </div>
      </div>
    </div>
  );
};

export default EditMarkdown;
