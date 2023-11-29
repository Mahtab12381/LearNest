import React from "react";
import SearchInput from "../../atoms/SearchInput";
import Dropdown from "../../atoms/Dropdown";
import CircleButton from "../../atoms/CircleButton";
import { useNavigate } from "react-router-dom";
import PaginationOrganism from "../Others/PaginationOrganism";
import AssignmentCard from "../../molecules/Assignment/AssignmentCard";
import { useEffect } from "react";
import customAxios from "../../../Utils/customAxios";

interface Assignment {
  _id: string;
  name: string;
  description: string;
  attachments: string[];
  mark: number;
  course: string;
  created_by: string;
  isDeleted: string;
  submissions: string[];
  createdAt: string;
  updatedAt: string;
}
type Props = {};

const AssignmentOrganism = (props: Props) => {
  const [assignmentData, setAssignmentData] = React.useState<Assignment[]>([]);
  const [reload, setReload] = React.useState(false);

  useEffect(() => {
    customAxios
      .get("assignment/mycreatedassignment")
      .then((res) => {
        setAssignmentData(res.data.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, [reload]);

  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col justify-between h-[81vh]">
        <div className="flex justify-center md:justify-between items-center mt-5 md:container md:mx-auto">
          <div>
            <h1 className="text-2xl font-semibold ml-3">Assignments</h1>
          </div>
          <div className="md:flex justify-center items-center">
            <div className="md:mr-5">
            <SearchInput 
              onChange={(value: string) => {
                const filteredData = assignmentData.filter((course: Assignment) => {
                  return course.name.toLowerCase().includes(value.toLowerCase());
                });
                setAssignmentData(filteredData);
                if(value===""){
                  setReload(prev=>!prev);
                }
              }}
              />
            </div>
            <div>
              <CircleButton
                onClick={() => {
                  navigate("/dashboard/instructor/assignment/add");
                }}
              />
            </div>
          </div>
        </div>

        <div className="h-full overflow-y-scroll scrollbar-hidden">
          {assignmentData.length > 0 ? (
            <>
              {assignmentData.map((assignment) => (
                <div key={assignment._id}>
                  <AssignmentCard assignment={assignment} />
                </div>
              ))}
            </>
          ) : (
            <>
              <div className="flex justify-center items-center h-[70vh]">
                <h1 className="text-2xl font-semibold">No Assignments</h1>
              </div>            
            </>
          )}
        </div>

        <div>
          <PaginationOrganism totalResults={1} pageNumber={1} limit={1} />
        </div>
      </div>
    </>
  );
};

export default AssignmentOrganism;
