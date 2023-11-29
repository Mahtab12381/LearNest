import SupportMessageMolecule from "../../molecules/Support/SupportMessageMolecule";
import Button from "../../atoms/Button";
import { useEffect, useRef, useState } from "react";
import customAxios from "../../../Utils/customAxios";
import { toast } from "react-toastify";
import helper from "../../../Utils/helper";
import { useDispatch } from "react-redux";
import { execSupportReload } from "../../../Store/Slices/reloadSlice";
type Props = {
  course: string;
  support: Discussion[];
};

type Discussion = {
  user_id: {
    _id: string;
    name: string;
    imageUrl: string;
    email: string;
  };
  message: string;
  _id: string;
  date: string;
};

const SupportMessageOrganism = (props: Props) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const scrollableDivRef = useRef(null);
  const { getTimeAgo } = helper();

  useEffect(() => {
    if (scrollableDivRef.current) {
      (scrollableDivRef.current as HTMLDivElement).scrollTop = (
        scrollableDivRef.current as HTMLDivElement
      ).scrollHeight;
    }
  }, [props.support]);

  const handleSubmitMsg = () => {
    setLoading(true);
    const bodyData = {
      course: props.course,
      message: message,
    };

    customAxios
      .post("/support/add", bodyData)
      .then((res) => {
        toast.success(res.data.message);
        dispatch(execSupportReload());
        setLoading(false);
        setMessage("");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast.error("Please Login First");
          setLoading(false);
        } else if (err.response.status === 400) {
          toast.error(err.response.data.message[0].msg);
          setLoading(false);
        } else {
          toast.error(err.response.data.message);
          setLoading(false);
        }
      });
  };

  return (
    <>
      <div
        ref={scrollableDivRef}
        className="h-[50vh] overflow-y-scroll scrollbar-hidden"
      >
        {props.support ? (
          props.support?.map((item: Discussion) => {
            return (
              <div className="border-b break-all">
                <SupportMessageMolecule
                  userEmail={item.user_id.email}
                  userName={item.user_id.name}
                  avatarUrl={
                    import.meta.env.VITE_BUCKET_BASE + item.user_id.imageUrl
                  }
                  message={item.message}
                  supportDate={getTimeAgo(item.date)}
                />
              </div>
            );
          })
        ) : (
          <div className="h-[50vh] flex justify-center items-center">
            <img
              className="object-center h-[60px] opacity-40"
              src="/no-speak.png"
            ></img>
          </div>
        )}
      </div>
      <div className="px-2">
        <textarea
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="w-full h-28 border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-primary mb-3 mt-5"
          placeholder="Write your Problem here..."
        ></textarea>
        {loading ? (
          <Button
            className="md:w-[100px] px-5 py-0.5 mb-5 md:float-right"
            text="Loading"
            hover
            disabled={true}
          />
        ) : (
          <Button
            className="md:w-[100px] w-[84px] px-5 py-0.5 md:float-right mb-5"
            text="Post"
            hover
            disabled={false}
            onClick={handleSubmitMsg}
          />
        )}
      </div>
    </>
  );
};

export default SupportMessageOrganism;
