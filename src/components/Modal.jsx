import React, { useState, forwardRef, useImperativeHandle } from "react";

const Modal = (props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [header, setHeader] = useState();
  const [body, setBody] = useState();
  const [footer, setFooter] = useState();
  const closeAtParent = (e) => {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };
  const openM = (body, header, footer) => {
    setBody(body);
    setHeader(header);
    setFooter(footer);
    setIsOpen(true);
  };
  useImperativeHandle(ref, () => ({
    openModal: (body, header, footer) => openM(body, header, footer),
    hide: () => setIsOpen(false),
  }));
  return (
    <div
      className={`bg-gray-900 bg-opacity-20 overflow-x-hidden fixed h-modal ${
        isOpen
          ? " md:h-screen w-full overflow-y-auto"
          : "h-0 w-0 overflow-y-hidden"
      } bottom-0 right-0  z-200  md:inset-0 flex ease-in duration-300`}
      onClick={(e) => closeAtParent(e)}
    >
      {/*  Main modal */}
      <div className="relative p-4 w-full max-w-2xl h-full  md:h-auto m-auto">
        {/*  Modal content */}
        <div className="relative bg-white rounded-lg shadow p">
          {/*  Modal header */}
          <div className="flex justify-between items-center p-4 bg-gradient-to-b bg-primary rounded-t-lg border-b text-white dark:border-gray-600 mb-4">
            <span className="font-bold">{header || "Popup"}</span>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="modal-body">{body ? body : null} </div>
          <div className="flex items-center p-4 space-x-2 rounded-b border-t border-gray-200 ">
            {footer ? footer : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(Modal);