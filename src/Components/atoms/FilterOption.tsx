// FilterOption.tsx
import React from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

interface FilterOptionProps {
  title: string;
  options: string[];
  showOptions: boolean;
  toggleOptionsVisibility: () => void;
  selectedFilters: any;
  handleToggle: (value: string ) => void;
  checkboxType?: boolean; // Optional prop for differentiating checkbox and radio input
}

const FilterOption: React.FC<FilterOptionProps> = ({
  title,
  options,
  showOptions,
  toggleOptionsVisibility,
  selectedFilters,
  handleToggle,
  checkboxType = true,
}) => (
  <div className="mb-4">
    <div className="flex justify-between items-center mb-2 border-b border-gray-100 pb-2">
      <h2 className="text-md font-semibold">{title}</h2>
      <button
        className="text-primary text-sm cursor-pointer"
        onClick={toggleOptionsVisibility}
      >
        {showOptions ? <AiOutlineUp /> : <AiOutlineDown />}
      </button>
    </div>

    <div
      className={`transition-all duration-500 ease-in-out overflow-clip  ${
        showOptions ? " h-auto" : "h-0"
      }`}
    >
      {options.map((option) => (
        <div key={option} className="mb-2">
          <label className="inline-flex items-center">
            <input
              type={checkboxType ? "checkbox" : "radio"}
              className={`h-3 w-3 ${
                checkboxType ? "form-checkbox" : "form-radio"
              } text-primary`}
              checked={
                checkboxType
                  ? selectedFilters.includes(option)
                  : selectedFilters === option
              }
              onChange={() => handleToggle(option)}
            />
            <span className="ml-2 text-sm">{option}</span>
          </label>
        </div>
      ))}
    </div>
  </div>
);

export default FilterOption;
