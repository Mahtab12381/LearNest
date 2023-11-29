//@ts-nocheck
import DisplayRating from "../../atoms/DisplayStar";
import ProgressBar from "../../atoms/ProgressBar";
import { useNavigate } from "react-router-dom";

type CardListMoleculeProps = {
  imageSrc: string;
  title: string;
  rating: number;
  progressBarValue: number;
  progressBarMax: number;
  seenDaysAgo?: number; 
  course_id?: string;
};

const CardListMolecule = (props: CardListMoleculeProps) => {
  const navigate = useNavigate();
  const {
    imageSrc,
    title,
    rating,
    progressBarValue,
    progressBarMax,
    seenDaysAgo,
    course_id,
  } = props;
  

  return (
    <div className="flex justify-between items-center my-2 border-b pb-2 gap-3">
      <div className="flex items-center justify-start gap-3 pl-2.5 md:pl-0 cursor-pointer" onClick={
        () => {
          navigate(`/dashboard/learner/mycourses/${course_id}`);
        }
      }>
        <img
          className="h-16 w-16 rounded-xl object-cover object-center"
          src={imageSrc}
          alt={title}
        />
        <div className="sm:w-[400px] w-[200px]">
          <p>{title}</p>
          <div className="flex items-center gap-3">
            <span className="text-yellow-500">({rating.toFixed(1)})</span>
            <DisplayRating size={12} rating={rating} />
          </div>
        </div>
      </div>

      <div className="md:w-[200px] w-[120px]">
        <ProgressBar value={progressBarValue} max={progressBarMax} />
      </div>

      {seenDaysAgo && (
        <div className="hidden md:block md:w-[150px]">
          <p className="text-sm text-end text-gray-600">{`seen ${seenDaysAgo}`}</p>
        </div>
      )}
    </div>
  );
};

export default CardListMolecule;
