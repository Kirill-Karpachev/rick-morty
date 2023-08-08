import styles from "./modal-overlay.module.css";

const ModalOverlay = ({ onCloseModal }) => {
  return <div className={styles.overlay} onClick={onCloseModal} />;
};

export default ModalOverlay;
