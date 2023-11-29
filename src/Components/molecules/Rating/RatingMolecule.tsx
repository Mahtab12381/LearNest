import React from "react";

interface RatingDisplayProps {
  rating: number;
  ratingCount: number;
}

const RatingMolecule: React.FC<RatingDisplayProps> = ({
  rating,
  ratingCount,
}) => {
  return (
    <div className="flex items-center bg-primary_light rounded-xl gap-3 w-full h-[200px] justify-center">
      <div>
        <div className="text-6xl font-bold text-primary">
          {rating?.toFixed(1)}
        </div>
        <div className="flex flex-col justify-center items-center mt-3">
          <div className="text-lg text-gray-900 font-semibold">Rating</div>
          <div className="text-lg text-gray-900 font-semibold">{`(${ratingCount} reviews)`}</div>
        </div>
      </div>
    </div>
  );
};

export default RatingMolecule;
