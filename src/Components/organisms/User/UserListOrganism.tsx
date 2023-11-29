//@ts-nocheck
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import customAxios from "../../../Utils/customAxios";
import Button from "../../atoms/Button";
import ListCard from "../../molecules/User/UserListItem";
import Forminput from "../../atoms/Forminput";
interface User {
  _id: string;
  name: string;
  email: string;
  address: string;
  imageUrl: string;
  city: string;
  country: string;
  number: number;
  gender: string;
}

interface EmailStatus {
  id: string;
  status: boolean;
}

interface UserData {
  _id: string;
  email: EmailStatus;
  role: string;
  user: User;
  country: string;
  attempt: number;
  locked: boolean;
  unloackTime: string;
  resetPasswordToken: string | null;
  resetPasswordExpires: string | null; // You may want to use a Date type here as well
  resetPasswordStatus: boolean;
}
const UserListOrganism: React.FC = () => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [loadder, setLoadder] = useState(false);
  const [userData, setUserData] = useState<UserData | {}>("");
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onChange",
  });

  const handleEditSer = (
    id: string,
    name: string,
    address: string,
    role: string,
    banned: boolean,
    locked: boolean
  ) => {
    setValue("role", role);
    setValue("name", name);
    setValue("address", address);
    setValue("banned", banned);
    setValue("locked", locked);
    setUserData({ id, name, address, role, banned, locked });
  };

  const onSubmit: SubmitHandler<Record<string, any>> = async (data) => {
    setLoading(true);
    customAxios
      .patch(`/user/update/${userData.id}`, data)
      .then(() => {
        setUpdated(!updated);
        setLoading(false);
        toast.success("User updated successfully");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.data);
      });
  };

  useEffect(() => {
    if (userData==="") {
      setLoadder(true);
    }
    customAxios
      .get("/auth/all")
      .then((res) => {
        setUsers(res.data.data);
        setLoadder(false);
      })
      .catch((err) => console.log(err));
  }, [updated]);

  return (
    <>
      {loadder ? (
         <div>
         <div className="flex justify-center items-center text-2xl h-[80vh]">
           <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
         </div>
       </div>
      ) : (
        <div className="flex justify-between gap-5 w-full">
          <div className="mt-5 w-3/5 overflow-y-scroll h-[79vh] scrollbar-hidden">
            <h1 className="text-2xl font-semibold ml-3 mb-2">Users</h1>
            <div className="user-list">
              {users?.map((user: any) => (
                <ListCard
                  key={user._id}
                  user_id={user.user._id}
                  name={user.user.name}
                  email={user.user.email}
                  address={user.user.address}
                  imageUrl={user.user.imageUrl}
                  role={user.role}
                  banned={user.banned}
                  locked={user.locked}
                  handleEditSer={handleEditSer}
                />
              ))}
            </div>
          </div>

          <div className="mt-14 w-2/5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Forminput
                label="Name"
                type="text"
                name="name"
                placeholder="Enter your name"
                control={control}
                errors={errors}
                rules={{
                  required: "Name is required",
                  maxLength: {
                    value: 20,
                    message: "Name should be less than 20 characters",
                  },
                }}
              />

              <Forminput
                label="Address"
                type="text"
                name="address"
                placeholder="Enter your address"
                control={control}
                errors={errors}
                rules={{
                  required: "Address is required",
                  maxLength: {
                    value: 20,
                    message: "Address should be less than 20 characters",
                  },
                }}
              />

              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="banned"
                >
                  Role
                </label>
                <Controller
                  name="role"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <select
                      className={`appearance-none border border-gray-200 rounded-xl w-full py-2.5 px-3 text-black leading-tight focus:outline-none "focus:border-primary "}`}
                      {...field}
                    >
                      <option value="admin">Admin</option>
                      <option value="learner">Learner</option>
                      <option value="instructor">Instructor</option>
                    </select>
                  )}
                />
                <span className="text-red-500">*</span>
              </div>

              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="banned"
                >
                  Banned status
                </label>
                <Controller
                  name="banned"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <select
                      className={`appearance-none border border-gray-200 rounded-xl w-full py-2.5 px-3 text-black leading-tight focus:outline-none "focus:border-primary "}`}
                      {...field}
                    >
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  )}
                />
                <span className="text-red-500">*</span>
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="locked"
                >
                  Lock status
                </label>
                <Controller
                  name="locked"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <select
                      className={`appearance-none border border-gray-200 rounded-xl w-full py-2.5 px-3 text-black leading-tight focus:outline-none "focus:border-primary "}`}
                      {...field}
                    >
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  )}
                />
                <span className="text-red-500">*</span>
              </div>

              {loading ? (
                <Button
                  className="md:w-[100px] py-0.5 float-right"
                  text="Loading"
                  hover
                  disabled={true}
                />
              ) : (
                <Button
                  className="md:w-[100px] py-0.5 float-right"
                  text="Save"
                  hover
                  disabled={false}
                />
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UserListOrganism;
