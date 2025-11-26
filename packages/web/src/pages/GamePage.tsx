import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const GamePage = () => {
  const { gameName } = useParams<{ gameName: string }>();
  const navigate = useNavigate();
  const isDev = import.meta.env.DEV;

  const gameUrls = useMemo(() => {
    if (isDev) {
      // 개발 모드: 직접 게임 서버 포트로 연결
      return {
        'bini-puzzle': 'http://localhost:5001',
        'flappy-plane': 'http://localhost:5002',
        'typo-trap': 'http://localhost:5003',
      };
    } else {
      // 프로덕션: 상대 경로 사용
      return {
        'bini-puzzle': '/game/bini-puzzle/',
        'flappy-plane': '/game/flappy-plane/',
        'typo-trap': '/game/typo-trap/',
      };
    }
  }, [isDev]);

  useEffect(() => {
    if (!gameName || !gameUrls[gameName as keyof typeof gameUrls]) {
      navigate('/main');
    }
  }, [gameName, navigate, gameUrls]);

  if (!gameName || !gameUrls[gameName as keyof typeof gameUrls]) {
    return null;
  }

  console.log('GamePage rendering:', gameName, gameUrls[gameName as keyof typeof gameUrls]);

  return (
    <div className="relative w-full h-screen bg-black">
      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => navigate('/main')}
        className="absolute top-4 left-4 z-50 bg-white/80 hover:bg-white px-4 py-2 rounded-lg shadow-lg transition-all"
      >
        ← 뒤로가기
      </button>

      {/* 게임 iframe */}
      <iframe
        src={gameUrls[gameName as keyof typeof gameUrls]}
        title={gameName}
        className="w-full h-full border-none"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        onLoad={() => console.log('iframe loaded')}
        onError={(e) => console.error('iframe error:', e)}
      />
    </div>
  );
};

export default GamePage;
