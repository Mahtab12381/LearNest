//@ts-nocheck

import React from "react";
import { useForm, SubmitHandler, set } from "react-hook-form";
import customAxios from "../../../Utils/customAxios";
import Button from "../../atoms/Button";
import { SlNote } from "react-icons/sl";
import { input } from "@material-tailwind/react";
import { useRef } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Loadder from "../../atoms/Loadder";
import { useDispatch } from "react-redux";
import { execProfileImageReload } from "../../../Store/Slices/reloadSlice";


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

const ProfileEditPage: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [imgUrl, setImgUrl] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);
  const [fileUrl, setFileUrl] = React.useState("");
  const [fileLoading, setFileLoading] = React.useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<any> = (data) => {
    let bodyData;
    setLoading(true);
    if(!fileUrl){
       bodyData ={
        ...data,
        imageUrl: imgUrl,
      }
    }
    else{
       bodyData ={
        ...data,
        imageUrl: fileUrl,
      }
    }
    customAxios.post("/user/update-profile", bodyData).then((res) => {
      toast.success(res.data.message);
      dispatch(execProfileImageReload());
      setLoading(false);
    }).catch((err) => {
      toast.error(err.response.data.message);
      setLoading(false);
    });
  };

  const fileInputRef = useRef(null);

  const openFileInput = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = () => {
    const selectedFile = fileInputRef.current.files[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };
console.log(file);
  React.useEffect(() => {
    customAxios
      .get("/user/my-profile")
      .then((res) => {
        const profileData: ProfileData = res.data.data;
        setValue("name", profileData.name);
        setValue("address", profileData.address);
        setValue("gender", profileData.gender);
        setValue("city", profileData.city);
        setValue("country", profileData.country);
        setValue("number", profileData.number || "");
        setImgUrl(profileData.imageUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setValue]);

  useEffect(() => {
    if(file){
      setFileLoading(true);
      const formData = new FormData();
      formData.append("file_to_upload", file);
      customAxios.post("/files/upload/images", formData).then((res) => {
        setFileLoading(false);
        setFileUrl(res.data.data.url);
      }).catch((err) => {
        toast.error(err.response.data.message);
        setFileLoading(false);
      });
    }
     },[file]);

  return (
    <div className="overflow-y-scroll scrollbar-hidden mt-5">
      <h1 className="text-2xl font-semibold ml-3 mb-2">Edit Profile</h1>
      <div className="border pl-7 rounded-xl shadow bg-white">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <img
              src={!fileUrl?import.meta.env.VITE_BUCKET_BASE + imgUrl:import.meta.env.VITE_BUCKET_BASE+fileUrl}
              alt="Profile"
              className={`w-44 h-44 rounded-full border-4 border-gray-300 mt-5 ${
                fileLoading && "opacity-30"
              }`
            }
            />
            <div
              className="absolute right-4 bottom-4 text-sec_pink cursor-pointer z-50"
              onClick={openFileInput}
            >
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileSelect}
              />
              {!fileLoading&&<SlNote size={25} />}
            </div>
            {
              fileLoading && <>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-8 -translate-y-3">
                <Loadder/>
              </div>
              </>

            }
            
         
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 mt-5 md:grid-cols-2 gap-4"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", {
              required: "Name is required",
              maxLength: {
                value: 50,
                message: "Name must be at most 50 characters",
              },
            })}
            className={`appearance-none border border-gray-200 rounded-xl w-full py-2.5 px-3 text-black leading-tight focus:outline-none ${
              errors.name?.message ? "border-red-500" : "focus:border-primary "
            }`}
          />
          <span className="text-red-500 text-sm">*{errors.name?.message}</span>
        </div>
        <div>
          <label
            htmlFor="address"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            {...register("address", {
              required: "Address is required",
              maxLength: {
                value: 100,
                message: "Address must be at most 100 characters",
              },
            })}
            className={`appearance-none border border-gray-200 rounded-xl w-full py-2.5 px-3 text-black leading-tight focus:outline-none ${
              errors.address?.message
                ? "border-red-500"
                : "focus:border-primary "
            }`}
          />
          <span className="text-red-500 text-sm">
            *{errors.address?.message}
          </span>
        </div>
        <div>
          <label
            htmlFor="gender"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Gender
          </label>
          <select
            id="gender"
            {...register("gender", { required: "Please select your gender" })}
            className={`appearance-none border border-gray-200 rounded-xl w-full py-2.5 px-3 text-black leading-tight focus:outline-none ${
              errors.gender?.message
                ? "border-red-500"
                : "focus:border-primary "
            }`}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <span className="text-red-500 text-sm">
            *{errors.gender?.message}
          </span>
        </div>
        <div>
          <label
            htmlFor="city"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            {...register("city", {
              required: "City is required",
              maxLength: {
                value: 50,
                message: "City must be at most 50 characters",
              },
            })}
            className={`appearance-none border border-gray-200 rounded-xl w-full py-2.5 px-3 text-black leading-tight focus:outline-none ${
              errors.city?.message ? "border-red-500" : "focus:border-primary "
            }`}
          />
          <span className="text-red-500 text-sm">*{errors.city?.message}</span>
        </div>
        <div>
          <label
            htmlFor="country"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Country
          </label>
          <input
            type="text"
            id="country"
            {...register("country", {
              required: "Country is required",
              maxLength: {
                value: 50,
                message: "Country must be at most 50 characters",
              },
            })}
            className={`appearance-none border border-gray-200 rounded-xl w-full py-2.5 px-3 text-black leading-tight focus:outline-none ${
              errors.country?.message
                ? "border-red-500"
                : "focus:border-primary "
            }`}
          />
          <span className="text-red-500 text-sm">
            *{errors.country?.message}
          </span>
        </div>
        <div>
          <label
            htmlFor="number"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Number
          </label>
          <input
            type="text"
            id="number"
            {...register("number", {
              required: "Number is required",
              maxLength: {
                value: 15,
                message: "Number must be at most 15 characters",
              },
            })}
            className={`appearance-none border border-gray-200 rounded-xl w-full py-2.5 px-3 text-black leading-tight focus:outline-none ${
              errors.number?.message
                ? "border-red-500"
                : "focus:border-primary "
            }`}
          />
          <span className="text-red-500 text-sm">
            *{errors.number?.message}
          </span>
        </div>
        {loading ? (
          <Button
            className="md:w-[100px] py-0.5 "
            text="Loading"
            hover
            disabled={true}
          />
        ) : (
          <Button
            className="md:w-[100px] py-0.5 "
            text="Save"
            hover
            disabled={false}
          />
        )}
      </form>
    </div>
  );
};

export default ProfileEditPage;
