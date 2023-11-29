//@ts-nocheck
import Forminput from "../../atoms/Forminput";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SlPlus, SlMinus } from "react-icons/sl";
import Button from "../../atoms/Button";
import { useDispatch, useSelector } from "react-redux";
import { addTab } from "../../../Store/Slices/tabSlice";
import { doneTab } from "../../../Store/Slices/tabSlice";
import { addCourseLesson } from "../../../Store/Slices/tabSlice";
import { toast } from "react-toastify";
import customAxios from "../../../Utils/customAxios";

interface CourseBAsic {
  title: string;
}

const CourseLession = () => {
  
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const currTab = useSelector((state: any) => state.tab.createcourseTab);
  const done = useSelector((state: any) => state.tab.tabComplete);
  const lesson = useSelector((state: any) => state.tab.lesson);
  const initialField = lesson?Object.keys(lesson).length>0?Object.keys(lesson).length:3:3;
  const courseBasic = useSelector((state: any) => state.tab.courseBasic);
  const [lessonCount, setLessonCount] = useState(initialField);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CourseBAsic>({
    mode: "onChange",
  });

  const onSubmit = (data: CourseBAsic) => {
    if (done < 1) {
      toast.error("Please complete previous steps");
      return;
    }
    setLoading(true);
    const arrayOfStrings = Object.values(data);
    const newData = {
      sections: arrayOfStrings,
    };
    customAxios
      .post(`/course/update/${courseBasic._id}`, newData)
      .then(() => {
        dispatch(addTab({ createcourseTab: currTab + 1 }));
        dispatch(doneTab({ tabComplete: 2 }));
        dispatch(addCourseLesson({ lesson: data }));
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast.error(err.response.data.error[0].msg);
        } else {
          toast.error(err.response.data.message);
        }
      });
    setLoading(false);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        {[...Array(lessonCount)].map((e, i) => {
          return (
            <>{ lesson &&
              <div  key={e} className="flex gap-3">
                <div className="w-full">
                  <Forminput
                    label={`Lesson Title ${i + 1}`}
                    type={`title${i + 1}`}
                    placeholder={`Title ${i + 1}`}
                    value=""
                    defaultValue={lesson?lesson[`title${i + 1}`]:""}
                    name={`title${i + 1}`}
                    control={control}
                    rules={{
                      required: `Title ${i + 1} is required`,
                      maxLength: {
                        value: 150,
                        message: `Title ${
                          i + 1
                        } should be less than 150 characters`,
                      },
                    }}
                    errors={errors}
                  />
                </div>

                {lessonCount > 1 && (
                  <div
                    className="cursor-pointer"
                    onClick={() => setLessonCount(lessonCount - 1)}
                  >
                    <SlMinus />
                  </div>
                )}
              </div>

            }
            </>
          );
        })}
        <div className="flex justify-between items-center w-full">
          <div
            className="cursor-pointer"
            onClick={() => setLessonCount(lessonCount + 1)}
          >
            <SlPlus />
          </div>

          {loading ? (
            <Button
              className="md:w-[100px] py-0.5 float-right"
              text="Loading"
              hover
              disabled={true}
            />
          ) : (
            <Button
              className="md:w-[100px] py-0.5 float-right"
              text="Next"
              hover
              disabled={false}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default CourseLession;
