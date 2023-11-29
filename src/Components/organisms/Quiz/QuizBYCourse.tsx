import React from "react";
import { useEffect } from "react";
import customAxios from "../../../Utils/customAxios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import QuizListItemMolecule from "../../molecules/Quiz/QuizListItemMolecule";
interface Question {
  questionText: string;
  options: string[];
  correctAnswer: number;
  _id: string;
}

interface QuizEntry {
  quizId: string;
  completed: boolean;
  attempts: number;
  submittedAnswers: string[];
  wrongAnswers: string[];
  expireAt: string;
  _id: string;
  lastSubmittedDate: string;
  score: number;
}

interface Quiz {
  _id: string;
  name: string;
  description: string;
  questions: Question[];
  timeLimit: number;
  course: string;
  created_by: string;
  isDeleted: boolean;
  submissions: string[];
  createdAt: string;
  updatedAt: string;
}
type Props = {
  course: string;
};

const QuizBYCourse = (props: Props) => {
  const [quizData, setQuizData] = React.useState<Quiz[]>([]);
  const role = useSelector((state: any) => state.user.role);
  const [qiuzProgress, setQuizProgress] = React.useState<QuizEntry[]>();

  useEffect(() => {
    customAxios
      .get("quiz/bycourse/" + props.course)
      .then((res) => {
        setQuizData(res.data.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);

  useEffect(() => {
    if (role === "learner") {
      customAxios
        .get("quiz/mysubmittedquiz")
        .then((res) => {
          setQuizProgress(res.data.data);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } else {
      return;
    }
  }, []);

  const completed_ids = qiuzProgress?.filter((quiz: QuizEntry) => quiz.completed)
  .map((quiz: QuizEntry) => quiz.quizId);

  return (
    <>
      {quizData.length > 0 ? (
        <>
          {quizData.map((quiz) => (
            <div key={quiz._id}>
              <QuizListItemMolecule quiz={quiz} completed_ids={completed_ids} quizProgress={qiuzProgress} />
            </div>
          ))}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default QuizBYCourse;
