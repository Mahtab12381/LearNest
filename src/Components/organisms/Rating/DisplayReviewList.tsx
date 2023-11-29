import ReviewItem from "../../molecules/Rating/ReviewItem";
import helper from "../../../Utils/helper";
interface Review {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    imageUrl: string;
  };
  course: string;
  rating: number;
  review: string;
  createdAt: string;
  updatedAt: string;
}

type Props = {
  reviews: Review[];
};

const DisplauReviewList = (props: Props) => {

  const {getTimeAgo} = helper();

  return (
    <>
      <div>
        <p className="text-lg font-semibold mb-5 border-l-2 pl-3 border-primary">
          Reviews
        </p>
        <div className="rounded-xl h-[50vh] overflow-y-scroll scrollbar-hidden w-full">
          {props.reviews.length === 0 && (
            <>
              <div className="flex justify-center items-center h-full">
                <div>
                  <img className="opacity-25 h-24 w-24 mx-auto" src="/empty.png"></img>
                  <p className="text-2xl text-gray-500">No Reviews Yet</p>
                </div>
              </div>
            </>
          )}
          {props.reviews.slice().reverse().map((review) => {
            return (
              <div className="border-b last:border-none">
                <ReviewItem
                  userName={review.user.name}
                  avatarUrl={
                    import.meta.env.VITE_BUCKET_BASE + review.user.imageUrl
                  }
                  rating={review.rating}
                  reviewDate={getTimeAgo(review.updatedAt)}
                  reviewContent={review.review}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DisplauReviewList;
