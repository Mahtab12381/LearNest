import React from "react";
import CourseDetails from "../../templates/CourseDetails";
import Button from "../../atoms/Button";
import { useDispatch, useSelector } from "react-redux";
import { addCourseBasic, addTab, doneTab } from "../../../Store/Slices/tabSlice";
import { addCourseLesson } from "../../../Store/Slices/tabSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
import customAxios from "../../../Utils/customAxios";

const CoursePreview = () => {
  const course_id = useSelector((state: any) => state.tab.courseBasic?._id);
  const done = useSelector((state: any) => state.tab.tabComplete);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (done < 2) {
      dispatch(addTab({ createcourseTab: 2 }));
      toast.error("Please complete previous steps");
      return;
    }
    console.log(course_id);
  }, []);

  const SubmitCourse = () => {
    setLoading(true);
    customAxios
      .post("/course/sendpublicationmail/"+course_id)
      .then((res) => {
        dispatch(addCourseBasic({ courseBasic: {} }));
        dispatch(addCourseLesson({ lesson: {} }));
        dispatch(addTab({ createcourseTab: 1 }));
        dispatch(doneTab({ tabComplete: 0 }));
        setLoading(false);
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div>
      {course_id ? (
        <>
          <CourseDetails _id={course_id} />
          {loading ? (
            <Button
              className="md:w-[100px] py-0.5 float-right"
              text="Loading"
              hover
              disabled={true}
            />
          ) : (
            <Button
              className="md:w-[100px] py-0.5 float-right"
              text="Submit"
              hover
              disabled={false}
              onClick={SubmitCourse}
            />
          )}
        </>
      ) : (
        <>
          <p>
            Please fill the course details and course content to preview the
            course
          </p>
        </>
      )}
    </div>
  );
};

export default CoursePreview;
