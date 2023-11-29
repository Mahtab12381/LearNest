import React, { useState } from "react";
import { Rating} from "@material-tailwind/react";

interface StarRatingProps {
  rated: number;
  setRated: React.Dispatch<React.SetStateAction<number>>;
}
const StarRating: React.FC<StarRatingProps> = ({rated,setRated}) => {
  return (
    <div className="flex items-center gap-2 font-bold text-yellow-500 text-2xl justify-center">
      {rated}
      <Rating value={rated} onChange={(value) => setRated(value)} />
    </div>
  );
};

export default StarRating;


