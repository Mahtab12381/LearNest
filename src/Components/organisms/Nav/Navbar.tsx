import { useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "../../atoms/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NavLogged from "./NavLogged";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const role = useSelector((state: any) => state.user.role);
  const navigate = useNavigate();

  const handleToggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
    <div className={`bg-gray-100 p-4 fixed w-full z-50 ${role=="learner"||role=="instructor"||role=="admin"?"hidden":"block"}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black font-bold text-3xl">
          <span className="text-sec_pink">Lear</span>
          <span>Nest</span>
        </div>
        {/* Navigation Links (Desktop) */}
        <div className="hidden lg:flex lg:items-center">
          <NavLink
            to="/"
            className="text-black mr-4 lg:hover:text-sec_pink transition"
          >
            Home
          </NavLink>
          <NavLink
            to="/courses"
            className="text-black mr-4 lg:hover:text-sec_pink transition flex items-center"
          >
            Courses
          </NavLink>

          <NavLink
            to="/about"
            className="text-black mr-4 lg:hover:text-sec_pink transition"
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="text-black mr-4 lg:hover:text-sec_pink transition"
          >
            Contact
          </NavLink>

          <Button
            text="Sign In"
            outline
            className="lg:w-24 lg:mr-2 lg:py-1"
            hover
            onClick={() => {
              navigate("/signin");
            }}
          />
          <Button
            text="Sign Up"
            className="lg:w-24 lg:py-[0.3rem]"
            hover
            onClick={() => {
              navigate("/signup");
            }}
          />
        </div>
        {/* Mobile Toggle Button */}
        <button
          onClick={handleToggleNav}
          className="lg:hidden text-black focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      {/* Navigation Links (Mobile) */}
      <div
        className={`lg:hidden w-2/5 fixed z-50 top-0 right-0 h-screen bg-white p-4 transform transition-transform ease-in-out duration-300 ${
          isNavOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Toggle Button */}
        <div className="flex justify-end">
          <button
            onClick={handleToggleNav}
            className="lg:hidden text-black focus:outline-none"
          >
            <svg
              className={`h-6 w-6 ${isNavOpen ? "block" : "hidden"}`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="flex flex-col justify-between h-[92vh]">
          <div className="ml-5 border-t pt-2 mt-3">
            <NavLink
              to="/"
              className="text-black block mb-4 lg:mb-0 lg:ml-4 lg:mr-0 lg:hover:text-sec_pink transition"
            >
              Home
            </NavLink>

            <NavLink
              to="/courses"
              className="text-black mb-4 lg:mb-0 lg:ml-4 lg:mr-0 lg:hover:text-sec_pink transition flex justify-between items-center"
            >
              Courses{" "}
              <span className="ml-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </NavLink>

            <NavLink
              to="/about"
              className="text-black block mb-4 lg:mb-0 lg:ml-4 lg:mr-0 lg:hover:text-sec_pink transition"
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              className="text-black block lg:ml-4 lg:mr-0 lg:hover:text-sec_pink transition"
            >
              Contact
            </NavLink>
          </div>
          <div>
            <Button
              text="Sign In"
              outline
              className="my-4 py-1"
              onClick={() => {
                navigate("/signin");
              }}
            />
            <Button
              text="Sign Up"
              className="py-[0.5rem]"
              onClick={() => {
                navigate("/signup");
              }}
            />
          </div>
        </div>
      </div>
    </div>
    <div className={`${role=="learner"||role=="instructor"||role=="admin"?"block":"hidden"}`}>
      <NavLogged/>
    </div>
    </>
    
  );
};

export default Navbar;
