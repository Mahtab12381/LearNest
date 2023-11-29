import React, { useEffect } from "react";
import customAxios from "../../../Utils/customAxios";
import { useParams } from "react-router-dom";
import DisplayQuizFormMolecule from "../../molecules/Quiz/DisplayQuizFormMolecule";
import CountdownTimer from "../../atoms/CountDownTimer";
import { toast } from "react-toastify";
import Button from "../../atoms/Button";
import { useSelector } from "react-redux";

interface Question {
  questionText: string;
  options: string[];
  correctAnswer: string;
}

interface QuizFormData {
  name: string;
  description: string;
  questions: Question[];
  timeLimit: string;
  course: string;
  created_by: string;
  isDeleted: boolean;
  submissions: string[];
  createdAt: string;
}
type Props = {};

const DisplayQuizOrganism = (props: Props) => {
  const [quizData, setQuizData] = React.useState<QuizFormData>();
  const [time, setTime] = React.useState<number>(0);
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [show, setShow] = React.useState<boolean>(false);
  const role = useSelector((state: any) => state.user.role);
  const [timer, setTimer] = React.useState<boolean>(false);

  useEffect(() => {
    customAxios
      .get("/quiz/id/" + id)
      .then((res) => {
        setQuizData(res.data.data);
        setTime(res.data.data.timeLimit);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);

  const handleStartQuiz = () => {
    setLoading(true);
    customAxios
      .post("/quiz/start/" + id)
      .then((res) => {
        setLoading(false);
        setShow(true);
        setTimer(true);
        toast.success(res.data.message);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.message);
      });
  };

  const handleViewQuiz = () => {
    setShow(true);
  };

  return (
    <>
      <div>
        <div className="flex justify-center md:justify-between items-center mt-5 md:container md:mx-auto">
          <div>
            <h1 className="text-2xl font-semibold ml-3">Quiz Preview</h1>
          </div>
          <div className="md:flex justify-center items-center">
            <div className="md:mr-5 hidden md:block"></div>
          </div>
        </div>
        <div className="h-[80vh] flex w-full">
          <div className="w-1/2">
            <div className="mt-3 bg-white rounded-xl border p-5 mr-5">
              <p className="text-3xl mb-2">{quizData?.name}</p>
              <div className="pl-3">
                <p>{quizData?.description}</p>
                <p>
                  <span className="font-semibold">Time Limit: </span>
                  {quizData?.timeLimit} minutes
                </p>
                <p>
                  <span className="font-semibold">Total Question: </span>{" "}
                  {quizData?.questions.length}
                </p>
                <p>
                  <span className="font-semibold">Total Mark: </span>{" "}
                  {quizData?.questions.length}
                </p>
                <p>
                  <span className="font-semibold">Created: </span>{" "}
                  {new Date(quizData?.createdAt!).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className=" flex justify-center items-center flex-col gap-3">
              {role === "learner" && quizData && (
                <CountdownTimer totalTime={time * 60} startTimer={timer} />
              )}
              {role === "learner" && (
                <>
                  {loading ? (
                    <Button
                      className="md:w-[150px] py-0.5"
                      text="Loading"
                      hover
                      disabled={true}
                    />
                  ) : (
                    <Button
                      className="md:w-[150px] py-0.5 disabled:opacity-50 disabled:hover:bg-primary"
                      text="Start Quiz"
                      hover
                      disabled={timer?true:false}
                      onClick={handleStartQuiz}
                    />
                  )}
                </>
              )}
              {role === "instructor" && (
                <>
                  {loading ? (
                    <Button
                      className="md:w-[150px] py-0.5 mt-10"
                      text="Loading"
                      hover
                      disabled={true}
                    />
                  ) : (
                    <Button
                      className="md:w-[150px] py-0.5 mt-10"
                      text="View Quiz"
                      hover
                      disabled={false}
                      onClick={handleViewQuiz}
                    />
                  )}
                </>
              )}
            </div>
          </div>
          <div className="w-1/2 overflow-y-scroll scrollbar-hidden h-[80vh] pt-3">
            <DisplayQuizFormMolecule quiz={quizData} show={show} setTimer = {setTimer} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayQuizOrganism;
