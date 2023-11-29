import PasswordInput from "../../atoms/PasswordInput";
import Button from "../../atoms/Button";
import useReset from "../../../CustomHooks/useReset";

const ResetPassMolecule = () => {
  const { control, handleSubmit, errors, onSubmit, loading, watch } =
    useReset();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          pattern: {
            value:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
            message:
              "Password must contain atleast one uppercase letter, one lowercase letter, one number and one special character",
          },
        }}
      />
      <PasswordInput
        control={control}
        errors={errors}
        confirmPass={true}
        watch={watch}
      />

      {loading ? (
        <Button text="Loading" hover disabled={true} />
      ) : (
        <Button text="Reset Password" hover disabled={false} />
      )}
    </form>
  );
};

export default ResetPassMolecule;
