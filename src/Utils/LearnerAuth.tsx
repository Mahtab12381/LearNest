import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import rootReducer from "../Store/rootReducer";
import { useDispatch } from "react-redux";
import { deleteUser } from "../Store/Slices/userSlice";

export type RootState = ReturnType<typeof rootReducer>;

const LearnerAuth = () => {
  const role = useSelector((state: RootState) => state.user.role);
  if (role != "learner") {
    const dispatch = useDispatch();
    dispatch(deleteUser());
  }
  return role === "learner" ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <>
      <Navigate to="/signin" />
    </>
  );
};

export default LearnerAuth;
