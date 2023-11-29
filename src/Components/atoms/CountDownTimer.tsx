import React, { useState, useEffect } from "react";
import { GiStopwatch } from "react-icons/gi";

interface CountdownTimerProps {
  totalTime: number;
  startTimer?: boolean;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ totalTime,startTimer }) => {
  const [timeRemaining, setTimeRemaining] = useState(totalTime);

  useEffect(() => {
    if (timeRemaining > 0 && startTimer ) {
      const intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [timeRemaining,startTimer]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };
  return (
    <div className={`flex flex-col justify-center items-center text-5xl mt-10 ${timeRemaining<10 ? "text-red-700 animate-pulse duration-75":""}`}>
      <GiStopwatch size={40} />
      <p className="pl-2">
        {formatTime(timeRemaining)}
      </p>
    </div>
  );
};

export default CountdownTimer;
