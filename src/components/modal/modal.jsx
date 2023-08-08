import React from "react";
import ReactDom from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";
const modalContainer = document.querySelector("#popup");

const Modal = ({ onClose, children }) => {
  React.useEffect(() => {
    function closeEscModal(evt) {
      if (evt.key === "Escape") onClose();
    }

    document.addEventListener("keydown", closeEscModal);

    return () => {
      document.removeEventListener("keydown", closeEscModal);
    };
  }, [onClose]);

  return ReactDom.createPortal(
    <div className={styles.modal}>
      <ModalOverlay onCloseModal={onClose} />
      <div className={`${styles.content}`}>
        {children}
        <button className={styles.close} type="button" onClick={onClose}>
          X
        </button>
      </div>
    </div>,
    modalContainer
  );
};

export default Modal;
