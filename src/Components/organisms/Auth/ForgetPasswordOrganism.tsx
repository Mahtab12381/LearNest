import Button from "../../atoms/Button";
import ForgetPasswordFormMolecule from "../../molecules/Auth/ForgetPasswordFormMolecule";
import { useNavigate } from "react-router-dom";

const ForgetPasswordOrganism = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/signin");
  };
  return (
    <div className="border p-7 rounded-lg border-gray-200 m-5">
      <h1 className="text-2xl text-center w-full mb-5">Send Verification Link</h1>
      <ForgetPasswordFormMolecule />
      <div className="flex items-center mt-3">
        <hr className="flex-grow bg-gray-400" />
        <p className="text-center mx-4">Can you recall?</p>
        <hr className="flex-grow bg-gray-400" />
      </div>
      <Button
        className="mt-3"
        text="Signin"
        outline
        hover
        onClick={handleClick}
      />
    </div>
  );
};

export default ForgetPasswordOrganism;
