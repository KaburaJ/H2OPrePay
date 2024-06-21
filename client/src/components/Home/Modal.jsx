import React from 'react';
import './Home.css';

const Modal = ({ onClose, children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
