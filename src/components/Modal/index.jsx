import React from 'react'
import "./style.scss"
const Modal = ({ isOpen, children, onRequestClose }) => {
  if (!isOpen) return null;
  return (
    <div onClick={onRequestClose} className="model-wrapper">
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

export default Modal
