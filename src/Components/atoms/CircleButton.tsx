// CircleButton.tsx
import React from 'react';

interface CircleButtonProps {
  onClick: () => void;
}

const CircleButton: React.FC<CircleButtonProps> = ({ onClick }) => {
  return (
    <button
      className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white focus:outline-none hover:bg-sec_pink transition"
      onClick={onClick}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        ></path>
      </svg>
    </button>
  );
};

export default CircleButton;
