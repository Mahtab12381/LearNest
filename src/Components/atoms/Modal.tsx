import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [isAnimating, setAnimating] = useState(false);

  const handleClose = () => {
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
      onClose();
    }, 300);
  };

  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 border border-gray-300 shadow-md transition-all duration-300 ${
        isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      } ${isAnimating ? 'opacity-0 scale-95' : ''}`}
    >
      <div className="w-full max-w-md mx-auto">
        {children}
      </div>
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 px-4 py-2 bg-gray-500 text-white rounded focus:outline-none"
      >
        Close
      </button>
    </div>
  );
};

export default Modal;
