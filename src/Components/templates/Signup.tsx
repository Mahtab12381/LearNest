import Breadcrumbs from "../atoms/Breadcrumbs";
import SignupFormOrganism from "../organisms/Auth/signupFormOrganism";
const Signup = () => {
  return (
    <>
      <div className=" h-[150px] bg-gray-100 flex justify-center items-center mt-[68px]">
        <div className="text-center">
          <p className="text-3xl mb-2">Create New Account</p>
          <Breadcrumbs steps={["Signup"]} />
        </div>
      </div>
      <div className="lg:w-5/6 2xl:container mx-auto lg:flex gap-5">
        <div className="sm:h-[550px] md:h-[600px] lg:h-[850px] xl:h-[820px] 2xl:h-[850px] flex flex-col lg:w-3/5 items-center justify-center">
          <img
            src="/learning.svg"
            className="sm:h-[550px] md:h-[600px] 2xl:h-[650px] object-cover object-center"
          ></img>
        </div>
        <div className="sm:h-[750px] md:h-[750px] lg:h-[800px] xl:h-[820px] 2xl:h-[850px] lg:flex lg:flex-col lg:items-center lg:justify-center lg:w-2/5">
          <div className="container mx-auto md:max-w-lg ">
            <SignupFormOrganism />
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
