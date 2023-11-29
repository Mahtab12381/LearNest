//@ts-nocheck
import Forminput from "../../atoms/Forminput";
import FormatedInput from "../../atoms/FormatedInput";
import { set, useForm } from "react-hook-form";
import Select from "../../atoms/Select";
import { useEffect, useState } from "react";
import Button from "../../atoms/Button";
import FileInput from "../../atoms/FileInput";
import { useDispatch, useSelector } from "react-redux";
import { addTab } from "../../../Store/Slices/tabSlice";
import { doneTab } from "../../../Store/Slices/tabSlice";
import { addCourseBasic } from "../../../Store/Slices/tabSlice";
import customAxios from "../../../Utils/customAxios";
import { toast } from "react-toastify";

interface CourseBAsic {
  name: string;
  description: string;
  category: string;
  subcategory: string;
  language: string;
  level: string;
  thumbmail: string;
  tags: string;
  sections: [];
}

const CourseBasic = () => {

  const courseBasic = useSelector((state: any) => state.tab.courseBasic);
  const [selectedSubcategory, setSelectedSubcategory] = useState(courseBasic?.subcategory);
  const [selectedLanguage, setSelectedLanguage] = useState(courseBasic?.language);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedLevel, setSelectedLevel] = useState(courseBasic?.level);
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(courseBasic?.thumbnail);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const currTab = useSelector((state: any) => state.tab.createcourseTab);
  const [fileLoading, setFileLoading] = useState(false);
 

  useEffect(() => {
    customAxios.get("/category/all").then((res) => {
      setCategories(res.data.data);
    });
  }, []);

  useEffect(() => {
  if(file){
    setFileLoading(true);
    const formData = new FormData();
    formData.append("file_to_upload", file);
    customAxios.post("/files/upload/images", formData).then((res) => {
      setFileLoading(false);
      setFileUrl(res.data.data.url);
    }).catch((err) => {
      toast.error(err.response.data.message);
      setFileLoading(false);
    });
  }
   },[file]);

  const onSubmit = (data: CourseBAsic) => {
    setLoading(true);
    const newData = {
      ...data,
      category: selectedCategory,
      subcategory: selectedSubcategory,
      language: selectedLanguage,
      level: selectedLevel,
      thumbnail: fileUrl,
      tag: "Not Published",
    };
    let url = "/course/add";
    if(courseBasic?._id){
      url = `/course/update/${courseBasic?._id}`
    }
    customAxios
      .post(url, newData)
      .then((res) => {
        dispatch(addTab({ createcourseTab: currTab + 1 }));
        dispatch(doneTab({ tabComplete: 1 }));
        dispatch(addCourseBasic({ courseBasic: {...newData,_id:res.data.data._id} }));
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast.error(err.response.data.error[0].msg);
        }
        else {
          toast.error(err.response.data.message);
        }
      });

    setLoading(false);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<CourseBAsic>({
    mode: "onChange",
  });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Forminput
          label="Title"
          type="name"
          placeholder="Title"
          defaultValue={courseBasic?.name}
          name="name"
          control={control}
          rules={{
            required: "Title is required",
            maxLength: {
              value: 150,
              message: "Title should be less than 150 characters",
            },
          }}
          errors={errors}
        />

        <FormatedInput
          label="Description"
          name="description"
          defaultValue={courseBasic?.description}
          control={control}
          errors={errors}
          rules={{ required: "Description is required" }}
        />

        <Select
          label="Category"
          options={categories?.map((e: any) => {
            return { label: e.name, value: e._id };
          })}
          value=""
          defaultValue={courseBasic?.category}
          control={control}
          errors={errors}
          rules={{ required: "Category is required" }}
          name="role"
          onchange={(e) => setSelectedCategory(e.target.value)}
          watch={watch}
        />

        <Select
          label="Sub Category"
          options={
            selectedCategory
              ? categories
                  .filter((e: any) => e._id === selectedCategory)[0]
                  .subcategories?.map((e: any) => {
                    return { label: e, value: e };
                  })
              : []
          }
          value=""
          defaultValue={courseBasic?.subcategory}
          control={control}
          errors={errors}
          rules={{ required: "Sub Category is required" }}
          name="subcategory"
          onchange={(e) => setSelectedSubcategory(e.target.value)}
          watch={watch}
        />

        <Select
          label="Language"
          options={[
            { label: "English", value: "English" },
            { label: "Bangla", value: "Bangla" },
            { label: "Hindi", value: "Hindi" },
            { label: "Japanese", value: "Japanese" },
          ]}
          value=""
          defaultValue={courseBasic?.language}
          control={control}
          errors={errors}
          rules={{ required: "Language is required" }}
          name="language"
          onchange={(e) => setSelectedLanguage(e.target.value)}
          watch={watch}
        />

        <Select
          label="Level"
          options={[
            { label: "Advanced", value: "Advanced" },
            { label: "Intermediate", value: "Intermediate" },
            { label: "Beginner", value: "Beginner" },
          ]}
          value=""
          defaultValue={courseBasic?.level}
          control={control}
          errors={errors}
          rules={{ required: "Level is required" }}
          name="level"
          onchange={(e) => setSelectedLevel(e.target.value)}
          watch={watch}
        />

        <FileInput
          label="Thumbnail"
          name="file"
          control={control}
          defaultValue={courseBasic?.thumbnail}
          errors={errors}
          rules={{ required: "File is required" }}
          acceptedTypes="image/*"
          onChange={setFile}
          uploading={fileLoading}
        />

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
            text="Next"
            hover
            disabled={false}
          />
        )}
      </form>
    </div>
  );
};

export default CourseBasic;
