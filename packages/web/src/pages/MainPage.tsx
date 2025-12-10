import { useAuthStore } from '../stores/authStore';
import Header from '../components/header/Header';
import BiniPuzzleLogo from '@/assets/image/biniPuzzleLogo.svg';
import flappyPlaneLogo from '@/assets/image/flappyPlaneLogo.svg';
import typoTrapLogo from '@/assets/image/typoTrapLogo.svg';

import { useState } from 'react';
import Panel from '@/components/panel/Panel';
import type { GameId } from '@/config/games';

const MainPage = () => {
  const { session } = useAuthStore();

  const [selectedGame, setSelectedGame] = useState<GameId | null>(null);

  const handleGameSelect = (gameName: GameId) => {
    setSelectedGame(gameName);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header isSignedIn={!!session} />

      <div className="flex flex-1">
        <div className="flex-1" onClick={() => selectedGame && setSelectedGame(null)}>
          <div className="px-[40px] pt-[56px]">
            <h1 className="text-[30px] text-[#F1F4F6] font-medium px-[8px] mb-[48px]">Games</h1>

            <div className="flex flex-wrap gap-[24px]">
              <img
                src={BiniPuzzleLogo}
                alt="Bini Puzzle"
                onClick={(e) => {
                  e.stopPropagation();
                  handleGameSelect('bini-puzzle');
                }}
                className={`
                  cursor-pointer
                  ${selectedGame ? 'w-[189px] h-[189px]' : 'w-full max-w-[441px] h-auto'}
                  ${selectedGame && selectedGame !== 'bini-puzzle' ? 'opacity-50' : 'opacity-100'}
                `}
              />
              <img
                src={flappyPlaneLogo}
                alt="Flappy Plane"
                onClick={(e) => {
                  e.stopPropagation();
                  handleGameSelect('flappy-plane');
                }}
                className={`
                  cursor-pointer
                  ${selectedGame ? 'w-[189px] h-[189px]' : 'w-full max-w-[441px] h-auto'}
                  ${selectedGame && selectedGame !== 'flappy-plane' ? 'opacity-50' : 'opacity-100'}
                `}
              />
              <img
                src={typoTrapLogo}
                alt="Typo Trap"
                onClick={(e) => {
                  e.stopPropagation();
                  handleGameSelect('typo-trap');
                }}
                className={`
                  cursor-pointer
                  ${selectedGame ? 'w-[189px] h-[189px]' : 'w-full max-w-[441px] h-auto'}
                  ${selectedGame && selectedGame !== 'typo-trap' ? 'opacity-50' : 'opacity-100'}
                `}
              />
            </div>
          </div>
        </div>

        {selectedGame && <Panel selectedGame={selectedGame} />}
      </div>
    </div>
  );
};

export default MainPage;
