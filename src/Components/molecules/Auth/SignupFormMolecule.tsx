import Forminput from "../../atoms/Forminput";
import PasswordInput from "../../atoms/PasswordInput";
import Button from "../../atoms/Button";
import Select from "../../atoms/Select";
import useSignup from "../../../CustomHooks/useSignup";

const SignupFormMolecule = () => {
  const {
    control,
    handleSubmit,
    errors,
    onSubmit,
    loading,
    watch,
    setSelectedRole,
  } = useSignup();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Forminput
        label="Name"
        type="text"
        placeholder="Name"
        value=""
        name="name"
        control={control}
        rules={{
          required: "Name is required",
          length: {
            value: 30,
            message: "Max length is 30",
          },
        }}
        errors={errors}
      />
      <Forminput
        label="Email"
        type="text"
        placeholder="Email"
        value=""
        name="email"
        control={control}
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
          length: {
            value: 30,
            message: "Max length is 30",
          },
        }}
        errors={errors}
      />

      <Select
        label="Role"
        options={[
          { label: "Learner", value: "learner" },
          { label: "Instructor", value: "instructor" },
        ]}
        value=""
        control={control}
        errors={errors}
        rules={{ required: "Role is required" }}
        name="role"
        onchange={(e) => setSelectedRole(e.target.value)}
        watch={watch}
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
        <Button
          className="mt-2"
          text="Loading"
          hover
          disabled={true}
          onClick={() => console.log("Clicked!")}
        />
      ) : (
        <Button
          className="mt-2"
          text="Sign up"
          hover
          disabled={false}
          onClick={() => console.log("Clicked!")}
        />
      )}
    </form>
  );
};

export default SignupFormMolecule;
