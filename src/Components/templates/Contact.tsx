import Breadcrumbs from "../atoms/Breadcrumbs";
import RatingStatsMolecule from "../molecules/Rating/RatingStatsMolecule";
import RatingMolecule from "../molecules/Rating/RatingMolecule";
import ReviewItem from "../molecules/Rating/ReviewItem";
import AssignmentCard from "../molecules/Assignment/AssignmentCard";
import Recorder from "../molecules/Others/Recorder";
import ProfileEdit from "../organisms/Profile/ProfileEdit";

interface Assignment {
  _id: string;
  name: string;
  description: string;
  mark: number;
  course: string;
  created_by: string;
  isDeleted: string;
  submissions: any[]; // You may need to replace 'any' with the actual type of submissions
  createdAt: string;
  updatedAt: string;
}


const Contact = () => {
  const assignmentData: Assignment = {
    _id: "65490812a81ad5beee528f52",
    name: "Module 2 Assignment",
    description: "This is a very hard assignment huga faita jaibo",
    mark: 100,
    course: "Python Mega Course: Learn Python in 60 Days, Build 20 Apps",
    created_by: "65484ebe5c7deab193b65ab2",
    isDeleted: "false",
    submissions: [],
    createdAt: "2023-11-06T15:36:50.104Z",
    updatedAt: "2023-11-06T15:36:50.104Z",
  };
  return (
    <>
      <div className=" h-[150px] bg-gray-100 flex justify-center items-center mt-[68px]">
        <div className="text-center">
          <p className="text-3xl mb-2">Contact</p>
          <Breadcrumbs steps={["Contact"]} />
        </div>
      </div>

      <div>


      </div>
    </>
  );
};

export default Contact;
