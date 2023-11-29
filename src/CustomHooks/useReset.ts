import { useForm, SubmitHandler } from "react-hook-form";
import customAxios from "../Utils/customAxios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface ResetForm {
  password: string;
  cpassword: string;
}
const useReset = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id, token } = useParams();
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm<ResetForm>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ResetForm> = (data) => {
    const bodydata = {
      password: data.password,
      token: token,
      id: id,
    };
    setLoading(true);
    customAxios
      .post("/auth/reset-password", bodydata)
      .then((res) => {
        setLoading(false);
        reset();
        toast.success(res.data.message);
        navigate("/signin");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) {
          toast.error(err.response.data.error[0].msg);
        } else {
          toast.error(err.response.data.message);
        }
      });
    reset();
  };

  return {
    handleSubmit,
    control,
    errors,
    onSubmit,
    loading,
    watch,
  };
};

export default useReset;
