//@ts-nocheck
import React from "react";
import { useForm, useFieldArray, SubmitHandler, set } from "react-hook-form";
import StickyBox from "react-sticky-box";
import { CiCircleMinus } from "react-icons/ci";
import customAxios from "../../../Utils/customAxios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Question {
  questionText: string;
  options: string[];
  correctAnswer: string;
}
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

interface QuizFormData {
  name: string;
  description: string;
  questions: Question[];
  timeLimit: string;
  course: string;
}

const QuizFormMolecule: React.FC = () => {
  const [courses, setCourses] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<QuizFormData>({
    defaultValues: {
      name: "",
      description: "",
      questions: [
        { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
      ],
      timeLimit: "",
      course: "",
    },
  });

  const { fields, append, remove } = useFieldArray<Question>({
    control,
    name: "questions",
  });

  const onSubmit: SubmitHandler<QuizFormData> = (data) => {
    setLoading(true);
    const correctAnswer = parseInt(data.questions[0].correctAnswer);
    const newdata = {
      name: data.name,
      description: data.description,
      questions: data.questions.map((question) => {
        return {
          questionText: question.questionText,
          options: question.options,
          correctAnswer: parseInt(question.correctAnswer),
        };
      }),
      timeLimit: data.timeLimit,
      course: data.course,
    };
    customAxios
      .post("/quiz/add", newdata)
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message);
        navigate("/dashboard/instructor/quiz");

      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.message[0].msg);
      });
  };

  useEffect(() => {
    customAxios
      .get("/course/mycreatedcourses/all")
      .then((res) => {
        setCourses(res.data.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, []);

  return (
    <form
      className="flex w-full gap-14 mt-5 px-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-1/2 h-[70vh] overflow-y-scroll scrollbar-hidden">
        {fields.map((question, index) => (
          <div key={question.id}>
            <label className="block text-gray-700 text-sm font-bold mb-2">{`Question ${
              index + 1
            }:`}</label>
            <input
              className={`appearance-none border border-gray-200 rounded-xl w-full py-2.5 px-3 text-black leading-tight focus:outline-none ${
                errors?.name ? "border-red-500" : "focus:border-primary "
              }`}
              {...register(`questions.${index}.questionText`, {
                required: "Question is required",
              })}
            />
            <span className="text-red-500">*</span>
            {errors.questions?.[index]?.questionText && (
              <span className="text-red-500">
                {errors?.questions[index]?.questionText?.message}
              </span>
            )}

            <label className="block text-gray-700 text-sm font-bold mb-2">
              Options:
            </label>
            {question?.options?.map((option, optionIndex) => (
              <div key={optionIndex} className="mb-2">
                <input
                  className={`appearance-none border border-gray-200 rounded-xl w-full py-2.5 px-3 text-black leading-tight focus:outline-none ${
                    errors?.name ? "border-red-500" : "focus:border-primary "
                  }`}
                  {...register(`questions.${index}.options.${optionIndex}`, {
                    required: "Option is required",
                  })}
                />
                <span className="text-red-500">*</span>
                {errors.questions?.[index]?.options?.[optionIndex] && (
                  <span className="text-red-500">
                    {errors?.questions[index]?.options[optionIndex]?.message}
                  </span>
                )}
              </div>
            ))}

            <label className="block text-gray-700 text-sm font-bold mb-2">
              Correct Answer:
            </label>
            <select
              className={`appearance-none border border-gray-200 rounded-xl w-full py-2.5 px-3 text-black leading-tight focus:outline-none ${
                errors?.name ? "border-red-500" : "focus:border-primary "
              }`}
              {...register(`questions.${index}.correctAnswer`, {
                required: "Correct Answer is required",
              })}
            >
              <option value="" disabled>
                Select correct answer
              </option>
              {[1, 2, 3, 4].map((optionValue) => (
                <option key={optionValue} value={String(optionValue)}>
                  {optionValue}
                </option>
              ))}
            </select>
            <span className="text-red-500">*</span>
            {errors.questions?.[index]?.correctAnswer && (
              <span className="text-red-500">
                {errors?.questions[index]?.correctAnswer?.message}
              </span>
            )}

            <div className="flex justify-end w-full">
              <button
                type="button"
                className=" text-sec_pink rounded-xl"
                onClick={() => remove(index)}
              >
                <CiCircleMinus size={25} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <StickyBox className="w-1/2" offsetTop={40} offsetBottom={5}>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name:
          </label>
          <input
            className={`appearance-none border border-gray-200 rounded-xl w-full py-2.5 px-3 text-black leading-tight focus:outline-none ${
              errors?.name ? "border-red-500" : "focus:border-primary "
            }`}
            {...register("name", { required: "Name is required" })}
          />
          <span className="text-red-500">*</span>
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}

          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description:
          </label>
          <textarea
            className={`appearance-none border border-gray-200 rounded-xl w-full py-2.5 px-3 text-black leading-tight focus:outline-none ${
              errors?.name ? "border-red-500" : "focus:border-primary "
            }`}
            {...register("description", {
              required: "Description is required",
            })}
          />
          <span className="text-red-500">*</span>
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}

          <label className="block text-gray-700 text-sm font-bold mb-2">
            Time Limit:
          </label>
          <input
            className={`appearance-none border border-gray-200 rounded-xl w-full py-2.5 px-3 text-black leading-tight focus:outline-none ${
              errors?.name ? "border-red-500" : "focus:border-primary "
            }`}
            {...register("timeLimit", { required: "Time Limit is required" })}
            type="number"
          />
          <span className="text-red-500">*</span>
          {errors.timeLimit && (
            <span className="text-red-500">{errors.timeLimit.message}</span>
          )}

          <label className="block text-gray-700 text-sm font-bold mb-2">
            Course:
          </label>
          <select
            className={`appearance-none border border-gray-200 rounded-xl w-full py-2.5 px-3 text-black leading-tight focus:outline-none ${
              errors?.name ? "border-red-500" : "focus:border-primary "
            }`}
            {...register("course", { required: "Course is required" })}
          >
            <option value="" disabled>
              Select a course
            </option>
            {courses.map((course: Course) => (
              <option key={course._id} value={course._id}>
                {course.name}
              </option>
            ))}
          </select>
          <span className="text-red-500">*</span>
          {errors.course && (
            <span className="text-red-500">{errors.course.message}</span>
          )}
          <div className="mt-1">
            <button
              type="button"
              className="p-2 py-1.5 bg-white mr-5 rounded-xl text-primary outline-none border border-primary hover:bg-sec_pink hover:text-white hover:border-white"
              onClick={() =>
                append({
                  questionText: "",
                  options: ["", "", "", ""],
                  correctAnswer: "",
                })
              }
            >
              Add Question
            </button>

            {loading ? (
              <button
                type="submit"
                className=" p-2 bg-primary mr-5 rounded-xl text-white"
                disabled={true}
              >
                Loading
              </button>
            ) : (
              <button
                type="submit"
                className=" p-2 bg-primary mr-5 rounded-xl text-white"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </StickyBox>
    </form>
  );
};

export default QuizFormMolecule;
