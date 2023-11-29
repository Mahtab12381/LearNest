import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

interface SearchInputProps {
  initialValue?: string;
  onChange?: (text: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ initialValue = '', onChange }) => {
  const [searchText, setSearchText] = useState<string>(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;
    setSearchText(newText);
    if (onChange) {
      onChange(newText);
    }
  };

  return (
    <div className="relative ">
      <input
        type="text"
        placeholder="Search..."
        className="py-1.5 px-4 border rounded-full w-80 focus:border-primary focus:outline-none"
        value={searchText}
        onChange={handleChange}
      />
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
        <AiOutlineSearch className='text-gray-400' size={20} />
      </div>
    </div>
  );
};

export default SearchInput;
