import { useState, useEffect } from 'react';
import { FaInfoCircle } from 'react-icons/fa'; // Importing the info icon

const HowToPlay = () => {
  const [showInfo, setShowInfo] = useState(false);

  // Function to show the info when the info button is clicked
  const handleShowInfo = () => {
    setShowInfo(true);
  };

  // Function to hide the info after clicking "Ok"
  const handleHideInfo = () => {
    setShowInfo(false);
    // Set the last viewed time to now in localStorage
    localStorage.setItem('lastInfoShown', Date.now().toString());
  };

  // Check if 24 hours have passed since the last modal shown
  useEffect(() => {
    const lastInfoShown = localStorage.getItem('lastInfoShown');
    const currentTime = Date.now();

    if (
      !lastInfoShown ||
      currentTime - parseInt(lastInfoShown) >= 24 * 60 * 60 * 1000
    ) {
      setShowInfo(true); // Show the modal if it's the first time or 24 hours have passed
    }
  }, []);

  return (
    <>
      {/* Info Button */}
      <button
        onClick={handleShowInfo}
        className="shrink h-14 w-14   bg-blue-500  flex items-center justify-center rounded-full text-white shadow-lg hover:bg-blue-600 transition-all z-10"
        aria-label="Show Game Instructions"
      >
        <FaInfoCircle size={30} />
      </button>

      {/* Game Info Section */}
      {showInfo && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-70 z-50 p-6">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 rounded-2xl shadow-xl text-white max-w-lg w-full">
            <h2 className="text-4xl font-bold text-center mb-6">
              How to Play the Game
            </h2>

            {/* Keyboard Controls */}
            <div className="mb-6">
              <div className="flex items-start gap-6">
                <div className="text-lg text-white flex-grow">
                  <h3 className="font-semibold text-xl mb-2">
                    Keyboard Controls:
                  </h3>
                  <div className="space-y-3">
                    <div className="flex gap-6 items-center">
                      <div className="w-10 h-10 bg-gray-800 text-white font-bold text-lg flex items-center justify-center rounded-md shadow-md hover:bg-gray-600 transition-all">
                        W
                      </div>
                      <span>Move Forward</span>
                    </div>
                    <div className="flex gap-6 items-center">
                      <div className="w-10 h-10 bg-gray-800 text-white font-bold text-lg flex items-center justify-center rounded-md shadow-md hover:bg-gray-600 transition-all">
                        S
                      </div>
                      <span>Move Backward</span>
                    </div>
                    <div className="flex gap-6 items-center">
                      <div className="w-10 h-10 bg-gray-800 text-white font-bold text-lg flex items-center justify-center rounded-md shadow-md hover:bg-gray-600 transition-all">
                        A
                      </div>
                      <span>Move Left</span>
                    </div>
                    <div className="flex gap-6 items-center">
                      <div className="w-10 h-10 bg-gray-800 text-white font-bold text-lg flex items-center justify-center rounded-md shadow-md hover:bg-gray-600 transition-all">
                        D
                      </div>
                      <span>Move Right</span>
                    </div>
                    <div className="flex gap-6 items-center">
                      <div className="w-16 h-10 bg-gray-800 text-white font-bold text-lg flex items-center justify-center rounded-md shadow-md hover:bg-gray-600 transition-all">
                        Space
                      </div>
                      <span>Shoot</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="mb-6">
              <div className="flex items-start gap-6">
                <div className="text-lg text-white flex-grow">
                  <h3 className="font-semibold text-xl mb-2">
                    Mobile Controls:
                  </h3>
                  <p>
                    If you're playing the game on a mobile device, you can use
                    the virtual joystick available on the screen to move the
                    character and shoot.
                  </p>
                </div>
              </div>
            </div>

            {/* Ok Button */}
            <div className="text-center mt-6">
              <button
                onClick={handleHideInfo}
                className="bg-gray-900 py-2 px-6 rounded-lg hover:bg-gray-900 text-white transition-all"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HowToPlay;
