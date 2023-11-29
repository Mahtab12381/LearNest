import CardMolecule from "../../molecules/Course/CardMolecule";
import PaginationOrganism from "../Others/PaginationOrganism";
import SearchInput from "../../atoms/SearchInput";
import CircleButton from "../../atoms/CircleButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import customAxios from "../../../Utils/customAxios";
import Dropdown from "../../atoms/Dropdown";
import { useSelector } from "react-redux";
import { set } from "react-hook-form";
type Course = {
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
  published: boolean;
  _id: string;
};

type Props = {
  isAdmin?: boolean;
};

type Option = {
  option: string;
  sort: string;
  order: string;
};

const MyCourseOrganism = (props: Props) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [selectedOption, setSelectedOption] = useState("All Courses");
  const [reload, setReload] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const role = useSelector((state: any) => state.user.role);
  const email = useSelector((state: any) => state.user.email);
  const onSelect = (option: Option) => {
    const filteredData = courses.filter((course: Course) => {
      if (option.option === "All Courses") {
        setReload(prev=>!prev);
        return true;
    
      } else if (option.option === "Published") {
        return course.published === true;
      } else {
        return course.published === false;
      }
    });
    setCourses(filteredData);
    setSelectedOption(option.option);
  };

  const cart_wishlist = () => {
    if (role === "learner") {
      return true;
    } else {
      return false;
    }
  };

  const edit_delete = (id: string) => {
    if (role === "instructor" && id === email) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    setLoadingPage(true);
    let url = "";
    window.scrollTo(0, 0);
    if (props.isAdmin) {
      url = "/course/all";
    } else {
      url = "/course/mycreatedcourses/all";
    }
    customAxios
      .get(url)
      .then((res) => {
        setLoadingPage(false);
        setCourses(res.data.data);
      })
      .catch((err) => {
        setLoadingPage(false);
        console.log(err);
      });
  }, [reload]);




  const cardProps = courses.map((course: Course) => {
    return {
      title: course.name,
      description: course.description,
      language: course.language,
      lessons: course.sections.length,
      videos: course.contents.length,
      instructor: course.created_by.name,
      instructor_image:
        import.meta.env.VITE_BUCKET_BASE + course.created_by.imageUrl,
      level: course.level,
      thumbnail: import.meta.env.VITE_BUCKET_BASE + course.thumbnail,
      review: course.reviews.length,
      tag: course.tag,
      rating: course.rating,
      cart_wishlist: cart_wishlist(),
      edit_delete: edit_delete(course.created_by.email),
      id: course._id,
    };
  });



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
    <div className="flex flex-col h-[81vh] justify-between">
      <div className="flex justify-center md:justify-between items-center mt-5 md:container md:mx-auto">
        <div className={props.isAdmin ? "hidden" : "block"}>
          <h1 className="text-2xl font-semibold ml-3">My Courses</h1>
        </div>
        <div className={props.isAdmin ? "block" : "hidden"}>
          <h1 className="text-2xl font-semibold ml-3">Courses</h1>
        </div>
        <div className="md:flex justify-center items-center">
          <div className="md:mr-5">
            <SearchInput 
            onChange={(value: string) => {
              const filteredData = courses.filter((course: Course) => {
                return course.name.toLowerCase().includes(value.toLowerCase());
              });
              setCourses(filteredData);
              if(value===""){
                setReload(prev=>!prev);
              }
            }}
            />
          </div>
          <div
            className={
              props.isAdmin || role === "instructor" ? "block" : "hidden"
            }
          >
            {/* <Dropdown
              options={["All Courses", "Published", "Unpublished"]}
              selectedOption={selectedOption}
              onSelect={onSelect}
              className="md:w-[180px]"
            /> */}
          </div>
          <div className={props.isAdmin ? "hidden" : "block ml-3"}>
            <CircleButton
              onClick={() => {
                navigate("/dashboard/instructor/mycourses/add");
              }}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mt-5 ">
        {cardProps.map((cardProp) => {
          return <CardMolecule {...cardProp} />;
        })}
      </div>
      <div>
        <PaginationOrganism
         totalResults={1}
         pageNumber={ 1}
         limit={1}
         />
      </div>
    </div>
  </>
       
   )}
   </>




   
  );
};

export default MyCourseOrganism;
