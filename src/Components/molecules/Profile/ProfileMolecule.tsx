// ProfilePage.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaVenusMars,
  FaMapMarkerAlt,
  FaCity,
  FaGlobe,
  FaPhone,
} from "react-icons/fa";
import { SlNote } from "react-icons/sl";
import { useSelector } from "react-redux";

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

interface ProfilePageProps {
  profileData: ProfileData;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ profileData }) => {
    const navigate = useNavigate();
    const role = useSelector((state: any) => state.user.role);
  return (
    <div className="w-full mx-auto mt-5  shadow-md rounded-xl overflow-hidden border">
      <div className="bg-white text-gray-700 rounded-xl p-4 border-b">
        <div className="flex items-center justify-center mb-4">
          <img
            src={import.meta.env.VITE_BUCKET_BASE+profileData.imageUrl}
            alt={profileData.name}
            className="w-44 h-44 rounded-full border-4 border-gray-300 mt-5"
          />
        </div>
        <div className="flex justify-between items-center">
          <div >
            <h1 className="text-3xl font-semibold">{profileData.name}</h1>
            <p>{profileData.email}</p>
          </div>
          <div className="cursor-pointer" onClick={
            ()=>{
                navigate(`/dashboard/${role}/myprofile/edit`)
            }
          }>
            <SlNote className="text-primary text-xl" />
          </div>
        </div>
      </div>
      <div className="p-4 flex justify-between items-start gap-5 w-full">
        <div className="w-1/2">
          <div className="flex items-center mb-4">
            <div className="mr-4">
              <FaMapMarkerAlt className="text-primary text-lg" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-1">Address</h2>
              <p>{profileData.address}</p>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <div className="mr-4">
              <FaVenusMars className="text-primary text-lg" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-1">Gender</h2>
              <p>{profileData.gender || "Not specified"}</p>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <div className="mr-4">
              <FaCity className="text-primary text-lg" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-1">City</h2>
              <p>{profileData.city || "Not specified"}</p>
            </div>
          </div>
        </div>

        <div className="w-1/2">
          <div className="flex items-center mb-4">
            <div className="mr-4">
              <FaGlobe className="text-primary text-lg" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-1">Country</h2>
              <p>{profileData.country || "Not specified"}</p>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <div className="mr-4">
              <FaPhone className="text-primary text-lg" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-1">Number</h2>
              <p>
                {profileData.number
                  ? `+${profileData.number}`
                  : "Not specified"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
