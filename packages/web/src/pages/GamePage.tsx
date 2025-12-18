import type { GameId } from "@/config/games";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

type GameResultMessage = {
  type: "BGT_GAME_RESULT";
  payload: {
    gameName: GameId;
    score: number;
    difficulty?: string | null;
  };
};

const isGameResultMessage = (data: unknown): data is GameResultMessage => {
  if (!data || typeof data !== "object") return false;

  const maybe = data as any;
  if (maybe.type !== "BGT_GAME_RESULT") return false;

  const payload = maybe.payload;
  if (!payload || typeof payload !== "object") return false;

  const { gameName, score, difficulty } = payload;

  const isValidGameName =
    gameName === "bini-puzzle" ||
    gameName === "flappy-plane" ||
    gameName === "typo-trap";

  const isValidScore = typeof score === "number" && Number.isFinite(score);

  const isValidDifficulty =
    difficulty === undefined ||
    difficulty === null ||
    typeof difficulty === "string";

  return isValidGameName && isValidScore && isValidDifficulty;
};

const GamePage = () => {
  const { gameName } = useParams<{ gameName: string }>();
  const navigate = useNavigate();
  const isDev = import.meta.env.DEV;

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const gameUrls = useMemo(() => {
    if (isDev) {
      return {
        "bini-puzzle": "http://localhost:5001",
        "flappy-plane": "http://localhost:5002",
        "typo-trap": "http://localhost:5003",
      } satisfies Record<GameId, string>;
    }

    return {
      "bini-puzzle": "/game/bini-puzzle/",
      "flappy-plane": "/game/flappy-plane/",
      "typo-trap": "/game/typo-trap/",
    } satisfies Record<GameId, string>;
  }, [isDev]);

  useEffect(() => {
    if (!gameName || !(gameName in gameUrls)) {
      navigate("/main");
    }
  }, [gameName, navigate, gameUrls]);

  // 핵심: message 수신 + 저장
  useEffect(() => {
    // 1) allowed origins 준비
    // - prod: 같은 origin에서 서빙되므로 window.location.origin이면 충분
    // - dev: 게임이 다른 포트(origin)라서 각각 허용해줘야 함
    const allowedOrigins = isDev
      ? new Set([
          "http://localhost:5001",
          "http://localhost:5002",
          "http://localhost:5003",
        ])
      : new Set([window.location.origin]);

    const onMessage = async (event: MessageEvent) => {
      // 2) origin 검증
      if (!allowedOrigins.has(event.origin)) return;

      // 2.5) (권장) “우리 iframe에서 온 메시지인지” 추가 검증
      // - 다른 탭/광고 iframe 등이 같은 origin에서 메시지 보내는 경우까지 방지
      if (event.source !== iframeRef.current?.contentWindow) return;

      // 3) payload 검증
      if (!isGameResultMessage(event.data)) return;

      const {
        gameName: reportedGameName,
        score,
        difficulty,
      } = event.data.payload;

      // (선택) 현재 페이지가 보여주는 게임과, 메시지가 주장하는 게임명이 다르면 무시
      if (typeof gameName === "string" && gameName !== reportedGameName) return;

      try {
        // 4) 로그인 확인
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          console.error("유저 조회 실패:", userError);
          return;
        }

        if (!user) {
          // 로그인 안 했으면 저장하지 않음(요구사항대로)
          console.log("로그인 상태가 아니라 점수를 저장하지 않습니다.");
          return;
        }

        // 5) insert
        const { error: insertError } = await supabase.from("scores").insert({
          user_id: user.id,
          game_name: reportedGameName,
          score,
          difficulty: difficulty ?? null,
        });

        if (insertError) {
          console.error("scores 저장 실패:", insertError);
          return;
        }

        console.log("scores 저장 완료:", {
          reportedGameName,
          score,
          difficulty: difficulty ?? null,
        });
      } catch (e) {
        console.error("message 처리 중 예외:", e);
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [gameName, isDev]);

  if (!gameName || !(gameName in gameUrls)) return null;

  return (
    <div className="relative w-full h-screen bg-black">
      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => navigate("/main")}
        className="absolute top-4 left-4 z-50 bg-white/80 hover:bg-white px-4 py-2 rounded-lg shadow-lg transition-all"
      >
        ← 뒤로가기
      </button>

      {/* 게임 iframe */}
      <iframe
        ref={iframeRef}
        src={gameUrls[gameName as keyof typeof gameUrls]}
        title={gameName}
        className="w-full h-full border-none"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        onLoad={() => console.log("iframe loaded")}
        onError={(e) => console.error("iframe error:", e)}
      />
    </div>
  );
};

export default GamePage;
