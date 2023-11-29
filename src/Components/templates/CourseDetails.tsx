//@ts-nocheck
import customAxios from "../../Utils/customAxios";
import Breadcrumbs from "../atoms/Breadcrumbs";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import CardMolecule from "../molecules/Course/CardMolecule";
import DisplayRating from "../atoms/DisplayStar";
import TabComponent from "../atoms/Tab";
import StickyBox from "react-sticky-box";
import ContentsOrganism from "../organisms/Course/ContentsOrganism";
import ReviewsOrganism from "../organisms/Rating/ReviewsOrganism";
import helper from "../../Utils/helper";
import DisplayReviewList from "../organisms/Rating/DisplayReviewList";
import { useSelector } from "react-redux";
import AssignmentBYCourse from "../organisms/Assignment/AssignmentBYCourse";
import QuizBYCourse from "../organisms/Quiz/QuizBYCourse";
import SupportMessageOrganism from "../organisms/Support/SupportMessageOrganism";
import { set } from "react-hook-form";

type Props = {
  id: string;
  name: string;
  description: string;
  language: string;
  sections: Array<string>;
  contents: Array<string>;
  created_by: {
    name: string;
    imageUrl: string;
    email: string;
  };
  level: string;
  thumbnail: string;
  reviews: Array<string>;
  tag: string;
  rating: number;
  _id: string;
};

type Params = {
  _id?: string;
};

const CourseDetails = (porps: Params) => {
  const course_id_from_param = useParams<{ id: string }>().id;
  const [support, setSupport] = useState<any>();
  const [loadingPage, setLoadingPage] = useState(true);
  const role = useSelector((state: any) => state.user.role);
  const reviewReload = useSelector((state: any) => state.reload.reviewReload);
  let course_id = "";
  if (!course_id_from_param) {
    course_id = porps._id;
  } else {
    course_id = course_id_from_param;
  }
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const tabs = ["Overview", "Contents", "Reviews"];
  const email = useSelector((state: any) => state.user.email);
  if (email === course?.created_by.email) {
    tabs.push("Assignment");
    tabs.push("Quiz");
    tabs.push("Discussion");
  }
  const execSupportReload = useSelector(
    (state: any) => state.reload.supportReload
  );
  useEffect(() => {
    customAxios
      .get(`/support/view/${course_id_from_param}`)
      .then((res) => {
        setSupport(res.data.data.discussion);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [execSupportReload]);

  useEffect(() => {
    setLoadingPage(true);
    let url = "";
    if (course_id_from_param && role === "learner") {
      url = `/course/all/published/${course_id}`;
    } else {
      url = `course/id/${course_id}`;
    }
    customAxios
      .get(url)
      .then((res) => {
        setLoadingPage(false);
        setCourse(res.data.data);
      })
      .catch((err) => {
        setLoadingPage(false);
        console.log(err);
      });
  }, [reviewReload]);

  const { calculateRatingCounts } = helper();
  const exampleRatings = calculateRatingCounts(course ? course.reviews : []);
  const contentComponents = [
    <div
      className="quil-text"
      key={1}
      dangerouslySetInnerHTML={{
        __html: course?.description,
      }}
    />,
    <div key={2}>
      <ContentsOrganism
        section={course?.sections.length > 0 ? course.sections : []}
        content={course?.contents.length > 0 ? course.contents : []}
        locked={true}
        instructor={course?.created_by.email}
      />
    </div>,
    <div key={3}>
      <ReviewsOrganism
        rating={course?.rating}
        ratingCount={exampleRatings.total}
        ratings={exampleRatings}
        course_id={course?._id}
      />
      <DisplayReviewList
        reviews={course?.reviews.length > 0 ? course.reviews : []}
      />
    </div>,
    <div key={4}>
      <AssignmentBYCourse course={course?._id} />
    </div>,
    <div key={5}>
      <QuizBYCourse course={course?._id} />
    </div>,
    <div key={6}>
      <SupportMessageOrganism course={course?._id} support={support} />
    </div>,
  ];

  return (
    <>
      {loadingPage ? (
        <div>
          <div className="flex justify-center items-center text-2xl h-[80vh]">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        </div>
      ) : (
        <>
          <div
            className={`h-[150px] bg-gray-100 justify-center items-center mt-[68px] ${
              course_id_from_param ? "flex" : "hidden"
            }`}
          >
            <div className="text-center">
              <p className="text-3xl mb-2">Course details</p>
              <Breadcrumbs steps={["Courses", "Course Details"]} />
            </div>
          </div>
          <div className="block xl:hidden pt-5 px-2">
            <CardMolecule
              title={course?.name}
              description={course?.description}
              language={course?.language}
              lessons={course?.sections.length}
              videos={course?.contents.length}
              instructor={course?.created_by.name}
              instructor_image={
                import.meta.env.VITE_BUCKET_BASE + course?.created_by.imageUrl
              }
              level={course?.level}
              thumbnail={import.meta.env.VITE_BUCKET_BASE + course?.thumbnail}
              review={course?.reviews.length}
              tag={course?.tag}
              rating={course?.rating}
              cart_wishlist={false}
              edit_delete={false}
              id={course?._id}
              buttons={true}
              shortCard={true}
              published={course?.published}
            />
          </div>
          <div className="md:flex  block md:container md:mx-auto md:justify-center md:gap-10 my-5">
            <div
              className={`md:w-3/5 p-5 pt-0  md:p-0 ${
                !course_id_from_param ? "" : "lg:p-5"
              }`}
            >
              <h1 className="text-4xl font-bold text-gray-700">
                {course?.name}
              </h1>
              <p className="text-gray-600 text-xl mt-3">
                {course?.category.name}
              </p>
              <p className="text-gray-600 mt-2">{course?.subcategory}</p>
              <span>{course?.level}</span>
              <div className="flex gap-3 items-center mt-2">
                <p className="text-yellow-500 text-xl">
                  {course ? course.rating.toFixed(1) : 0}
                </p>
                <DisplayRating size={22} rating={course ? course.rating : 0} />
                <p className="text-xl text-gray-600">
                  ({course?.reviews.length})
                </p>
              </div>
              <div className="flex gap-12 items-center mt-3">
                <p className="text-gray-600">
                  Created At :{" "}
                  {new Date(course?.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  Last Updated At :{" "}
                  {new Date(course?.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex justify-start items-center gap-3 mt-5 bg-gray-100 rounded-xl p-3">
                <img
                  className="w-12 h-12 rounded-full object-cover object-center"
                  src={
                    import.meta.env.VITE_BUCKET_BASE +
                    course?.created_by.imageUrl
                  }
                  alt="Instructor"
                ></img>
                <div className="">
                  <p>
                    <span className="text-primary text-lg">
                      {course?.created_by.name}
                    </span>
                  </p>
                  <p className="text-gray-600 text-sm">
                    {course?.created_by.email}
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <TabComponent
                  tabs={tabs}
                  reduxTab={false}
                  contentComponents={contentComponents}
                />
              </div>
            </div>
            <div className="xl:block hidden">
              <StickyBox offsetTop={90} offsetBottom={20}>
                <>
                  <CardMolecule
                    title={course?.name}
                    description={course?.description}
                    language={course?.language}
                    lessons={course?.sections.length}
                    videos={course?.contents.length}
                    instructor={course?.created_by.name}
                    instructor_image={
                      import.meta.env.VITE_BUCKET_BASE +
                      course?.created_by.imageUrl
                    }
                    level={course?.level}
                    thumbnail={
                      import.meta.env.VITE_BUCKET_BASE + course?.thumbnail
                    }
                    review={course?.reviews.length}
                    tag={course?.tag}
                    rating={course?.rating}
                    cart_wishlist={false}
                    edit_delete={false}
                    id={course?._id}
                    buttons={true}
                    published={course?.published}
                  />
                </>
              </StickyBox>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CourseDetails;
