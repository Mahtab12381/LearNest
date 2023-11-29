import Button from "../../atoms/Button";
import SignupFormMolecule from "../../molecules/Auth/SignupFormMolecule";
import { useNavigate } from "react-router-dom";

const SignupFormOrganism = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signin");
  };

  return (
    <div className="border p-7 rounded-lg border-gray-200 m-5">
      <h1 className="text-2xl text-center w-full mb-5">Welcome To LearNest</h1>
      <SignupFormMolecule />
      <div className="flex items-center mt-3">
        <hr className="flex-grow bg-gray-400" />
        <p className="text-center mx-4">Already have an account?</p>
        <hr className="flex-grow bg-gray-400" />
      </div>
      <Button className="mt-3" text="SignIn" outline hover onClick={handleClick} />
    </div>
  );
};

export default SignupFormOrganism;
