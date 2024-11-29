import { usePlayersList } from 'playroomkit';
import { FaSkull } from 'react-icons/fa';
import { GiTank } from 'react-icons/gi';

export const Leaderboard = () => {
  const players = usePlayersList(true);

  return (
    <>
      <div className="  flex gap-4    overflow-x-auto no-scrollbar">
        {players.map((player) => (
          <div
            key={player.id}
            className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 shadow-md flex items-center rounded-xl gap-4 p-4   hover:scale-105 transition-transform duration-300"
          >
            {/* Tank Image */}
            <img
              src={player.getProfile().photo || ''}
              alt="Tank"
              className="w-12 h-12 rounded-full shadow-md border-2 border-gray-500"
            />

            {/* Player Details */}
            <div className="flex-grow text-white">
              {/* Player Name */}
              <h2 className="font-extrabold text-lg truncate">
                {player.getProfile().name}
              </h2>

              {/* Player Stats */}
              <div className="flex items-center gap-4 text-sm font-medium">
                {/* Kills */}
                <div className="flex items-center gap-1">
                  <GiTank className="text-green-400" size={20} />
                  <span>{player.getState('kills')}</span>
                </div>
                {/* Deaths */}
                <div className="flex items-center gap-1">
                  <FaSkull className="text-red-400" size={18} />
                  <span>{player.getState('deaths')}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
