import Breadcrumbs from "../atoms/Breadcrumbs";
import ForgetPasswordOrganism from "../organisms/Auth/ForgetPasswordOrganism";
const ForgetPassword = () => {
  return (
    <>
      <div className=" h-[150px] bg-gray-100 flex justify-center items-center mt-[68px]">
        <div className="text-center">
          <p className="text-3xl mb-2">Forget Password</p>
          <Breadcrumbs steps={["Forget_Password"]} />
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
            <ForgetPasswordOrganism />
          </div>
        </div>
      </div>
    </>
  );
};
export default ForgetPassword;
