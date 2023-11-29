import React from "react";
import { GoPeople } from "react-icons/go";
import { IoCalendarOutline } from "react-icons/io5";
import { SlTrash } from "react-icons/sl";
import { FaRegEye } from "react-icons/fa";
import { useSelector } from "react-redux";
import { PiClockCountdown } from "react-icons/pi";
import { BsPatchQuestion } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
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
  quiz: Quiz;
  completed_ids?: string[];
  quizProgress?: QuizEntry[];
};

const QuizListItemMolecule = (props: Props) => {
  const role = useSelector((state: any) => state.user.role);
  const navigate = useNavigate();

  const handleQuizView = (quizId: string) => {
    if (role === "instructor") {
      navigate(`/dashboard/instructor/quiz-view/${quizId}`);
      return;
    }
    if (role === "learner") {
      navigate(`/dashboard/learner/quiz-view/${quizId}`);
      return;
    }
  };

  return (
    <>
      <div className="bg-white overflow-hidden border-b w-full">
        <div className="p-3 flex gap-3 justify-start items-center w-full">
          <div className="w-[50px] justify-end flex items-center">
            <img
              className="h-10 w-10 object-cover"
              src={"/stopwatch.png"}
              alt=""
            />
          </div>

          <div className="w-full">
            <div className="flex justify-between items-center ">
              <div
                onClick={() => {
                  //   navigate(
                  //     `/dashboard/instructor/assignment-submissions-view/${assignment._id}`
                  //   );
                }}
                className="cursor-pointer"
              >
                <h2 className="text-lg text-gray-900 ">{props.quiz.name}</h2>
              </div>

              <div className="flex items-center gap-3">
                <div
                  onClick={() => {
                    handleQuizView(props.quiz._id);
                  }}
                >
                  <FaRegEye
                    className={`text-primary cursor-pointer ${
                      role === "instructor" || "learner" ? "block" : "hidden"
                    }`}
                    size={18}
                  />
                </div>

                <SlTrash
                  className={`text-sec_pink cursor-pointer ${
                    role === "instructor" ? "block" : "hidden"
                  }`}
                  size={15}
                />
              </div>
            </div>

            <div className="flex items-center justify-between ">
              <div className="md:w-[280px] hidden md:block">
                {" "}
                <p className="text-gray-700 ml-2 text-sm">
                  {props.quiz.description}
                </p>
              </div>

              <div
                className={`flex items-center gap-3 text-gray-800 ${
                  role === "instructor" || "learner" ? "block" : "hidden"
                }`}
              >
                <div className="flex gap-1.5 items-center">
                  <BsPatchQuestion size={16} />
                  <p className="text-sm text-gray-500">
                    {props.quiz.questions.length} ques
                  </p>
                </div>

                <div className="flex gap-1 items-center">
                  <PiClockCountdown size={18} />
                  <p className="text-sm text-gray-500">
                    {props.quiz.timeLimit} mins
                  </p>
                </div>

                <div
                  className={`flex items-center gap-1.5 ${
                    role === "instructor" ? "block" : "hidden"
                  }`}
                >
                  <GoPeople size={15} />
                  <p className="text-sm">({props.quiz.submissions.length})</p>
                </div>
              </div>

              <div
                className={`flex items-center gap-2 text-gray-800 ${
                  role === "instructor" ? "hidden" : "block"
                }`}
              >
                {props.completed_ids?.includes(props.quiz._id) ? (
                  <>
                    <p className="text-sm bg-green-500 rounded-xl text-white px-2 py-[1px]">
                      Passed
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm bg-yellow-500 rounded-xl text-white px-2 py-[1px]">
                      Pending
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center mt-1.5">
              <div className="text-sm text-gray-500">
                <div className="flex gap-2 items-center">
                  <IoCalendarOutline />{" "}
                  <p className="text-[12px]">
                    {new Date(props.quiz.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {role === "learner" ? (
                <div className={"text-sm text-gray-500"}>
                  {props.quizProgress?.map((quizProgress) => {
                    if (quizProgress.quizId === props.quiz._id) {
                      return (
                        <>
                          <strong>Score: </strong>
                          {quizProgress.score}/{props.quiz.questions.length}
                        </>
                      );
                    }
                  })}
                </div>
              ) : (
                <div className={"text-sm text-gray-500"}>
                  <strong>Full Mark: </strong>
                  {props.quiz.questions.length}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizListItemMolecule;
