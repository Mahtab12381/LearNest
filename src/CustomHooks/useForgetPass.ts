import { useForm, SubmitHandler } from "react-hook-form";
import customAxios from "../Utils/customAxios";
import { useState } from "react";
import { toast } from 'react-toastify';

interface ForgetPassForm {
  email: string;
}

const useForgetPass = () => {
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ForgetPassForm>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ForgetPassForm> = (data) => {
    setLoading(true);
    customAxios
      .post("/auth/forgot-password", data)
      .then((res) => {
        toast.success(res.data.message);
        reset();
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };

  return {
    handleSubmit,
    control,
    errors,
    onSubmit,
    loading,
  };
};

export default useForgetPass;
