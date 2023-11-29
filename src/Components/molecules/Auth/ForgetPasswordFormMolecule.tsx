import Forminput from "../../atoms/Forminput";
import Button from "../../atoms/Button";
import { useSelector } from "react-redux";
import  useForgetPass  from "../../../CustomHooks/useForgetPass";

const ForgetPasswordFormMolecule = () => {
  const email = useSelector((state:any) => state.user.email);

  const {control, handleSubmit, errors, onSubmit, loading} =
    useForgetPass();

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
          maxLength: {
            value: 50,
            message: "Email should not be greater than 50 characters",
          },
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        }}
        errors={errors}
      />

      {loading ? (
        <Button className="mt-2" text="Loading" hover disabled={true}/>
      ) : (
        <Button className="mt-2" text="Send" hover disabled={false}/>
      )}
    </form>
  );
};

export default ForgetPasswordFormMolecule;
