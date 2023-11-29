import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import rootReducer from "../Store/rootReducer";
import { useDispatch } from "react-redux";
import { deleteUser } from "../Store/Slices/userSlice";

export type RootState = ReturnType<typeof rootReducer>;


const InstructorAuth = () => {
  const role = useSelector((state:RootState) => state.user.role);
  if(role != "instructor"){
    const dispatch = useDispatch();
    dispatch(deleteUser());
  }
  return role === "instructor" ? (
    <div>
      <Outlet />{" "}
    </div>
  ) : (
    <>
      <Navigate to="/signin" />
    </>
  );
};

export default InstructorAuth;
