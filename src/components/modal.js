// src/components/Modal.js

import React from 'react';
import '../assets/css/components.css'

const Modal = ({ isModalOpen, onClose, oldPin, newPin, setOldPin, setNewPin, onSubmit }) => {
  if (!isModalOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Change PIN</h2>
        <form onSubmit={onSubmit}>
          <label className='firstLabel'>Old PIN</label>
          <input
            type="password"
            value={oldPin}
            onChange={(e) => setOldPin(e.target.value)}
            required
          />
          <label>New PIN</label>
          <input
            type="number"
            value={newPin}
            onChange={(e) => setNewPin(e.target.value)}
            required
            maxLength={4}
          />
          <button type="submit">Change</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
