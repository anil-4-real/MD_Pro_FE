import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function SaveModal({ toggle, fileName, fileContent }) {
  let [isOpen, setIsOpen] = useState(false);

  const [newFileName, setNewFileName] = useState(fileName);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const showToast = (message, type) => {
    toast(message, { type });
  };

  useEffect(() => {
    if (toggle) {
      openModal();
    }
  }, [toggle]);

  // if the file is a new file, upload to the account as a new file
  const handleNewFileSave = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + "users/markdowns/new",
        { title: newFileName, content: fileContent },
        {
          headers: { authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (res.status === 200) {
        showToast(
          "File saved to your account, head to dashboard to see",
          "success"
        );
        closeModal();
      } else {
        showToast("Something went wrong", "error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200"
                  >
                    Enter a name for your new markdown file
                  </Dialog.Title>
                  <div className="mt-2">
                    <input
                      value={newFileName}
                      onChange={(e) => setNewFileName(e.target.value)}
                      placeholder="eg: myMarkdown"
                      className="text-sm text-gray-500 dark:text-gray-900 p-2 rounded-lg w-full bg-white dark:bg-gray-300"
                    />
                    {newFileName.length > 15 || newFileName.length === 0 ? (
                      <div className="text-red-400 mt-2">max 15</div>
                    ) : null}
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center border border-transparent  rounded-lg bg-blue-600 text-white hover:bg-blue-900 hover:ease-in duration-200 px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        if (newFileName.length > 0 && newFileName.length < 15) {
                          handleNewFileSave();
                        }
                      }}
                    >
                      Save
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
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
