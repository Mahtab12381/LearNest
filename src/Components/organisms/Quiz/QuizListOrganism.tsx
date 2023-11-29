import React from "react";
import { useNavigate } from "react-router-dom";
import CircleButton from "../../atoms/CircleButton";
import SearchInput from "../../atoms/SearchInput";
import QuizListItemMolecule from "../../molecules/Quiz/QuizListItemMolecule";
import PaginationOrganism from "../Others/PaginationOrganism";
import customAxios from "../../../Utils/customAxios";
import { useEffect } from "react";

interface Question {
    questionText: string;
    options: string[];
    correctAnswer: number;
    _id: string;
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
  
type Props = {};

const QuizListOrganism = (props: Props) => {
  const navigate = useNavigate();

  const [quizData, setQuizData] = React.useState<Quiz[]>([]);
  const [reload, setReload] = React.useState(false);

  useEffect(() => {
    customAxios
      .get("quiz/mycreatedquiz")
      .then((res) => {
        setQuizData(res.data.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, [reload]);


  return (
    <div className="flex flex-col justify-between h-[81vh]">
      <div>
        <div className="flex justify-center md:justify-between items-center mt-5 md:container md:mx-auto">
          <div>
            <h1 className="text-2xl font-semibold ml-3">Quiz List</h1>
          </div>
          <div className="md:flex justify-center items-center">
            <div className="md:mr-5">
            <SearchInput 
              onChange={(value: string) => {
                const filteredData = quizData.filter((course: Quiz) => {
                  return course.name.toLowerCase().includes(value.toLowerCase());
                });
                setQuizData(filteredData);
                if(value===""){
                  setReload(prev=>!prev);
                }
              }}
              />
            </div>
            <div>
              <CircleButton
                onClick={() => {
                  navigate("/dashboard/instructor/quiz/add");
                }}
              />
            </div>
          </div>
        </div>
        {quizData.length > 0 ? (
            <>
              {quizData.map((quiz) => (
                <div key={quiz._id}>
                  <QuizListItemMolecule quiz={quiz} />
                </div>
              ))}
            </>
          ) : (
            <>
              <div className="flex justify-center items-center h-[70vh]">
                <h1 className="text-2xl font-semibold">No Quizs</h1>
              </div>            
            </>
          )}
      </div>

      <div>
        <PaginationOrganism totalResults={1} pageNumber={1} limit={1} />
      </div>
    </div>
  );
};

export default QuizListOrganism;
