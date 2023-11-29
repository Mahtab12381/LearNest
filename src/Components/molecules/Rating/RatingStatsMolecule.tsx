import DisplayRating from "../../atoms/DisplayStar";
import ProgressBar from "../../atoms/ProgressBar";
interface RatingStatsProps {
  five: number;
  four: number;
  three: number;
  two: number;
  one: number;
  total: number;
}
const RatingStatsMolecule: React.FC<RatingStatsProps> = ({
  five,
  four,
  three,
  two,
  one,
  total,
}) => {
  return (
    <div className="flex flex-col space-y-3 py-5 xl:py-0 xl:space-y-2">
      <div className="flex items-center justify-end gap-4 w-full">
        <DisplayRating rating={5} />
        <ProgressBar value={five} max={total} />
        <div className="text-lg">{`(${five})`}</div>
      </div>
      <div className="flex items-center justify-end gap-4">
        <DisplayRating rating={4} />
        <ProgressBar value={four} max={total} />
        <div className="text-lg">{`(${four})`}</div>
      </div>
      <div className="flex items-center justify-end gap-4">
        <DisplayRating rating={3} />
        <ProgressBar value={three} max={total} />
        <div className="text-lg">{`(${three})`}</div>
      </div>
      <div className="flex items-center justify-end gap-4">
        <DisplayRating rating={2} />
        <ProgressBar value={two} max={total} />
        <div className="text-lg">{`(${two})`}</div>
      </div>
      <div className="flex items-center justify-end gap-4">
        <DisplayRating rating={1} />
        <ProgressBar value={one} max={total} />
        <div className="text-lg">{`(${one})`}</div>
      </div>
    </div>
  );
};

export default RatingStatsMolecule;
