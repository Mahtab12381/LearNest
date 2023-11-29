//@ts-nocheck
import CardMolecule from "../molecules/Course/CardMolecule";
import Breadcrumbs from "../atoms/Breadcrumbs";
import FilterOrganism from "../organisms/Others/FilterOrganism";
import { useEffect, useState } from "react";
import Dropdown from "../atoms/Dropdown";
import PaginationOrganism from "../organisms/Others/PaginationOrganism";
import SearchInput from "../atoms/SearchInput";
import customAxios from "../../Utils/customAxios";
import { useSelector, useDispatch } from "react-redux";
import { addPage } from "../../Store/Slices/filterSlice";
import Loadder from "../atoms/Loadder";
import { set } from "react-hook-form";

type Option = {
  option: string;
  sort: string;
  order: string;
};
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
  _id: string;
  published: boolean;
};

const Courses = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [sortBy, setsortBy] = useState<string>("");
  const [sortByType, setsortByType] = useState<string>("");
  const ratings = [1, 2, 3, 4, 5];
  const levels = ["Beginner", "Intermediate", "Advanced"];
  const languages = ["Bangla", "Japanese", "English", "Hindi"];
  const [limit, setLimit] = useState(10);
  const [selectedOption, setSelectedOption] = useState("Default sorting");
  const supportReload = useSelector((state: any) => state.reload.supportReload);
  const [courses, setCourses] = useState([]);
  const [totalResult, setTotalResults] = useState(0);
  const role = useSelector((state: any) => state.user.role);
  const email = useSelector((state: any) => state.user.email);
  const onSelect = (option: Option) => {
    setSelectedOption(option.option);
    setsortBy(option.sort);
    setsortByType(option.order);
  };

  const dispatch = useDispatch();

  const onLimitChange = (option: Option) => {
    if (newPage > 1) {
      dispatch(addPage(1));
    }
    setLimit(parseInt(option.option));
  };

  const selectedFilter = useSelector(
    (state: any) => state.filter.selectedFilter
  );

  const newPage = useSelector((state: any) => state.filter.page);

  function constructParams(property: string, values: string[]) {
    return values?.map((value) => `${property}=${value}`).join("&");
  }
  const params =
    constructParams("category", selectedFilter?.category) +
    "&" +
    constructParams("subcategory", selectedFilter?.subcategory) +
    "&" +
    constructParams("rating", selectedFilter?.rating) +
    "&" +
    constructParams("level", selectedFilter?.level) +
    "&" +
    constructParams("language", selectedFilter?.language) +
    "&" +
    "name=" +
    searchText +
    "&" +
    "sortBy=" +
    sortBy +
    "&" +
    "sortByType=" +
    sortByType +
    "&" +
    "page=" +
    newPage +
    "&" +
    "limit=" +
    limit;

  useEffect(() => {
    customAxios
      .get("/category/all")
      .then((res) => {
        const categories = res.data.data.map((category: any) => {
          return category.name;
        });

        let subcategories: string[] = [];
        res.data.data.map((category: any) => {
          category.subcategories.map((subcategory: any) => {
            subcategories.push(subcategory);
          });
        });
        setSubcategories(subcategories);
        setCategories(categories);
      })
      .then((res) => {
        console.log(res);
      });
    if (newPage > 1) {
      dispatch(addPage(1));
    }
  }, []);

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

  const handleSearchChange = (value: string) => {
    const timeOutId = setTimeout(() => {
      setSearchText(value);
    }, 1000);
    return () => {
      clearTimeout(timeOutId);
    };
  };

  useEffect(() => {
    setLoading(true);
    customAxios
      .get("/course/all/published?" + params)
      .then((res) => {
        setLoading(false);
        setCourses(res.data.data.courses);
        setTotalResults(res.data.data.total);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [params, supportReload]);
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
      published: course.published,
    };
  });
  return (
    <>
      <div>
        <div className=" h-[150px] bg-gray-100 flex justify-center items-center mt-[68px]">
          <div className="text-center">
            <p className="text-3xl mb-2">Find Your Desire</p>
            <Breadcrumbs steps={["Courses"]} />
          </div>
        </div>
        <div className="flex justify-center md:justify-end items-center mt-5 md:container md:mx-auto">
          <div className="md:mr-5">
            <SearchInput onChange={handleSearchChange} />
          </div>
          <Dropdown
            options={[
              "Default sorting",
              "Rating(Low-High)",
              "Rating(High-Low)",
              "Name(A-Z)",
              "Name(Z-A)",
            ]}
            selectedOption={selectedOption}
            onSelect={onSelect}
            className="md:w-[180px]"
          />
          <Dropdown
            options={["1", "5", "10", "15", "20", "25", "30"]}
            selectedOption={limit.toString()}
            onSelect={onLimitChange}
            className="md:w-[80px] ml-5 pr-3"
          />
        </div>
        <div className="flex justify-center md:container md:mx-auto gap-4">
          <div className=" md:w-[200px] lg:w-[250px] hidden md:block">
            <FilterOrganism
              categories={categories}
              subcategories={subcategories}
              ratings={ratings}
              levels={levels}
              languages={languages}
            />
          </div>

          {loading ? (
            <div className="h-[70vh] flex justify-center items-center w-full">
              <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <div className="flex flex-col justify-between w-full">
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mt-5 w-full">
                {cardProps.map((cardProp) => {
                  return <CardMolecule {...cardProp} />;
                })}
              </div>
              <div>
                <PaginationOrganism
                  totalResults={totalResult}
                  pageNumber={newPage ? newPage : 1}
                  limit={limit}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Courses;
