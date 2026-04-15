"use client";

import { Slide, ToastContainer } from "react-toastify";

const ToastProvider = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2400}
      className="keenkeeper-toast-container"
      closeOnClick
      draggable={false}
      hideProgressBar={false}
      newestOnTop
      pauseOnFocusLoss={false}
      pauseOnHover
      theme="dark"
      transition={Slide}
      toastClassName="keenkeeper-toast"
      bodyClassName="keenkeeper-toast__body"
      progressClassName="keenkeeper-toast__progress"
    />
  );
};

export default ToastProvider;
