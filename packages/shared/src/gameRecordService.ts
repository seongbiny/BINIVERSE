/**
 * 게임 ID 타입 정의
 */
export type GameId = "typo-trap" | "flappy-plane" | "bini-puzzle";

/**
 * 게임 결과 페이로드 인터페이스
 */
export interface GameResultPayload {
  gameName: GameId;
  score: number;
  difficulty: string;
}

/**
 * 게임 결과를 부모 창(웹)으로 전송합니다.
 *
 * iframe 내 게임에서 호출되며, 웹의 GamePage.tsx에서
 * postMessage를 수신하여 Supabase에 저장합니다.
 *
 * @param gameName - 게임 식별자 ("typo-trap" | "flappy-plane" | "bini-puzzle")
 * @param score - 게임 점수
 * @param difficulty - 난이도 (기본값: "normal")
 *
 * @example
 * // typo-trap에서 사용
 * submitGameResult("typo-trap", currentStage);
 *
 * // flappy-plane에서 사용
 * submitGameResult("flappy-plane", currentScore);
 */
export const submitGameResult = (
  gameName: GameId,
  score: number,
  difficulty: string = "normal"
): void => {
  try {
    const payload: GameResultPayload = {
      gameName,
      score,
      difficulty,
    };

    // iframe에서 부모 웹으로 게임 결과 전송
    window.parent.postMessage(
      {
        type: "BGT_GAME_RESULT",
        payload,
      },
      "*" // 개발 환경에서는 "*", 프로덕션에서는 특정 origin 권장
    );

    console.log("🎮 게임 결과를 부모 창으로 전송:", payload);
  } catch (error) {
    console.error("게임 결과 전송 중 예외 발생:", error);
  }
};
