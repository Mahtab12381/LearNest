import TabComponent from "../../atoms/Tab";
import CourseBasic from "./CourseBasic";
import CourseContent from "./CourseContent";
import CourseLession from "./CourseLession";
import CoursePreview from "./CoursePreview";

const CreateCourse = () => {
  const tabs = ["Basic Info", "Lessons", "Contents", "Preview"];
  const contentComponents = [
    <CourseBasic key={1} />,
    <CourseLession key={2} />,
    <CourseContent key={3} />,
    <CoursePreview key={4} />
  ];

  return <>
  <div className="mt-5">
  <TabComponent tabs={tabs} reduxTab={true} contentComponents={contentComponents} />
  </div>
  </>
};

export default CreateCourse;
