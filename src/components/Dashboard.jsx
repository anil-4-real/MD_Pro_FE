import React, { useEffect, useState } from "react";
import download from "../assets/download.png";
import edit from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";

const Dashboard = () => {
  const [markdowns, setMarkdowns] = useState([]);
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      getUserMarkdowns();
    } else {
      window.location.href = "/";
    }
  }, []);

  //display toast
  const showToast = (message, type) => {
    toast(message, { type });
  };

  //get user markdowns
  const getUserMarkdowns = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_API_URL + "users/markdowns",
        {
          headers: { authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (res.status === 200) {
        setUserName(res.data.name);
        setMarkdowns(res.data.markdowns);
      } else {
        showToast("Something went wrong", "error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  //delete markdown
  const deleteMarkdown = async (id, title) => {
    try {
      const res = await axios.delete(
        process.env.REACT_APP_API_URL + "users/markdowns/" + id,
        {
          headers: { authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (res.status === 200) {
        showToast(title + " deleted successfully", "success");
        getUserMarkdowns();
      } else {
        showToast("Something went wrong", "error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  //generate a text file from the input value
  const generateMarkdownFile = (content, title) => {
    const lines = content.split("\n");
    const text = lines.join("\r\n");
    const blob = new Blob([text], { type: "text/plain" });
    saveAs(blob, title.length > 0 ? title.trim() + ".md" : "untitled" + ".md");
  };

  return (
    <div className="container min-h-screen mt-40">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
      />
      <h1 className="text-center p-4 my-4 text-lg md:text-2xl text-slate-700 dark:text-slate-300 mb-20">
        Welcome to your Dashboard,&nbsp;
        <span className="italic font-semibold">
          {userName}
          {"!"}&nbsp;
        </span>
        you can find your saved markdowns here
      </h1>
      <table className="table-auto w-full border-2 text-center text-slate-700 dark:text-slate-300 dark:border-blue-800 border-neutral-400 mt-10 p-4 text-s md:text-md">
        <thead>
          <tr className="border-2 dark:border-blue-800 border-neutral-300 p-4">
            <th className="border-r-2 dark:border-blue-800 border-neutral-300 py-2 px-1">
              #
            </th>
            <th className="border-r-2 dark:border-blue-800 border-neutral-300">
              Name
            </th>
            <th className="border-r-2 dark:border-blue-800 border-neutral-300">
              Export
            </th>
            <th className="border-r-2 dark:border-blue-800 border-neutral-300">
              Edit
            </th>
            <th className="border-r-2 dark:border-blue-800 border-neutral-300">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {markdowns && markdowns.length > 0 ? (
            markdowns.map((markdown, i) => {
              return (
                <tr
                  key={markdown.markdownId}
                  className="border-2 dark:border-blue-800 border-neutral-300 p-4"
                >
                  <td className="border-r-2 p-2 dark:border-blue-800 border-neutral-300">
                    {i + 1}
                  </td>
                  <td className="border-r-2 italic font-semibold dark:border-blue-800 border-neutral-300 p-2">
                    {markdown.title}
                  </td>
                  <td className="border-r-2 dark:border-blue-800 border-neutral-300 p-2">
                    <button
                      onClick={() => {
                        generateMarkdownFile(markdown.content, markdown.title);
                      }}
                    >
                      <img
                        className="h-6 w-6 md:h-10 md:w-10"
                        src={download}
                      ></img>
                    </button>
                  </td>
                  <td className="border-r-2 dark:border-blue-800 border-neutral-300 p-2">
                    <button
                      onClick={() => {
                        navigate("/edit/" + markdown.markdownId, {
                          state: {
                            title: markdown.title,
                            content: markdown.content,
                          },
                        });
                      }}
                    >
                      <img className="h-6 w-6 md:h-10 md:w-10" src={edit}></img>
                    </button>
                  </td>
                  <td className="border-r-2 dark:border-blue-800 border-neutral-300 p-2">
                    <button
                      onClick={() => {
                        deleteMarkdown(markdown.markdownId, markdown.title);
                      }}
                    >
                      <img
                        className="h-6 w-6 md:h-10 md:w-10"
                        src={deleteIcon}
                      ></img>
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr className="border-2 dark:border-blue-800 border-neutral-300 p-4">
              <td
                className="border-r-2 p-2 dark:border-blue-800 border-neutral-300"
                colSpan="5"
              >
                <p>you don't have any markdowns saved &#9785;</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
