import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, open, className = "" }) => {
  const dialog = useRef();

  useEffect(() => {
    console.log("Modal open changed:", open);
  }, [open]);

  useEffect(() => {
    const modal = dialog.current;
    if (!modal) return;

    if (open) {
      if (!modal.open) {
        modal.showModal();
      }
    } else {
      if (modal.open) {
        modal.close();
      }
    }
  }, [open]);
  return createPortal(
    <dialog
      ref={dialog}
      className={`py-8 px-8 w-[40%] bg-white rounded-2xl m-auto ${className}`}
    >
      {children}
    </dialog>,
    document.getElementById("modal")
  );
};

export default Modal;
