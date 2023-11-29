import React from "react";
import ProfileMolecule from "../../molecules/Profile/ProfileMolecule";
import customAxios from "../../../Utils/customAxios";

interface ProfileData {
    _id: string;
    name: string;
    email: string;
    address: string;
    imageUrl: string;
    gender: string;
    city: string;
    country: string;
    number: number | null;
  }

const ProfileOrganism: React.FC = () => {
 const [profileData, setProfileData] = React.useState<ProfileData>({} as ProfileData);
   const [loadingPage, setLoadingPage] = React.useState(true); 
 React.useEffect(() => {
    setLoadingPage(true);
    customAxios
      .get("/user/my-profile")
      .then((res) => {
        setLoadingPage(false);
        setProfileData(res.data.data);
      })
      .catch((err) => {
        setLoadingPage(false);
        console.log(err);
      });
    }, []);

  return(

    <>
     {loadingPage ? (
      <div>
        <div className="flex justify-center items-center text-2xl h-[80vh]">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </div>
    ) : (
      <ProfileMolecule profileData={profileData} />
    )}
    </>



  ) 
};

export default ProfileOrganism;
