import React, { useState } from "react";
import { Controller} from "react-hook-form";
import { BiShowAlt, BiHide } from "react-icons/bi";

interface PasswordInputProps {
  control: any;
  errors: any;
  confirmPass?: boolean;
  watch: any;
  rules?: any;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ control, errors, confirmPass, watch ,rules }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return !confirmPass ? (
    <div >
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password"> Password</label>
      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={rules}
        render={({ field }) => (
          <>
            <div className="relative">
              <input
                {...field}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className ={`appearance-none border border-gray-200 rounded-xl w-full py-2.5 px-3 text-black leading-tight focus:outline-none ${errors.password ? "border-red-500" : "focus:border-primary"}`} 
              />
              <div
                onClick={toggleShowPassword}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? <BiShowAlt /> : <BiHide />}
              </div>
            </div>
            <span className="text-red-500">*{errors.password?.message}</span>
          </>
        )}
      />
    </div>
  ) : (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cpassword">Confirm Password</label>
      <Controller
        name="cpassword"
        control={control}
        defaultValue=""
        rules={{
          required: "Confirm Password is required",
          maxLength: {
            value: 32,
            message: "Password should be less than 32 characters",
          },
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
            message: "Password must contain atleast one uppercase letter, one lowercase letter, one number and one special character",
          },
          validate: (value) =>
            value === watch("password") || "Passwords do not match",
        }}
        render={({ field }) => (
          <>
            <div className="relative">
              <input
                {...field}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className ={`appearance-none border border-gray-200 rounded-xl w-full py-2.5 px-3 text-black leading-tight focus:outline-none ${errors.password ? "border-red-500" : "focus:border-primary"}`} 
              />
              <div
                onClick={toggleShowConfirmPassword}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              >
                {showConfirmPassword ? <BiShowAlt /> : <BiHide />}
              </div>
            </div>
            <span className="text-red-500">*{errors.cpassword?.message}</span>
          </>
        )}
      />
    </div>
  );
};

export default PasswordInput;
