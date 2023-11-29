import FormInput from "../../atoms/Forminput";
import { useForm } from "react-hook-form";
import Select from "../../atoms/Select";
import { useEffect, useState } from "react";
import Button from "../../atoms/Button";
import FileInput from "../../atoms/FileInput";
import customAxios from "../../../Utils/customAxios";
import { toast } from "react-toastify";


type Props = {};
type Course = {
  _id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  language: string;
  level: string;
  thumbnail: string;
  tags: string;
  sections: [];
};

const AssignmentCreationForm = (props: Props) => {
  const [courses, setCourses] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState();
    const [loading, setLoading] = useState(false);
    const [fileLoading, setFileLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data: any) => {

    const bodyData = {...data,course:selectedOption,attachments:[fileUrl]};
    console.log(bodyData);
    setLoading(true);
    customAxios.post("/assignment/add", bodyData).then((res) => {
      setLoading(false);
      toast.success(res.data.message);
    }).catch((err) => {
        toast.error(err.response.data.message[0].msg);
        setLoading(false);
    });
  }

  useEffect(() => {
    customAxios.get("/course/mycreatedcourses/all").then((res) => {
      setCourses(res.data.data);
    }).catch((err) => {
        toast.error(err.response.data.message);
    });

  }, []);

  useEffect(() => {
    if(file){
      setFileLoading(true);
      const formData = new FormData();
      formData.append("file_to_upload", file);
      customAxios.post("/files/upload/docs", formData).then((res) => {
        setFileLoading(false);
        setFileUrl(res.data.data.url);
      }).catch((err) => {
        toast.error(err.response.data.message);
        setFileLoading(false);
      });
    }
     },[file]);

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Title"
            type="name"
            placeholder="Title"
            defaultValue=""
            name="name"
            control={control}
            rules={{
              required: "Title is required",
              maxLength: {
                value: 100,
                message: "Title should be less than 150 characters",
              },
            }}
            errors={errors}
          />

          <FormInput
            label="Short Description"
            type="name"
            placeholder="Description"
            defaultValue=""
            name="description"
            control={control}
            rules={{
              required: "Description is required",
              maxLength: {
                value: 150,
                message: "Description should be less than 150 characters",
              },
            }}
            errors={errors}
          />

          <FormInput
            label="Mark"
            type="number"
            placeholder="Mark"
            defaultValue=""
            name="mark"
            control={control}
            rules={{
              required: "Mark is required",
              maxLength: {
                value: 3,
                message: "Mark should be less than 3 digits",
              },
            }}
            errors={errors}
          />

          <Select
            label="Course"
            options={courses?.map((e: Course) => {
              return { label: e.name, value: e._id };
            })}
            value=""
            control={control}
            errors={errors}
            rules={{ required: "Category is required" }}
            name="course"
            onchange={(e) => setSelectedOption(e.target.value)}
            watch={watch}
          />

          <FileInput
            label="Attachment"
            name="file"
            control={control}
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
              text="Submit"
              hover
              disabled={false}
            />
          )}
        </form>
      </div>
    </>
  );
};

export default AssignmentCreationForm;
