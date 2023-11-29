import Breadcrumbs from "../atoms/Breadcrumbs";
import ResetPasswordOrganism from "../organisms/Auth/ResetPasswordOrganism";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import customAxios from "../../Utils/customAxios";
import { toast } from "react-toastify";
const ResetPassword = () => {
  const { id, token } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    customAxios
      .post(`/auth/check-token`, { id, token })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        toast.error("Resend Password Reset Request");
        setLoading(false);
        navigate("/forget_password");
      });
  }, []);

  return (
    <>
      {loading ? (
        <>
          <h1>Loading</h1>
        </>
      ) : (
        <>
          <div className=" h-[150px] bg-gray-100 flex justify-center items-center mt-[68px]">
            <div className="text-center">
              <p className="text-3xl mb-2">Reset Your Password</p>
              <Breadcrumbs steps={["Reset_Password"]} />
            </div>
          </div>
          <div className="lg:w-5/6 2xl:container mx-auto lg:flex gap-5">
            <div className="sm:h-[550px] md:h-[600px] lg:h-[550px] xl:h-[600px] 2xl:h-[850px] flex flex-col lg:w-3/5 items-center justify-center">
              <img
                src="/learning.svg"
                className="sm:h-[550px] md:h-[600px] 2xl:h-[650px] object-cover object-center"
              ></img>
            </div>
            <div className="sm:h-[400px] md:h-[400px] lg:h-[550px] xl:h-[600px] 2xl:h-[850px] lg:flex lg:flex-col lg:items-center lg:justify-center lg:w-2/5">
              <div className="container mx-auto md:max-w-lg ">
                <ResetPasswordOrganism />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default ResetPassword;
