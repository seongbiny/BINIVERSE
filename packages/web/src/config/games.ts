import BiniPuzzlePanel from '@/assets/image/bini-puzzle-panel.svg';
import FlappyPlanePanel from '@/assets/image/flappy-plane-panel.svg';
import TypoTrapPanel from '@/assets/image/typo-trap-panel.svg';

import PuzzleIcon from '@/assets/icon/PuzzleIcon.svg';
import PlaneIcon from '@/assets/icon/PlaneIcon.svg';
import BombIcon from '@/assets/icon/BombIcon.svg';

export type GameId = 'bini-puzzle' | 'flappy-plane' | 'typo-trap';

export interface GameMeta {
  id: GameId;
  title: string; // 패널 상단 타이틀 (예: BINI PUZZLE)
  description: string; // About 텍스트
  panelImage: string; // 패널 상단 이미지
  icon: string; // 타이틀 옆 아이콘
}

export const gamesById: Record<GameId, GameMeta> = {
  'bini-puzzle': {
    id: 'bini-puzzle',
    title: 'BINI PUZZLE',
    description: 'BINI PUZZLE is a game where you need to solve a puzzle by moving the pieces.',
    panelImage: BiniPuzzlePanel,
    icon: PuzzleIcon,
  },
  'flappy-plane': {
    id: 'flappy-plane',
    title: 'FLAPPY PLANE',
    description: 'FLAPPY PLANE is a game where you need to fly a plane through the obstacles.',
    panelImage: FlappyPlanePanel,
    icon: PlaneIcon,
  },
  'typo-trap': {
    id: 'typo-trap',
    title: 'TYPO TRAP',
    description: 'TYPO TRAP is a game where you need to avoid the traps.',
    panelImage: TypoTrapPanel,
    icon: BombIcon,
  },
};
