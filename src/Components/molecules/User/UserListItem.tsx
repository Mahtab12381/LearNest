import React from "react";
import { PiMapPinLineFill } from "react-icons/pi";
import { RiUserSettingsFill } from "react-icons/ri";
import { LuBan } from "react-icons/lu";
import { BsLockFill } from "react-icons/bs";
import { SlNote } from "react-icons/sl";
interface UserComponentProps {
  user_id: string;
  name: string;
  email: string;
  address: string;
  imageUrl: string;
  role: string;
  banned: boolean;
  locked: boolean;
  handleEditSer: (
    id: string,
    name: string,
    address: string,
    role: string,
    banned: boolean,
    locked: boolean
  ) => void;
}

const UserListItem: React.FC<UserComponentProps> = ({
  user_id,
  name,
  email,
  address,
  imageUrl,
  role,
  banned,
  locked,
  handleEditSer,
}) => {
  return (
    <div className="border-b shadow p-5 w-full relative">
      <div className="flex items-center gap-5 ">
        <div>
          <img
            className="w-20 h-20 rounded-full object-cover"
            src={import.meta.env.VITE_BUCKET_BASE + imageUrl}
            alt="user"
          />
        </div>
        <div>
          <p className="text-lg font-semibold">{name}</p>
          <p>{email}</p>
        </div>
      </div>
      <div>
     
          <div className="flex items-center gap-5 justify-between w-full mt-3">
            <div className="flex items-center gap-2">
              <PiMapPinLineFill /> {address}
            </div>
            <div className="flex items-center gap-2 ">
              <RiUserSettingsFill />
              {role}
            </div>
            <div className="flex items-center gap-2 ">
              <BsLockFill />
              {banned ? "Yes" : "No"}
            </div>
            <div className="flex items-center gap-2 ">
              <LuBan /> {locked ? "Yes" : "No"}
            </div>
          </div>
      
      </div>
      <div>
        <button
          onClick={() => {
            handleEditSer(user_id, name, address, role, banned, locked);
          }}
          className="absolute right-5 top-5 text-gray-700 px-3 "
        >
         <SlNote size={20} />
        </button>
      </div>
    </div>
  );
};

export default UserListItem;
