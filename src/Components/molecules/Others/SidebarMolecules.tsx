import React from "react";
import { NavLink } from "react-router-dom";
import { IoExitOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../../Store/Slices/userSlice";
import { addId } from "../../../Store/Slices/userSlice";
import { useNavigate } from "react-router-dom";

import {
  SlHome,
  SlUser,
  SlDrawer,
  SlPuzzle,
  SlBookOpen,
  SlPeople,
  SlTag,
  SlOrganization,
} from "react-icons/sl";
import { useSelector } from "react-redux";

const Sidebar: React.FC = () => {
  const role = useSelector((state: any) => state.user.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(deleteUser());
    dispatch(addId(""));
    navigate("/signin");
  };

  return (
    <div className=" text-black h-[79vh] w-[250px] p-4 my-5 rounded-xl shadow">
      <div className="flex flex-col justify-between h-[75vh]">
        <div>
          {/* <div
            className={`${
              role == "instructor" ? "flex" : "hidden"
            } justify-start items-center gap-3 py-1 pl-5 hover:border-b hover:border-white hover:bg-gray-100 hover:rounded-md border-b`}
          >
            <SlHome />
            <NavLink to="/dashboard/instructor" className="block py-2">
              Home
            </NavLink>
          </div> */}
          <div
            className={`${
              role == "instructor" ? "flex" : "hidden"
            } justify-start items-center gap-3 py-1 pl-5 hover:border-b hover:border-white hover:bg-gray-100 hover:rounded-md border-b`}
          >
            <SlUser />
            <NavLink
              to="/dashboard/instructor/myprofile"
              className="block py-2"
            >
              My Profile
            </NavLink>
          </div>
          <div
            className={`${
              role == "instructor" ? "flex" : "hidden"
            } justify-start items-center gap-3 py-1 pl-5 hover:border-b hover:border-white hover:bg-gray-100 hover:rounded-md border-b`}
          >
            <SlDrawer />
            <NavLink
              to="/dashboard/instructor/mycourses"
              className="block py-2"
            >
              My Courses
            </NavLink>
          </div>
          <div
            className={`${
              role == "instructor" ? "flex" : "hidden"
            } justify-start items-center gap-3 py-1 pl-5 hover:border-b hover:border-white hover:bg-gray-100 hover:rounded-md border-b`}
          >
            <SlPuzzle />
            <NavLink to="/dashboard/instructor/quiz" className="block py-2">
              Quiz
            </NavLink>
          </div>
          <div
            className={`${
              role == "instructor" ? "flex" : "hidden"
            } justify-start items-center gap-3 py-1 pl-5 hover:border-b hover:border-white hover:bg-gray-100 hover:rounded-md border-b`}
          >
            <SlBookOpen />
            <NavLink
              to="/dashboard/instructor/assignment"
              className="block py-2"
            >
              Assignment
            </NavLink>
          </div>
          {/* admin--------------admin--------------------admin------------admin------- */}
          <div
            className={`${
              role == "admin" ? "flex" : "hidden"
            } justify-start items-center gap-3 py-1 pl-5 hover:border-b hover:border-white hover:bg-gray-100 hover:rounded-md border-b`}
          >
            <SlHome />
            <NavLink to="/dashboard/admin" className="block py-2">
              Home
            </NavLink>
          </div>

          <div
            className={`${
              role == "admin" ? "flex" : "hidden"
            } justify-start items-center gap-3 py-1 pl-5 hover:border-b hover:border-white hover:bg-gray-100 hover:rounded-md border-b`}
          >
            <SlUser />
            <NavLink to="/dashboard/admin/myprofile" className="block py-2">
              My Profile
            </NavLink>
          </div>

          <div
            className={`${
              role == "admin" ? "flex" : "hidden"
            } justify-start items-center gap-3 py-1 pl-5 hover:border-b hover:border-white hover:bg-gray-100 hover:rounded-md border-b`}
          >
            <SlDrawer />
            <NavLink to="/dashboard/admin/courses" className="block py-2">
              Courses
            </NavLink>
          </div>

          <div
            className={`${
              role == "admin" ? "flex" : "hidden"
            } justify-start items-center gap-3 py-1 pl-5 hover:border-b hover:border-white hover:bg-gray-100 hover:rounded-md border-b`}
          >
            <SlPeople />
            <NavLink to="/dashboard/admin/users" className="block py-2">
              Users
            </NavLink>
          </div>

          <div
            className={`${
              role == "admin" ? "flex" : "hidden"
            } justify-start items-center gap-3 py-1 pl-5 hover:border-b hover:border-white hover:bg-gray-100 hover:rounded-md border-b`}
          >
            <SlTag />
            <NavLink to="/dashboard/admin/subscriptions" className="block py-2">
              Subscriptions
            </NavLink>
          </div>

          {/* ----learner---------learner-----------------learner-------------learner---------learner------------------------------------------------- */}

          {/* <div
            className={`${
              role == "learner" ? "flex" : "hidden"
            } justify-start items-center gap-3 py-1 pl-5 hover:border-b hover:border-white hover:bg-gray-100 hover:rounded-md border-b`}
          >
            <SlHome />
            <NavLink to="/dashboard/learner" className="block py-2">
              Home
            </NavLink>
          </div> */}

          <div
            className={`${
              role == "learner" ? "flex" : "hidden"
            } justify-start items-center gap-3 py-1 pl-5 hover:border-b hover:border-white hover:bg-gray-100 hover:rounded-md border-b`}
          >
            <SlUser />
            <NavLink to="/dashboard/learner/myprofile" className="block py-2">
              My Profile
            </NavLink>
          </div>

          <div
            className={`${
              role == "learner" ? "flex" : "hidden"
            } justify-start items-center gap-3 py-1 pl-5 hover:border-b hover:border-white hover:bg-gray-100 hover:rounded-md border-b`}
          >
            <SlDrawer />
            <NavLink to="/dashboard/learner/mycourses" className="block py-2">
              My Courses
            </NavLink>
          </div>

          <div
            className={`${
              role == "learner" ? "flex" : "hidden"
            } justify-start items-center gap-3 py-1 pl-5 hover:border-b hover:border-white hover:bg-gray-100 hover:rounded-md border-b`}
          >
            <SlTag />
            <NavLink
              to="/dashboard/learner/mysubscriptions"
              className="block py-2"
            >
              Subscription
            </NavLink>
          </div>
        </div>

        <div>
          <div className="justify-start items-center gap-3 py-2 pl-5   bg-gray-100 rounded-md cursor-pointer">
            <div className="flex items-center gap-2" onClick={handleLogout}>
              <IoExitOutline size={20} />
              <p>Logout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
