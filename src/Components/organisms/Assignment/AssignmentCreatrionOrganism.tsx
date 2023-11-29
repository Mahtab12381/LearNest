import React from "react";
import AssignmentCreationForm from "../../molecules/Assignment/AssignmentCreationForm";

type Props = {};

const AssignmentCreatrionOrganism = (props: Props) => {
  return (
    <>
      <div>
        <div>
            <h1 className="text-2xl font-semibold ml-3 mt-5">Create Assignment</h1>
        </div>
        <div className="mt-5">
          <AssignmentCreationForm />
        </div>
      </div>
    </>
  );
};

export default AssignmentCreatrionOrganism;
