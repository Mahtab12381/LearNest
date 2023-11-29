//@ts-nocheck
import React from "react";
import { useRecordWebcam } from "react-record-webcam";
import { useState } from "react";
import customAxios from "../../../Utils/customAxios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { BiCamera } from "react-icons/bi";

export default function Recorder({setFileUrlContent}) {
  const {
    activeRecordings,
    getRecording,
    cancelRecording,
    clearPreview,
    closeCamera,
    createRecording,
    devicesByType,
    devicesById,
    download,
    muteRecording,
    openCamera,
    pauseRecording,
    resumeRecording,
    startRecording,
    stopRecording,
  } = useRecordWebcam();

  const [videoDeviceId, setVideoDeviceId] = React.useState<string>("");
  const [audioDeviceId, setAudioDeviceId] = React.useState<string>("");
  const [recordedFiles, setRecordedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [stoped, setStoped] = useState(false);

  const handleSelect = async (event: any) => {
    const { deviceid: deviceId } =
      event.target.options[event.target.selectedIndex].dataset;
    if (devicesById[deviceId].type === "videoinput") {
      setVideoDeviceId(deviceId);
    }
    if (devicesById[deviceId].type === "audioinput") {
      setAudioDeviceId(deviceId);
    }
  };

  const start = async () => {
    const recording = await createRecording(videoDeviceId, audioDeviceId);
    if (recording) await openCamera(recording.id);
  };

  const stop = async () => {
    if (activeRecordings.length > 0) {
      const recording = activeRecordings[0];
      const chunks = [];
      const mimeType = recording.mimeType;
      recording.recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      recording.recorder.onstop = () => {
        const blob = new Blob(chunks, { type: mimeType });
        const file = new File(
          [blob],
          `${recording.fileName}.${recording.fileType}`,
          {
            type: mimeType,
          }
        );
        setRecordedFiles([file]);
        setStoped(prev=>!prev);
        cancelRecording(recording.id);
      };
      recording.recorder.stop();
    }
  };

  useEffect(() => {
    if (recordedFiles.length > 0) {
      setFileLoading(true);
      const formData = new FormData();
      formData.append("file_to_upload", recordedFiles[0]);
      customAxios
        .post("/files/upload/videos", formData)
        .then((res) => {
          setFileLoading(false);
          setFileUrl(res.data.data.url);
          setFileUrlContent(res.data.data.url);
          setRecordedFiles([]);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setFileLoading(false);
        });
    }
  }, [stoped]);

  return (
    <div className="w-full mb-5">
      <div className="flex justify-between mb-4">
        <div className="w-1/2 pr-3">
          <h4 className="text-md font-semibold mb-2">Select video input</h4>
          <select className="w-full p-2.5 border  outline-none rounded-xl bg-white" onChange={handleSelect}>
            {devicesByType?.video?.map((device) => (
              <option key={device.deviceId} data-deviceid={device.deviceId}>
                {device.label}
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/2 pl-3">
          <h4 className="text-md font-semibold mb-2">Select audio input</h4>
          <select className="w-full outline-none p-2.5 border rounded-xl bg-white" onChange={handleSelect}>
            {devicesByType?.audio?.map((device) => (
              <option key={device.deviceId} data-deviceid={device.deviceId}>
                {device.label}
              </option>
            ))}
          </select>
        </div>
        <div
          className=" text-black cursor-pointer ml-3 mt-8 flex justify-center items-center"
          onClick={start}
        >
          <BiCamera size={30}/>
        </div>
      </div>

      <div>
        {activeRecordings?.map((recording: Recording) => (
          <div className="p-4 border rounded shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white" key={recording.id}>
            <p className="text-green-500 font-semibold">Live</p>
            <div className="flex flex-col items-start">
              <small>Status: {recording.status}</small>
            </div>
            <video
              className="mt-4 w-full  h-72 object-cover rounded"
              ref={recording.webcamRef}
              loop
              autoPlay
              muted
              playsInline
            />
            <div className="flex justify-between mt-2">
              <div
                className="cursor-pointer"
                disabled={
                  recording.status === "RECORDING" ||
                  recording.status === "PAUSED"
                }
                onClick={() => startRecording(recording.id)}
              >
                Record
              </div>
              <div
                className="cursor-pointer"
                disabled={
                  recording.status !== "RECORDING" &&
                  recording.status !== "PAUSED"
                }
                onClick={() =>
                  recording.status === "PAUSED"
                    ? resumeRecording(recording.id)
                    : pauseRecording(recording.id)
                }
              >
                {recording.status === "PAUSED" ? "Resume" : "Pause"}
              </div>
              <div
                className={`cursor-pointer ${
                  recording.isMuted ? "bg-gray-300" : ""
                }`}
                onClick={() => muteRecording(recording.id)}
              >
                Mute
              </div>
              <div
                className="cursor-pointer"
                disabled={recording.status !== "RECORDING"}
                onClick={stop}
              >
                Stop
              </div>
              <div
                className="cursor-pointer"
                onClick={() => cancelRecording(recording.id)}
              >
                Cancel
              </div>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}
