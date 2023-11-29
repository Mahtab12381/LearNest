//@ts-nocheck
import CardListMolecule from "../../molecules/Course/CardListMolecule";
import SearchInput from "../../atoms/SearchInput";
import Dropdown from "../../atoms/Dropdown";
import { useState } from "react";
import PaginationOrganism from "../Others/PaginationOrganism";
import customAxios from "../../../Utils/customAxios";
import { useEffect } from "react";
import { set } from "react-hook-form";
import helper from "../../../Utils/helper";

type CourseData = {
  _id: string;
  courseProgress: courseProgress[];
};

type courseProgress = {
  course: Course;
  percentageComplete: number;
  lastSeen: Date;
  activatedContent: string[];
  _id: string;
};

type Course = {
  _id: string;
  name: string;
  rating: number;
  thumbnail: string;
};

type Option = {
  option: string;
  sort: string;
  order: string;
};
type Props = {};

const MyEnrolledCourseOrganism = (props: Props) => {
  const {getTimeAgo} = helper();
  const [selectedOption, setSelectedOption] = useState("All");
  const onSelect = (option: Option) => {
    setSelectedOption(option.option);
  };
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    setLoadingPage(true);
    customAxios
      .get("/course/mycourses/all")
      .then((res) => {
        setLoadingPage(false);
        setCourses(res.data.data);
      })
      .catch((err) => {
        setLoadingPage(false);
        console.log(err);
      });
  }, []);

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
      <div className="md:flex justify-center md:justify-between items-center mt-5 md:container md:mx-auto">
        <h1 className="text-2xl font-semibold ml-3 mb-2">Enrolled Courses</h1>
        <div className="md:flex justify-center items-center">
          <div className="md:mr-5">
            <SearchInput />
          </div>
          <Dropdown
            options={["All", "In Progress", "Completed"]}
            selectedOption={selectedOption}
            onSelect={onSelect}
            className="md:w-[130px]"
          />
        </div>
      </div>
      <div className="flex flex-col justify-between h-[70vh]">
        <div>
        {courses[0]?.courseProgress.map((course: courseProgress) => {
          return (
            <CardListMolecule
              imageSrc={
                import.meta.env.VITE_BUCKET_BASE + course.course.thumbnail
              }
              title={course.course.name}
              rating={course.course.rating}
              progressBarValue={course.percentageComplete}
              progressBarMax={100}
              seenDaysAgo={getTimeAgo(course.lastAccessed)}
              course_id={course.course._id}
            />
          );
        })}
        </div>
        <PaginationOrganism
        totalResults={courses[0]?.courseProgress.length}
        pageNumber={ 1}
        limit={20}
        />
      </div>
    </>
        
    )}
    </>


  
  );
};

export default MyEnrolledCourseOrganism;
