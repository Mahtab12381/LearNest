import React from 'react';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

interface DisplayRatingProps {
  rating: number;
  size?: number;
}

const DisplayRating: React.FC<DisplayRatingProps> = ({size, rating }) => {
  // Calculate the number of full stars, half stars, and empty stars
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = hasHalfStar ? 5 - fullStars - 1 : 5 - fullStars;

  // Create an array of star components
  const starsArray = [...Array(fullStars)].map((_, index) => (
    <BsStarFill size={size} key={`full-${index}`} className="text-yellow-500" />
  ));

  if (hasHalfStar) {
    starsArray.push(<BsStarHalf size={size} key="half" className="text-yellow-500" />);
  }

  starsArray.push(
    ...[...Array(emptyStars)].map((_, index) => (
      <BsStar size={size} key={`empty-${index}`} className="text-gray-300" />
    ))
  );

  return <div className="flex items-center">{starsArray}</div>;
};

export default DisplayRating;



