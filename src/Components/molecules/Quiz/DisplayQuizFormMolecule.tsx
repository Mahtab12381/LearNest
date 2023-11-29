//@ts-nocheck
import React from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import customAxios from "../../../Utils/customAxios";
import { toast } from "react-toastify";
import Button from "../../atoms/Button";


interface QuizSubmissionResponse {
  success: boolean;
  message: string;
  data: {
    quizId: string;
    completed: boolean;
    attempts: number;
    submittedAnswers: string[];
    wrongAnswers: number[];
    exireAt: string;
    _id: string;
    lastSubmittedDate: string;
    score: number;
  };
}

interface Question {
  questionText: string;
  options: string[];
}

interface QuizFormData {
  name: string;
  description: string;
  questions: Question[];
  timeLimit: string;
  course: string;
}

type QuizFormProps = {
  quiz?: QuizFormData;
  show?: boolean;
  setTimer?: React.Dispatch<React.SetStateAction<boolean>>;
};

interface FormValues {
  [key: string]: number;
}

const DisplayQuizFormMolecule: React.FC<QuizFormProps> = ({
  quiz,
  show,
  setTimer,
}) => {
  const { register, handleSubmit, control } = useForm<FormValues>();
  const { fields } = useFieldArray({
    control,
    name: "answers",
  });
  const [loading, setLoading] = React.useState<boolean>(false);
  const [submittedData, setSubmittedData] = React.useState<QuizSubmissionResponse | null>(null);
  console.log(submittedData)
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setLoading(true);
    const answers = data.answers.map((answer) => {
      return parseInt(answer);
    });
    customAxios
      .post("/quiz/submit/" + quiz?._id, { answers: answers })
      .then((res) => {
        toast.success(res.data.message);
        setSubmittedData(res.data.data.wrongAnswers);
        setLoading(false);
        setTimer(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };

  return (
    <form
      className="max-w-xl mx-auto p-8 border border-gray-200 rounded-xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      {show &&
        quiz?.questions.map((question, index) => (
          <div key={index} className="mb-6">
            <h4 className={`text-md mb-2 border-b pb-2 ${
              submittedData?.includes(index+1) ? "bg-red-500 p-2 text-white rounded-xl" : "text-gray-700"
            }`}>
              <span className="text-lg font-medium">{`Question ${
                index + 1
              } :`}</span>{" "}
              {question.questionText}
            </h4>
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center mb-2">
                <input
                  type="radio"
                  id={`${question.questionText}_${optionIndex}`}
                  value={optionIndex + 1}
                  {...register(`answers.${index}` as const, {
                    required: "Please select an answer",
                  })}
                  className="mr-2"
                />
                <label htmlFor={`${question.questionText}_${optionIndex}`}>
                  {option}
                </label>
              </div>
            ))}
          </div>
        ))}
      {!show && (
        <>
          <div className="h-[55vh]">
            <h1 className="text-2xl font-semibold text-center">Quiz Preview</h1>
            <img className="h-40 w-40 mx-auto mt-20 opacity-30" src="/unlock.png">
            </img>
          </div>
        </>
      )}
      {show && (
        <>
          {loading ? (
            <Button
              className="md:w-[150px] py-0.5 "
              text="Loading"
              hover
              disabled={true}
            />
          ) : (
            <Button
              className="md:w-[150px] py-0.5 "
              text="Submit"
              hover
              disabled={false}
            />
          )}
        </>
      )}
    </form>
  );
};

export default DisplayQuizFormMolecule;
