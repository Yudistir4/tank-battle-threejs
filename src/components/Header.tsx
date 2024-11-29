import { Leaderboard } from './Leaderboard';
import HowToPlay from './HowToPlay';
import CountdownTimer from './CountDown';
import ExpandButton from './ExpandButton';

const Header = () => {
  return (
    <div className="fixed flex justify-between top-4 w-full px-4  z-10">
      <Leaderboard />
      <div className="flex gap-4 justify-center items-center">
        <ExpandButton />
        <HowToPlay />
        <CountdownTimer />
      </div>
    </div>
  );
};

export default Header;
