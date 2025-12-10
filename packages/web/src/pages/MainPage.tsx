import { useAuthStore } from '../stores/authStore';
import Header from '../components/header/Header';

import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const { session } = useAuthStore();
  const navigate = useNavigate();

  const handleGameClick = (gameName: string) => {
    navigate(`/game/${gameName}`);
  };

  return (
    <div>
      <Header isSignedIn={!!session} />

      <div className="flex items-center justify-center mt-[87px] flex-col gap-[16px] px-[20px]">
        <div className="flex gap-[16px]">
          <button
            className="flex-1 hover:cursor-pointer overflow-hidden rounded-[16px]"
            onClick={() => handleGameClick('bini-puzzle')}
          >
            <img
              src="/thebinipuzzlegame.png"
              alt="thebinipuzzlegame"
              className="w-full h-auto hover:scale-110 transition-all duration-300"
            />
          </button>
          <button
            className="flex-1 hover:cursor-pointer overflow-hidden rounded-[16px]"
            onClick={() => handleGameClick('flappy-plane')}
          >
            <img
              src="/flappyplane.png"
              alt="flappyplane"
              className="w-full h-auto hover:scale-110 transition-all duration-300"
            />
          </button>
        </div>
        <div className="flex gap-[16px]">
          <button
            className="flex-1 hover:cursor-pointer overflow-hidden rounded-[16px]"
            onClick={() => handleGameClick('typo-trap')}
          >
            <img
              src="/typotrap.png"
              alt="typotrap"
              className="w-full h-auto hover:scale-110 transition-all duration-300"
            />
          </button>
          <div className="flex-1 overflow-hidden rounded-[16px] border-[#4A5256] border-[1px]">
            <img src="/commingsoon.png" alt="commingsoon" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
