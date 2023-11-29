import helper from "../../../Utils/helper";
import { toast } from "react-toastify";
import { MdDownloading } from "react-icons/md";
import customAxios from "../../../Utils/customAxios";
import Forminput from "../../atoms/Forminput";
import { useForm } from "react-hook-form";
import { MdFileUpload } from "react-icons/md";
import { useDispatch } from "react-redux";
import { execAssignmentReload } from "../../../Store/Slices/reloadSlice";

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
};

type assignMentReturn = {
  feedback: string;
  score: number;
};
type Props = {
  assignmentSubmission: AssignmentSubmission;
};

const AssignmentsubmissionCard = (props: Props) => {
    const dispatch = useDispatch();
  const { getTimeAgo } = helper();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<assignMentReturn>({
    mode: "onChange",
  });

  const onSubmit = (data: assignMentReturn) => {
    customAxios
      .post(
        "/assignment/scorepost/" +
          props.assignmentSubmission._id +
          "/" +
          props.assignmentSubmission.assignmentId,
        {
          feedback: data.feedback,
          score: data.score,
        }
      )
      .then((res) => {
        dispatch(execAssignmentReload());
        toast.success(res.data.message);
        
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  return (
    <>
      <div className="flex items-start justify-between gap-1 py-3 border-b">
        <div className="flex md:gap-2 gap-0.5">
          <div className="flex justify-end md:w-[100px] items-start w-[50px]">
            <img
              className="md:h-16 md:w-16 rounded-full h-10 w-10 "
              src={
                import.meta.env.VITE_BUCKET_BASE +
                props.assignmentSubmission.imageUrl
              }
              alt={`${props.assignmentSubmission.name}'s`}
            />
          </div>

          <div className="">
            <p className="text-gray-900 font-semibold text-md">
              {props.assignmentSubmission.name}
            </p>
            <p className="text-gray-600 text-[12px] text-sm ml-1">
              {getTimeAgo(props.assignmentSubmission.submissionDate)}
            </p>
            <div className="mt-2">
              {!props.assignmentSubmission.feedback ? (
                <p className="bg-yellow-500 rounded-xl px-2 text-white text-center w-[75px] text-sm">
                  Pending
                </p>
              ) : (
                <p className="bg-green-500 rounded-xl px-2 text-white text-center w-[75px] text-sm">
                  FeedBack
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="lg:w-[700px]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="lg:flex items-center lg:gap-5"
          >
            <div className="lg:w-2/3">
              <Forminput
                label="Feedback"
                type="feedback"
                placeholder="Feedback"
                defaultValue={props.assignmentSubmission.feedback}
                name="feedback"
                control={control}
                rules={{
                  required: "Feedback is required",
                  maxLength: {
                    value: 150,
                    message: "Less than 150 characters",
                  },
                }}
                errors={errors}
              />
            </div>
            <div className="lg:w-1/3">
              <Forminput
                label="Score"
                type="score"
                placeholder="Score"
                defaultValue={props.assignmentSubmission.score.toString()}
                name="score"
                control={control}
                rules={{
                  required: "Score is required",
                  maxLength: {
                    value: 3,
                    message: "Less than 3 characters",
                  },
                }}
                errors={errors}
              />
            </div>
          </form>
        </div>
        <div className="flex gap-3 items-center justify-center">
          <div
            onClick={(e) => {
              e.preventDefault();
              window.location.href =
                import.meta.env.VITE_BUCKET_BASE +
                props.assignmentSubmission.attachment[0];
            }}
          >
            <MdDownloading
              className={`text-primary cursor-pointer`}
              size={22}
            />
          </div>
          <div
            onClick={() => {
              handleSubmit(onSubmit)();
            }}
          >
            <MdFileUpload className={`text-primary cursor-pointer`} size={22} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignmentsubmissionCard;
