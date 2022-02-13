import React from "react";
import { Trash2, AlertCircle } from "react-feather";
import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

export default function DeleteModal({ onClick }) {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <div>
      <div className="">
        <button
          type="submit"
          className="transition ease-in duration-200 text-red-700 font-bold py-2 px-4 rounded-full mx-auto hover:bg-red-100 hover:scale-90"
          onClick={() => setShowModal(true)}
        >
          <div className="flex flex-row items-center justify-center">
            <span>
              <Trash2 color="rgb(185 28 28)" size={18} />
            </span>
            <span className="py-2 px-2 rounded-full">Delete</span>
          </div>
        </button>
      </div>
      {showModal ? (
        <>
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 rounded-t bg-red-400">
                  <h3 className="text-xl font-semibold text-white">Confirm</h3>
                </div>
                {/*body*/}
                <div className="flex items-center justify-center relative p-6 flex-auto">
                  <AlertCircle color="red" size={38} />
                  <p className="my-2 text-gray-500 text-lg leading-relaxed px-2">
                    This will permanently delete this subscription from your
                    profile!
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end pr-6 pb-6 rounded-b">
                  <button
                    className="text-red-500 background-transparent border border-red-300 font-bold uppercase px-6 py-3 rounded text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={(e) => onClick(e)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}
