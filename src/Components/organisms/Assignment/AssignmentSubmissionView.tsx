import React from "react";
import { useEffect } from "react";
import SearchInput from "../../atoms/SearchInput";
import AssignmentsubmissionCard from "../../molecules/Assignment/AssignmentsubmissionCard";
import PaginationOrganism from "../Others/PaginationOrganism";
import customAxios from "../../../Utils/customAxios";
import { useParams } from "react-router-dom";
import { useSelect } from "@material-tailwind/react";
import { useSelector } from "react-redux";
type AssignmentSubmission = {
    _id: string;    
    assignmentId: string;
    name: string;
    email: string;
    imageUrl: string;
    score: number;
    attachment: string[];
    submissionDate: string; 
    feedback?: string;
}

type Props = {

};

const AssignmentSubmissionView = (props: Props) => {
    const [assignmentData, setAssignmentData] = React.useState<AssignmentSubmission[]>([]);
    const [reload, setReload] = React.useState(false);
    const { id } = useParams();

    const assignmentReload = useSelector((state:any) => state.reload.assignmentReload);
    useEffect(() => {
        customAxios
            .get("/assignment/get-submittions-by-assignment/"+id)
            .then((res) => {
            setAssignmentData(res.data.data);
            })
            .catch((err) => {
            console.log(err.response.data.message);
            });
    }, [assignmentReload,reload]);

  return (
    <div className="flex flex-col justify-between h-[81vh]">
      <div>
        <div className="flex justify-center md:justify-between items-center mt-5 md:container md:mx-auto">
          <div>
            <h1 className="text-2xl font-semibold ml-3">Submissions</h1>
          </div>
          <div className="md:flex justify-center items-center">
            <div className="md:mr-5 hidden md:block">
            <SearchInput 
              onChange={(value: string) => {
                const filteredData = assignmentData.filter((course: AssignmentSubmission) => {
                  return course.name.toLowerCase().includes(value.toLowerCase());
                });
                setAssignmentData(filteredData);
                if(value===""){
                  setReload(prev=>!prev);
                }
              }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="h-full overflow-y-scroll scrollbar-hidden">
        {assignmentData.length > 0 ? (
          <>
            {assignmentData.map((assignment) => (
              <div key={`${assignment._id}/${assignment.assignmentId}`}>
                <AssignmentsubmissionCard assignmentSubmission={assignment}/>
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
      <PaginationOrganism totalResults={1} pageNumber={1} limit={1} />
    </div>
  );
};

export default AssignmentSubmissionView;
