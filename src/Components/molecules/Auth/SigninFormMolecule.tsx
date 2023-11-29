import { useState } from "react";
import Forminput from "../../atoms/Forminput";
import PasswordInput from "../../atoms/PasswordInput";
import Checkbox from "../../atoms/Checkbox";
import Button from "../../atoms/Button";
import useLogin from "../../../CustomHooks/useLogin";
import { useSelector } from "react-redux";

const SigninFormMolecule = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const email = useSelector((state: any) => state.user.email);

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const { control, handleSubmit, errors, onSubmit, loading, watch } =
    useLogin();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Forminput
        label="Email"
        type="email"
        placeholder="Email"
        value={email}
        defaultValue={email}
        name="email"
        control={control}
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },

          maxLength: {
            value: 50,
            message: "Email should be less than 50 characters",
          },
        }}
        errors={errors}
      />

      <PasswordInput
        control={control}
        errors={errors}
        confirmPass={false}
        watch={watch}
        rules={{
          required: "Password is required",
          maxLength: {
            value: 32,
            message: "Password should be less than 32 characters",
          },
        }}
      />

      <div className="flex items-center mt-3 mb-3">
        <Checkbox
          label="Remember Me"
          type="checkbox"
          value={rememberMe.toString()}
          onChange={handleRememberMeChange}
        />
      </div>

      {loading ? (
        <Button
          text="Loading"
          hover
          disabled={true}
          onClick={() => console.log("Clicked!")}
        />
      ) : (
        <Button
          text="Login"
          hover
          disabled={false}
          onClick={() => console.log("Clicked!")}
        />
      )}
    </form>
  );
};

export default SigninFormMolecule;
