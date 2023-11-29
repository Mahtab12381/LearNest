import React from "react";
import DisplayRating from "../../atoms/DisplayStar";

interface ReviewItemProps {
  userName: string;
  avatarUrl: string;
  rating: number;
  reviewDate: string;
  reviewContent: string;
}

const ReviewItem: React.FC<ReviewItemProps> = ({
  userName,
  avatarUrl,
  rating,
  reviewDate,
  reviewContent,
}) => {
  return (
    <div className="flex items-center justify-center gap-4 py-5">
      <div className="w-1/5 flex justify-center">
        <img className="h-16 w-16 rounded-full" src={avatarUrl} alt={`${userName}'s`} />
      </div>
      <div className="w-4/5 lg:w-full">
        <div className="flex justify-between items-center mb-2">
          <p className="text-gray-900 font-semibold text-md">{userName}</p>
          <p className="text-gray-600 text-sm ml-3">{reviewDate}</p>
        </div>
        <p>
          <DisplayRating rating={rating} />
        </p>
        <p className="text-gray-600 text-sm mt-1">{reviewContent}</p>
      </div>
    </div>
  );
};

export default ReviewItem;
