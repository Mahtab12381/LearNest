//@ts-nocheck
import ReactPlayer from "react-player";
import { useState } from "react";
import { useEffect } from "react";
import { set } from "react-hook-form";
import customAxios from "../../../Utils/customAxios";
import { useParams } from "react-router-dom";
import ContentsOrganism from "./ContentsOrganism";
import helper from "../../../Utils/helper";
import TabComponent from "../../atoms/Tab";
import { useSelector, useDispatch } from "react-redux";
import { addContent } from "../../../Store/Slices/contentSlice";
import SupportMessageOrganism from "../Support/SupportMessageOrganism";
import AssignmentBYCourse from "../Assignment/AssignmentBYCourse";
import StickyBox from "react-sticky-box";
import QuizBYCourse from "../Quiz/QuizBYCourse";

type Content = {
  _id: string;
  name: string;
  description: string;
  data: string;
  type: string;
  section: string;
  attachment: string[];
  isDeleted: boolean;
  course: string;
  createdAt: string;
  updatedAt: string;
};

type Course = {
  id: string;
  name: string;
  description: string;
  language: string;
  sections: Array<string>;
  contents: Content;
  created_by: {
    name: string;
    imageUrl: string;
  };
  level: string;
  thumbnail: string;
  reviews: Array<string>;
  tag: string;
  rating: number;
  _id: string;
};

const CourseContentView = () => {
  const currentActivated = useSelector(
    (state: any) => state.content.activatedContent
  );
  const dispatch = useDispatch();
  const [changed, setChanged] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [course, setCourse] = useState<Course>() || [];
  const [contents, setContents] = useState<Content>();
  const [support, setSupport] = useState<any>();
  const [loadingPage, setLoadingPage] = useState(true);
  const [url, setUrl] = useState<string>();
  const tabs = ["Quiz", "Assignment", "Discussion"];
  const course_id_from_param = useParams<{ id: string }>().id;
  const contentComponents = [
    <div key={1}>
     <QuizBYCourse course={course_id_from_param} />
    </div>,
    <div key={2}>
      <AssignmentBYCourse course={course_id_from_param} />
    </div>,
    <div key={3}>
      <SupportMessageOrganism course={course_id_from_param} support={support}/>
    </div>,
  ];

  const { getTimeAgo } = helper();

  const [activated, setActivated] = useState();
  useEffect(() => {
    setLoadingPage(true);
    customAxios
      .get("course/all/published/" + course_id_from_param)
      .then((res) => {
        setLoadingPage(false);
        setCourse(res.data.data);
        setUrl(
          import.meta.env.VITE_BUCKET_BASE + res.data.data.contents[0].data
        );
        setContents(res.data.data.contents[0]);
      })
      .catch((err) => {
        setLoadingPage(false);
        console.log(err);
      });
  }, []);

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
    customAxios
      .get("/progress/get-progress/" + course_id_from_param)
      .then((res) => {
        setActivated(res.data.data.activatedContent);
        dispatch(addContent(res.data.data.activatedContent));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [changed]);

  const nextContent = course?.contents[course?.contents.indexOf(contents) + 1];

  const handleEndVideo = (params?: string) => {
    let nextdoc;
    if (params) {
      const index = course?.contents.findIndex((item) => item._id === params);
      nextdoc = course?.contents[index + 1];
      console.log(nextdoc);
    }
    customAxios
      .patch("/progress/update-course-progress", {
        courseId: course_id_from_param,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    customAxios
      .patch("/progress/set-active-content", {
        courseId: course_id_from_param,
        contentId: params ? nextdoc?._id : nextContent?._id,
      })
      .then((res) => {
        setChanged((prev) => !prev);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      <div>
        <div className="md:flex justify-center md:justify-between items-center mt-5 md:container md:mx-auto lg:w-full">
          <h1 className="text-2xl font-semibold ml-3 mb-2">Course Contents</h1>
        </div>
      </div>

      <div className="md:flex md:gap-5 md:justify-between w-full">
        <div className="w-full">
          <ReactPlayer
            controls
            url={url}
            playing={playing}
            onReady={() => setPlaying(true)}
            onEnded={handleEndVideo}
            width={"100%"}
            height={"auto"}
          />
          <div>
            <p className="text-3xl text-gray-700 font-bold mt-2">
              {contents?.name}
            </p>
          </div>

          <div className="flex justify-start items-center gap-3 mt-3 bg-gray-100 rounded-xl p-3">
            <img
              className="w-12 h-12 rounded-full object-cover object-center"
              src={
                import.meta.env.VITE_BUCKET_BASE + course?.created_by.imageUrl
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
              <p className="text-sm text-gray-500">
                {getTimeAgo(course?.createdAt)}
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
        
        <div className="md:w-3/5">
        <StickyBox offsetTop={60} offsetBottom={0}>
          <ContentsOrganism
            section={course?.sections.length > 0 ? course.sections : []}
            content={course?.contents.length > 0 ? course.contents : []}
            playBUttonSubscriber={true}
            setUrl={setUrl}
            setContents={setContents}
            locked={false}
            activated={currentActivated}
            handleVideoEnd={handleEndVideo}
          />
             </StickyBox>
        </div>
    
      </div>
    </>
        
    )}
    </>


    
  );
};

export default CourseContentView;
