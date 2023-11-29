import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { addRole, addUser ,addId} from "../Store/Slices/userSlice";
import customAxios from "../Utils/customAxios";
import { useState } from "react";
import { toast } from 'react-toastify';
import { addNumberOfWishlistItems } from "../Store/Slices/wishSlice";
import { addNumberOfItems } from "../Store/Slices/cartSlice";
import { execProfileImageReload } from "../Store/Slices/reloadSlice";

interface LoginForm {
  email: string;
  password: string;
}

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

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
    customAxios
      .post("/auth/login", data)
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        if (res.data.data.role === "admin") navigate("/dashboard/admin");
        else if (res.data.data.role === "learner") navigate("/dashboard/learner");
        else if (res.data.data.role === "instructor") navigate("/dashboard/instructor");
        else navigate("/signin");
        dispatch(addRole(res.data.data.role));
        dispatch(addUser(data));
        dispatch(addId(res.data.data.id));
        dispatch(addNumberOfWishlistItems(1));
        dispatch(addNumberOfItems(1));
        dispatch(execProfileImageReload())
        toast.success("Login Successful");
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
    watch,
  };
};

export default useLogin;
