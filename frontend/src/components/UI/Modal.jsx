import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, open, className = "" }) => {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;

    if (!modal) return;

    if (open) {
      if (!modal.open) modal.showModal();
      document.body.style.overflow = "hidden"; // 👈 Prevent scroll
    } else {
      if (modal.open) modal.close();
      document.body.style.overflow = ""; // 👈 Restore scroll
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return createPortal(
    open && (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
        <dialog
          ref={dialog}
          className={`py-8 px-8 bg-white rounded-2xl max-w-md w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed ${className}`}
        >
          {children}
        </dialog>
      </div>
    ),
    document.getElementById("modal")
  );
};

export default Modal;
