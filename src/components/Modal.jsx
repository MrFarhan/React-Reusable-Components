import React, { useRef } from "react";
import UseOutsideClick from "../hooks/UseOutsideClick";
import "../styles/Modal.scss";



const Modal = ({ onClose, child, width, height, showCloseBtn }) => {
  const ModalRef = useRef(null);
  UseOutsideClick(ModalRef, () => onClose());
  return (
    <div className="ModalMainContainer">
      <div
        className="ModalContainer"
        ref={ModalRef}
        style={{ width: width, height: height }}
      >
        {child}
        {showCloseBtn && (
          <button className="closeBtn" onClick={onClose}>
            X
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
