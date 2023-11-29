// Dropdown.tsx
import React, { useState } from 'react';

interface DropdownProps {
  options: string[];
  selectedOption: string;
  onSelect: (selected: { option: string; sort: string; order: string }) => void;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({className, options, selectedOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (index: number, option: string) => {
    if (index === 0) {
      onSelect({
        option: option,
        sort: 'default',
        order: 'default',
      });
    }

    if (index === 1) {
      onSelect({
        option: option,
        sort: 'rating',
        order: 'asc',
      });
    }

    if (index === 2) {
      onSelect({
        option: option,
        sort: 'rating',
        order: 'desc',
      });
    }

    if (index === 3) {
      onSelect({
        option: option,
        sort: 'name',
        order: 'asc',
      });
    }

    if (index === 4) {
      onSelect({
        option: option,
        sort: 'name',
        order: 'desc',
      });
    }
    if(index > 5){
      onSelect({
        option: option,
        sort: 'default',
        order: 'default',
      });
    }
    setIsOpen(false);
  };

  return (
    <div className={`relative md:inline-block text-left hidden `}>
      <div>
        <span
          onClick={toggleDropdown}
          className={`${className} cursor-pointer rounded-xl px-4 py-2 inline-flex items-center justify-between border ${
            isOpen ? 'border-gray-300' : 'border-gray-200'
          } bg-white text-sm leading-5 focus:outline-none focus:border-blue-300 transition duration-450 ease-in-out`}
        >
          {selectedOption}
          <svg
            className={`-mr-1 ml-2 h-5 w-5 ${isOpen ? 'transform rotate-180' : ''}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg z-20">
          <div className="rounded-md bg-white shadow-xs">
            <div className="py-1">
              {options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleOptionClick(index, option)}
                  className="cursor-pointer block px-4 py-2 text-sm leading-5 text-gray-700 hover:border-l-4 hover:bg-gray-200 border-primary focus:outline-none focus:bg-blue-500 focus:text-white"
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
