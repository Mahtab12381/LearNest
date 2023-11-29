import React from 'react';
import { useDropzone } from 'react-dropzone';
import { IoCloudUploadOutline } from 'react-icons/io5';
import Loadder from './Loadder';

type FileInputProps = {
  label: string;
  name: string;
  control: any;
  errors: any;
  rules: any;
  acceptedTypes: any;
  onChange?: any;
  defaultValue?: string;
  uploading?: boolean;
};

const FileInput: React.FC<FileInputProps> = ({uploading,defaultValue,onChange,label, name, control, errors, acceptedTypes,rules}) => {
  const [file, setFile] = React.useState(null);
    const { getRootProps, getInputProps } = useDropzone({
    accept: acceptedTypes,
    onDrop: (acceptedFiles:any) => {
      setFile(acceptedFiles[0].path);
      onChange(acceptedFiles[0]);
    },
  });

  return (
    <div>
      <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>

      <div
        {...getRootProps()}
        className={`border border-gray-200 rounded-xl py-2.5 px-3 text-black leading-tight focus:outline-none cursor-pointer ${
          errors[name] ? 'border-red-500' : 'focus:border-primary'
        }`}
      >
        <input {...getInputProps()} name={name} {...control} rules ={rules}/>
        <div className="flex flex-col items-center justify-center">
          {uploading?<Loadder/>:<IoCloudUploadOutline size={40} className="mb-2" />}
          <p className="text-xs">{file? file:defaultValue?defaultValue:"Browse Or drag and drop"}</p>
        </div>
      </div>
      <span className="text-red-500">*{errors[name]?.message}</span>
      <input
        type="file"
        {...getInputProps()} 
        style={{ display: 'none' }}
        />
    </div>
  );
};

export default FileInput;
