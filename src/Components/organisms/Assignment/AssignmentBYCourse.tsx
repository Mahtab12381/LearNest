import React from "react";
import AssignmentCard from "../../molecules/Assignment/AssignmentCard";
import { useEffect } from "react";
import customAxios from "../../../Utils/customAxios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

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
type Props = {
  course: string;
};

type AssignmentProgress = {
  _id: string;
  assignmentProgress: AssignmentEntry[];
};

type AssignmentEntry = {
  assignmentId: string;
  submitted: boolean;
  submissionDate: string;
  attachments: string[];
  score: number;
  _id: string;
  feedback: string;
};

const AssignmentBYCourse = (props: Props) => {
  const [assignmentData, setAssignmentData] = React.useState<Assignment[]>([]);
  const [assignmentProgress, setAssignmentProgress] =
    React.useState<AssignmentProgress>();

  const assignmentReload = useSelector(
    (state: any) => state.reload.assignmentReload
  );
  const role = useSelector((state: any) => state.user.role);

  useEffect(() => {
    customAxios
      .get("assignment/bycourse/" + props.course)
      .then((res) => {
        setAssignmentData(res.data.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);

  const completed_ids = assignmentProgress?.assignmentProgress
    .filter((assignment) => assignment.submitted)
    .map((assignment) => assignment.assignmentId);

  useEffect(() => {
    if (role === "learner") {
      customAxios
        .get("/assignment/mysubmittedassignment")
        .then((res) => {
          setAssignmentProgress(res.data.data);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } else {
      return;
    }
  }, [assignmentReload]);

  return (
    <>
      {assignmentData.length > 0 ? (
        <>
          {assignmentData.map((assignment) => (
            <div key={assignment._id}>
              <AssignmentCard
                assignment={assignment}
                assignMentProgress={assignmentProgress}
                completed_ids={completed_ids}
              />
            </div>
          ))}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default AssignmentBYCourse;
