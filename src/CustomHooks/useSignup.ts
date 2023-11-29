import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import customAxios from "../Utils/customAxios";
import { useState } from "react";
import { toast } from "react-toastify";

interface LoginForm {
  name: string;
  email: string;
  password: string;
  cpassword: string;
  role: string;
}

const useSignup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("learner");
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm<LoginForm>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    setLoading(true);
    const newData = {
      ...data,
      role: selectedRole,
      address: "-",
      country: "-",
    };
    customAxios
      .post("/auth/signup", newData)
      .then((res) => {
        toast.success(res.data.message);
        reset();
        setLoading(false);
        navigate("/signin");
      })
      .catch((err) => {
        if (err.response.status === 409) {
          toast.error("Email already exists");
        } else {
          toast.error(err.response.data.error[0].msg);
        }
        setLoading(false);
      });
  };

  return {
    handleSubmit,
    control,
    errors,
    onSubmit,
    loading,
    watch,
    setSelectedRole,
  };
};

export default useSignup;
