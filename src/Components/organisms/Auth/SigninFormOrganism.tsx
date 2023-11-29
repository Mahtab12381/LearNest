import Button from "../../atoms/Button";
import SigninFormMolecule from "../../molecules/Auth/SigninFormMolecule";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const SigninFormOrganism = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/signup");
    console.log("sign");
  };
  return (
    <div className="border p-7 rounded-lg border-gray-200 m-5">
      <h1 className="text-2xl text-center w-full mb-5">Hi,Welcome Back</h1>
      <SigninFormMolecule />
      <div className="mt-2">
        <p className=" text-right">
          <NavLink to="/forget_password" className="text-sec_pink">
            Forget Password?
          </NavLink>
        </p>
      </div>
      <div className="flex items-center mt-3">
        <hr className="flex-grow bg-gray-400" />
        <p className="text-center mx-4">Didn't have an account?</p>
        <hr className="flex-grow bg-gray-400" />
      </div>
      <Button
        className="mt-3"
        text="SignUp"
        outline
        hover
        onClick={handleClick}
      />
    </div>
  );
};

export default SigninFormOrganism;
