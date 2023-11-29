import React from "react";

interface ProgressBarProps {
  value: number;
  max: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max }) => {
  const percentage = value !== 0 ? (value / max) * 100 : 0;

  return (
    <div className="relative pt-1 w-4/5">
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-primary_light">
            {percentage.toFixed(2)}%
          </span>
        </div>
      </div>
      <div className="flex h-2 overflow-hidden text-xs bg-primary_light rounded">
        <div
          style={{ width: `${percentage}%` }}
          className="flex flex-col justify-center whitespace-nowrap text-white shadow-none transition-all duration-300 ease-out bg-primary"
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
