// AssignmentCard.tsx
import React from "react";
import { MdDownloading, MdFileUpload } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import { SlNote, SlTrash } from "react-icons/sl";
import { useSelector, useDispatch } from "react-redux";
import { GoPeople } from "react-icons/go";
import { useEffect } from "react";
import customAxios from "../../../Utils/customAxios";
import { toast } from "react-toastify";
import { execAssignmentReload } from "../../../Store/Slices/reloadSlice";
import { useNavigate } from "react-router-dom";

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

interface AssignmentCardProps {
  assignment: Assignment;
  edit_delete?: boolean;
  assignMentProgress?: AssignmentProgress;
  completed_ids?: string[];
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({
  assignment,
  assignMentProgress,
  completed_ids,
}) => {
  const role = useSelector((state: any) => state.user.role);
  const [file, setFile] = React.useState<any>(null);
  const [fileUrl, setFileUrl] = React.useState<any>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (file) {
      const formData = new FormData();
      formData.append("file_to_upload", file);
      customAxios
        .post("/files/upload/docs", formData)
        .then((res) => {
          setFileUrl(res.data.data.url);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
  }, [file]);

  const handleSubmit = (id: string) => {
    if (!fileUrl) return toast.error("Please upload a file");
    customAxios
      .post("/assignment/submit/" + id, {
        attachments: [fileUrl],
      })
      .then((res) => {
        toast.success(res.data.message);
        dispatch(execAssignmentReload());
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <>
      <div className="bg-white overflow-hidden border-b w-full">
        <div className="p-3 flex gap-3 justify-start items-center w-full">
          <div>
            <img
              className="h-12 w-12 object-cover"
              src={"/homework.png"}
              alt=""
            />
          </div>

          <div className="w-full">
            <div className="flex justify-between items-center ">
              <div
                onClick={() => {
                  role === "instructor" &&
                  navigate(
                    `/dashboard/instructor/assignment-submissions-view/${assignment._id}`
                  );
                }}
                className="cursor-pointer"
              >
                <h2 className="text-lg text-gray-900 ">{assignment.name}</h2>
              </div>

              <div className="flex items-center gap-2">
                <SlNote
                  className={`text-gray-600 cursor-pointer mr-0.5 ${
                    role === "instructor" ? "block" : "hidden"
                  }`}
                  size={15}
                />
                <SlTrash
                  className={`text-sec_pink cursor-pointer ${
                    role === "instructor" ? "block" : "hidden"
                  }`}
                  size={15}
                />
                <MdDownloading
                  onClick={(e: any) => {
                    e.preventDefault();
                    window.location.href =
                      import.meta.env.VITE_BUCKET_BASE +
                      assignment.attachments[0];
                  }}
                  className={`text-primary cursor-pointer`}
                  size={20}
                />
                <MdFileUpload
                  onClick={() => handleSubmit(assignment._id)}
                  className={`text-primary cursor-pointer ${
                    completed_ids?.includes(assignment._id) ||
                    role === "instructor"
                      ? "hidden"
                      : "block"
                  }  `}
                  size={20}
                />
              </div>
            </div>

            <div className="flex items-center justify-between ">
              <div className="xl:w-[280px]">
                {" "}
                <p className="text-gray-700 ml-2 text-sm">
                  {assignment.description}
                </p>
              </div>

              <div
                className={`flex items-center gap-2 text-gray-800 ${
                  role === "instructor" ? "block" : "hidden"
                }`}
              >
                <GoPeople size={15} />
                <p className="text-sm">({assignment.submissions.length})</p>
              </div>

              <div
                className={`flex items-center gap-2 text-gray-800 ${
                  role === "instructor" ? "hidden" : "block"
                }`}
              >
                {completed_ids?.includes(assignment._id) ? (
                  <>
                    <p className="text-sm bg-green-500 rounded-xl text-white px-2 py-[1px]">
                      submited
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm bg-yellow-500 rounded-xl text-white px-2 py-[1px]">
                      pending
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                <div className="flex gap-2 items-center">
                  <IoCalendarOutline />{" "}
                  <p className="text-[12px]">
                    {new Date(assignment.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {role === "learner" ? (
                <div className={"text-sm text-gray-500"}>
                  {assignMentProgress?.assignmentProgress.map(
                    (assignmentProgress) => {
                      if (assignmentProgress.assignmentId === assignment._id) {
                        return (
                          <>
                            <strong>Score: </strong>
                            {assignmentProgress.score === 0
                              ? "-"
                              : assignmentProgress.score}
                            /{assignment.mark}
                          </>
                        );
                      }
                    }
                  )}
                </div>
              ) : (
                <div className={"text-sm text-gray-500"}>
                  <strong>Full Mark: </strong>
                  {assignment.mark}
                </div>
              )}
              {
                role === "learner" && !completed_ids?.includes(assignment._id)?
                  <div className={"text-sm text-gray-500"}>
                  <strong>Full Mark: </strong>
                  {assignment.mark}
                </div>:<></>
                }
            </div>
          </div>
        </div>

        {role === "learner" ? (
          <>
            <div
              className={`${
                completed_ids?.includes(assignment._id) ? "hidden" : "block"
              } `}
            >
              <input
                type="file"
                className="bg-gray-100 p-1 w-full text-sm"
                name=""
                id=""
                onChange={(e: any) => {
                  setFile(e.target.files[0]);
                }}
              ></input>
            </div>

            <div
              className={`bg-gray-100 p-1 w-full text-sm ${
                completed_ids?.includes(assignment._id) ? "block" : "hidden"
              } `}
            >
              <p>
                <strong>Feedback: </strong>
                {assignMentProgress?.assignmentProgress.map(
                  (assignmentProgress) => {
                    if (assignmentProgress.assignmentId === assignment._id) {
                      return (
                        <>
                          {assignmentProgress.feedback
                            ? assignmentProgress.feedback
                            : "Score Not Posted Yet"}
                        </>
                      );
                    }
                  }
                )}
              </p>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default AssignmentCard;
