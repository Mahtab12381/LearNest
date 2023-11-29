// ReviewsOrganism.tsx

import React from "react";
import RatingMolecule from "../../molecules/Rating/RatingMolecule";
import RatingStatsMolecule from "../../molecules/Rating/RatingStatsMolecule";
import { useState } from "react";
import StarRating from "../../atoms/StarRating";
import customAxios from "../../../Utils/customAxios";
import { toast } from "react-toastify";
import Button from "../../atoms/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { execReviewReload } from "../../../Store/Slices/reloadSlice";

interface ReviewsOrganismProps {
  rating: number;
  ratingCount: number;
  ratings: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    total: number;
  };

  course_id: string;
}

type Data = {
  course: string;
  review?: string;
  rating: number;
};

const ReviewsOrganism: React.FC<ReviewsOrganismProps> = ({
  rating,
  ratingCount,
  ratings,
  course_id,
}) => {
  const [rated, setRated] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let data: Data = {
    course: course_id,
    review: comment,
    rating: rated,
  };

  if (comment === "") {
    delete data.review;
  }

  const handleSubmitRating = () => {
    setLoading(true);
    customAxios
      .post("/reviews/post", data)
      .then((res) => {
        toast.success(res.data.message);
        dispatch(execReviewReload());
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate("/signin");  
          toast.error("Please sign in to submit review");
       
        } else if (err.response.status === 400) {
          toast.error(err.response.data.error[0].msg);
        } else {
          toast.error(err.response.data.message);
        }
        setLoading(false);
      });
  };

  return (
    <>
      <div className="xl:flex justify-between gap-5 items-center">
        <div className="xl:w-1/3">
          <RatingMolecule rating={rating} ratingCount={ratingCount} />
        </div>

        <div className="xl:w-2/3">
          <RatingStatsMolecule
            five={ratings[5]}
            four={ratings[4]}
            three={ratings[3]}
            two={ratings[2]}
            one={ratings[1]}
            total={ratings["total"]}
          />
        </div>
      </div>
      <p className="text-lg font-semibold mb-5 border-l-2 pl-3 border-primary md:mt-5">
        Your Rating
      </p>
      <div className="my-5">
        <StarRating rated={rated} setRated={setRated} />
      </div>
      <p className="text-lg font-semibold mb-5 border-l-2 pl-3 border-primary">
        Comment
      </p>

      <textarea
        onChange={(e) => setComment(e.target.value)}
        className="w-full h-28 border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-primary mb-3"
        placeholder="Write your comment here..."
      ></textarea>
      {loading ? (
        <Button
          className="md:w-[100px] px-5 py-0.5 float-right mb-5"
          text="Loading"
          hover
          disabled={true}
        />
      ) : (
        <Button
          className="md:w-[100px] w-[84px] px-5 py-0.5 float-right mb-5"
          text="Post"
          hover
          disabled={false}
          onClick={handleSubmitRating}
        />
      )}
    </>
  );
};

export default ReviewsOrganism;
