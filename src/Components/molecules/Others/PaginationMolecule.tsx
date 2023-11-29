import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPage } from "../../../Store/Slices/filterSlice";
interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage }) => {
  const dispatch = useDispatch();
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      dispatch(addPage(newPage));
    }
  };

  const generatePageNumbers = () => {
    const maxButtonsToShow = 5;
    const middleButtonIndex = Math.floor(maxButtonsToShow / 2);
    let startPage:number;

    switch (true) {
      case totalPages <= maxButtonsToShow:
        startPage = 1;
        break;
      case currentPage <= middleButtonIndex + 1:
        startPage = 1;
        break;
      case currentPage >= totalPages - middleButtonIndex:
        startPage = totalPages - maxButtonsToShow + 1;
        break;
      default:
        startPage = currentPage - middleButtonIndex;
    }

    const endPage = Math.min(startPage + maxButtonsToShow - 1, totalPages);

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => {
      const pageNumber = startPage + index;
      return (
        <button
          key={pageNumber}
          className={`font-semibold text-sm py-1 px-[13px] rounded-full mr-2 ${
            currentPage === pageNumber ? "bg-primary text-white" : "bg-gray-300 text-gray-700"
          }`}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      );
    });
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        className="bg-gray-300 text-gray-700 font-semibold text-sm py-1 px-4 rounded-full disabled:opacity-50"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {generatePageNumbers()}
      <button
        className="bg-gray-300 text-gray-700 font-semibold text-sm py-1 px-4 rounded-full disabled:opacity-50"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
