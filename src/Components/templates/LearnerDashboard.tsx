import { Outlet } from "react-router-dom";
import SidebarMolecules from "../molecules/Others/SidebarMolecules";
import { useEffect } from "react";
import "../../App.css";

const LearnerDashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="mt-[68px] md:container md:mx-auto md:flex gap-5">
      <SidebarMolecules />
      <div className="h-[79vh] overflow-y-scroll scrollbar-hidden w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default LearnerDashboard;
