import { getState, setState, usePlayersList } from 'playroomkit';
import { useEffect, useState } from 'react';
import { FaSkull } from 'react-icons/fa';
import { GiTank } from 'react-icons/gi';
import { PiRankingFill } from 'react-icons/pi';
export const GameOver = () => {
  const [status, setStatus] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const status = getState('status');
      if (status === 'finish') {
        setStatus(status);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <>{status === 'finish' && <RenderGameOver />}</>;
};

const RenderGameOver = () => {
  const players = usePlayersList(true);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const audio = new Audio('/audios/game-over.mp3');
    audio.play();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Navigasi otomatis setelah countdown habis
    if (countdown <= 0) {
      console.log('setCountdown');
      setState('status', 'waiting');
      window.location.reload(); // Ganti dengan URL yang sesuai
    }

    return () => clearInterval(timer); // Membersihkan interval
  }, [countdown]);

  // Hitung K/D Ratio dan urutkan pemain
  const sortedPlayers = players
    .map((player) => ({
      id: player.id,
      name: player.getProfile().name,
      photo: player.getProfile().photo || '',
      kills: player.getState('kills'),
      deaths: player.getState('deaths'),
      color: player.getProfile().color.hexString,
      kdRatio:
        player.getState('deaths') === 0
          ? player.getState('kills')
          : player.getState('kills') / player.getState('deaths'),
    }))
    .sort((a, b) => {
      if (b.kdRatio === a.kdRatio) {
        return b.kills - a.kills; // Jika K/D Ratio sama, urutkan berdasarkan kill
      }
      return b.kdRatio - a.kdRatio; // Urutkan berdasarkan K/D Ratio
    });

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 z-50">
      {/* Overlay Blur */}
      <div className="absolute inset-0 backdrop-blur-md z-[-1]" />

      {/* Pesan Game Over */}
      <div className="text-center mb-6 animate-fadeIn">
        <h1 className="text-4xl font-extrabold text-white animate-pulse">
          Game Over
        </h1>
        <p className="text-lg text-white opacity-80 mt-2">
          Returning to the lobby in {countdown} seconds...
        </p>
      </div>

      {/* Leaderboard */}
      <div className="bg-white bg-opacity-10 flex flex-col gap-4 rounded-lg p-6 shadow-lg max-w-md w-full">
        {sortedPlayers.map((player, index) => (
          <div
            key={player.id}
            className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 shadow-md flex items-center rounded-xl gap-4 p-4   hover:scale-105 transition-transform duration-300"
          >
            {/* Tank Image */}
            <h1 className="text-2xl font-bold text-white mr-4">#{index + 1}</h1>
            <img
              src={player.photo || ''}
              alt="Tank"
              className="w-12 h-12 rounded-full shadow-md border-2 border-gray-500"
            />

            {/* Player Details */}
            <div className="flex-grow text-white">
              {/* Player Name */}
              <h2 className="font-extrabold text-lg truncate">{player.name}</h2>

              {/* Player Stats */}
              <div className="flex items-center gap-5 text-lg font-medium">
                {/* Kills */}
                <div className="flex items-center gap-2">
                  <GiTank className="text-green-400" size={28} />
                  <span>{player.kills}</span>
                </div>
                {/* Deaths */}
                <div className="flex items-center gap-2">
                  <FaSkull className="text-red-400" size={22} />
                  <span>{player.deaths}</span>
                </div>
                {/* KDA */}
                <div className="flex items-center gap-2">
                  <PiRankingFill className="text-blue-400" size={30} />
                  <span>{player.kdRatio}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tombol Kembali ke Lobby */}
      <button
        onClick={() => {
          setState('status', 'waiting');
          window.location.reload(); // Ganti dengan URL yang sesuai
        }}
        className="mt-6 px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
      >
        Back to Lobby Now
      </button>
    </div>
  );
};
