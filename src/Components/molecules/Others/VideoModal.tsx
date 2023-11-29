import React from "react";
import ReactPlayer from "react-player";
import { RxCross1 } from "react-icons/rx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

const VideoModal: React.FC<ModalProps> = ({ isOpen, onClose, videoUrl }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-50 bg-opacity-5 z-50">
      <div className="bg-primary p-0.5 rounded relative">
        <ReactPlayer url={videoUrl} controls className="w-full h-full" />
        <div
          onClick={onClose}
          className="absolute top-2 right-4 text-white cursor-pointer z-50"
        >
          <RxCross1 size={25} />
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
