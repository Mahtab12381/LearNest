import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";

interface SupportItemProps {
  userName: string;
  avatarUrl: string;
  message: string;
  supportDate: string;
  userEmail: string;
}
const SupportMessageMolecule: React.FC<SupportItemProps> = ({
  userName,
  avatarUrl,
  message,
  supportDate,
  userEmail,
}) => {
  const email = useSelector((state: any) => state.user.email);
  return (
    <>
      {userEmail === email ? (
        <>
          <div className="flex items-start justify-center gap-1 py-3">
            <div className="w-4/5 lg:w-full">
              <p className="text-gray-900 font-semibold text-md text-right">
                {userName}
              </p>
              <p className="text-gray-600 text-[12px] text-right mr-3">
                {supportDate}
              </p>
              <p className="text-gray-600 text-sm mt-1 text-right">{message}</p>
            </div>

            <div className="w-1/5 flex justify-center">
              <img
                className="h-16 w-16 rounded-full"
                src={avatarUrl}
                alt={`${userName}'s`}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-start justify-center gap-1 py-3">
            <div className="w-1/5 flex justify-center">
              <img
                className="h-16 w-16 rounded-full"
                src={avatarUrl}
                alt={`${userName}'s`}
              />
            </div>
            <div className="w-4/5 lg:w-full">
              <p className="text-gray-900 font-semibold text-md">{userName}</p>
              <p className="text-gray-600 text-[12px] text-sm ml-3">
                {supportDate}
              </p>

              <p className="text-gray-600 text-sm mt-1">{message}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SupportMessageMolecule;
