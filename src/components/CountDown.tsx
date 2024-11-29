import Countdown, { CountdownRenderProps } from 'react-countdown';
import { getState, setState } from 'playroomkit';
import { useEffect, useState } from 'react';
import { FaClock } from 'react-icons/fa'; // Ikon clock yang lebih sesuai dengan tema

const CountdownTimer = () => {
  const [status, setStatus] = useState('waiting');
  const [endAt, setEndAt] = useState(0);

  const onComplete = () => {
    setState('status', 'finish');
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const status = getState('status');
      if (status === 'playing') {
        setStatus(status);
        const endAt = getState('endAt');
        setEndAt(endAt);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const renderer = ({ minutes, seconds }: CountdownRenderProps) => {
    return (
      <div className="flex justify-center items-center text-center">
        <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 px-6 py-3 w-[200px] rounded-xl shadow-md transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-center space-x-2">
            <FaClock className="text-white" size={30} />
            <p className="text-white text-3xl font-extrabold tracking-widest">
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="">
      {status === 'playing' && (
        <Countdown date={endAt} renderer={renderer} onComplete={onComplete} />
      )}
    </div>
  );
};

export default CountdownTimer;
