import { useAuthStore } from '../stores/authStore';
import Header from '../components/header/Header';
import BiniPuzzleLogo from '@/assets/image/biniPuzzleLogo.svg';
import flappyPlaneLogo from '@/assets/image/flappyPlaneLogo.svg';
import typoTrapLogo from '@/assets/image/typoTrapLogo.svg';

import { useState } from 'react';
import Panel from '@/components/panel/Panel';
import type { GameId } from '@/config/games';

import { motion, LayoutGroup } from 'framer-motion';

const MainPage = () => {
  const { session } = useAuthStore();

  const [selectedGame, setSelectedGame] = useState<GameId | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // 크기 전환: flex-basis + transition
  const imageSizeClass = isOpen ? 'basis-[189px] h-[189px]' : 'basis-[441px] h-[441px]';
  const imageFadeClass = (gameId: GameId) =>
    selectedGame && selectedGame !== gameId ? 'opacity-50' : 'opacity-100';

  const handleGameSelect = (gameName: GameId) => {
    setSelectedGame(gameName);
    requestAnimationFrame(() => setIsOpen(true)); // 다음 프레임에 열기
  };

  const handleClose = () => {
    if (!selectedGame) return;
    setIsOpen(false); // 닫기 애니메이션 시작
    setTimeout(() => setSelectedGame(null), 300); // 전환 후 언마운트
  };

  return (
    <div className="h-screen flex flex-col">
      <Header isSignedIn={!!session} />

      <div className="flex flex-1 overflow-hidden relative">
        <div className="flex-1" onClick={handleClose}>
          <div className="px-[40px] pt-[56px]">
            <h1 className="text-[30px] text-[#F1F4F6] font-medium px-[8px] mb-[48px]">Games</h1>

            <LayoutGroup>
              <div className="flex flex-wrap gap-[24px]">
                <motion.img
                  layout
                  src={BiniPuzzleLogo}
                  alt="Bini Puzzle"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGameSelect('bini-puzzle');
                  }}
                  className={`
                  cursor-pointer
                  ${imageSizeClass}
                  ${imageFadeClass('bini-puzzle')}
                `}
                />
                <motion.img
                  layout
                  src={flappyPlaneLogo}
                  alt="Flappy Plane"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGameSelect('flappy-plane');
                  }}
                  className={`
                cursor-pointer
                  ${imageSizeClass}
                  ${imageFadeClass('flappy-plane')}
                `}
                />
                <motion.img
                  layout
                  src={typoTrapLogo}
                  alt="Typo Trap"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGameSelect('typo-trap');
                  }}
                  className={`
                cursor-pointer
                  ${imageSizeClass}
                  ${imageFadeClass('typo-trap')}
                `}
                />
              </div>
            </LayoutGroup>
          </div>
        </div>

        {selectedGame && <Panel selectedGame={selectedGame} isOpen={isOpen} />}
      </div>
    </div>
  );
};

export default MainPage;
