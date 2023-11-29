//@ts-nocheck
import { useForm } from "react-hook-form";
import Forminput from "../../atoms/Forminput";
import Select from "../../atoms/Select";
import { useState } from "react";
import Button from "../../atoms/Button";
import FileInput from "../../atoms/FileInput";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import customAxios from "../../../Utils/customAxios";
import { useEffect } from "react";
import Recorder from "../../molecules/Others/Recorder";

type Content = {
  name: string;
  description: string;
};

const CourseContent = () => {
  const [type, setType] = useState("video" as any);
  const [loading, setLoading] = useState(false);
  const done = useSelector((state: any) => state.tab.tabComplete);
  const lesson = useSelector((state: any) => state.tab.lesson);
  const course_id = useSelector((state: any) => state.tab.courseBasic?._id);
  const arrayofLesson = Object.values(lesson ? lesson : []);
  const [selectedLesson, setSelectedLesson] = useState(arrayofLesson[0]);
  const options = arrayofLesson.map((e: any) => {
    return { label: e, value: e };
  });
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [fileLoading, setFileLoading] = useState(false);

  useEffect(() => {
    if (file && type === "video" || type === "record") {
      setFileLoading(true);
      const formData = new FormData();
      formData.append("file_to_upload", file);
      customAxios
        .post("/files/upload/videos", formData)
        .then((res) => {
          setFileLoading(false);
          setFileUrl(res.data.data.url);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setFileLoading(false);
        });
    }

    if (file && type === "document") {
      setFileLoading(true);
      const formData = new FormData();
      formData.append("file_to_upload", file);
      customAxios
        .post("/files/upload/docs", formData)
        .then((res) => {
          setFileLoading(false);
          setFileUrl(res.data.data.url);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setFileLoading(false);
        });
    }
  }, [file]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm<Content>({
    mode: "onChange",
  });

  const onSubmit = (data: Content) => {
    if (done < 2) {
      toast.error("Please complete previous steps");
      return;
    }

    setLoading(true);

    const newData = {
      ...data,
      description: "-",
      section: selectedLesson,
      type: type==="record"?"video":type,
      data: fileUrl,
      course: course_id,
    };

    customAxios
      .post("/content/add", newData)
      .then(() => {
        toast.success("Content Added");
        reset();
        setLoading(false);
        setFileUrl("");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast.error(err.response.data.error[0].msg);
          setLoading(false);
        } else {
          toast.error(err.response.data.message);
          setLoading(false);
        }
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Forminput
          label="Title"
          type="text"
          placeholder="Title"
          value=""
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

        <Select
          label="Lesson"
          options={options}
          value=""
          defaultValue="asdasdasd"
          control={control}
          errors={errors}
          rules={{
            required: "Lesson is required",

            maxLength: {
              value: 2,
              message: "Lesson should be less than 2 characters",
            },
          }}
          name="lesson"
          onchange={(e) => setSelectedLesson(e.target.value)}
          watch={watch}
        />

        <Select
          label="Type"
          options={[
            { label: "Video", value: "video" },
            { label: "Document", value: "document" },
            { label: "Record", value: "record" },
          ]}
          value=""
          control={control}
          errors={errors}
          rules={{ required: "Type is required" }}
          name="type"
          onchange={(e) => setType(e.target.value)}
          watch={watch}
        />

        <div className={`${type==='record'?"hidden":"block"}`}>
          <FileInput
            label="Content"
            name="content"
            control={control}
            errors={errors}
            rules={{ required: "Content is required" }}
            acceptedTypes="image/*,video/*,pdf/*,doc/*,docx/*,ppt/*,pptx/*"
            onChange={setFile}
            uploading={fileLoading}
          />
        </div>

        <div className={`${type==='record'&& fileUrl===""?"block":"hidden"}`}>
          <Recorder setFileUrlContent={setFileUrl}/>
        </div>

        <div className={`${type==='record'&& fileUrl!==""?"block":"hidden"}`}>
          <video src={import.meta.env.VITE_BUCKET_BASE+fileUrl} controls className="w-[600px] mx-auto rounded-xl"></video>
        </div>

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
            text="Add"
            hover
            disabled={false}
          />
        )}
      </form>
    </div>
  );
};

export default CourseContent;
