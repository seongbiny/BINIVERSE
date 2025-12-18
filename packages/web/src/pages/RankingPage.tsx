import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

interface RankEntry {
  score: number;
  profiles: {
    user_name: string;
    avatar_url: string;
  } | null;
}

function RankingPage() {
  const [ranking, setRanking] = useState<RankEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [game, setGame] = useState("");

  useEffect(() => {
    const fetchRanking = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("scores")
          .select("score, profiles(user_name, avatar_url)")
          .eq("game_name", game)
          .order("score", { ascending: false })
          .limit(100);

        if (error) {
          console.error("Error fetching ranking:", error);
          setError("랭킹을 불러오는 데 실패했습니다.");
        } else {
          // ✅ console.log 추가
          console.log("📊 랭킹 데이터 조회 성공:", data);
          console.log("📊 게임:", game);
          console.log("📊 총 랭킹 수:", data.length);
          data.forEach((entry, index) => {
            console.log(
              `  ${index + 1}위: ${
                entry.profiles?.user_name || "알 수 없음"
              } - ${entry.score}점`
            );
          });
          setRanking(data);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("예상치 못한 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (game) {
      fetchRanking();
    } else {
      setLoading(false);
    }
  }, [game]);

  return (
    <div className="h-screen flex flex-col bg-white">
      <h1>게임 랭킹</h1>
      <div>
        <button onClick={() => setGame("bini-puzzle")}>bini-puzzle</button>
        <button onClick={() => setGame("flappy-plane")}>flappy-plane</button>
        <button onClick={() => setGame("typo-trap")}>typo-trap</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {!loading && !error && (
        <ol>
          {ranking.map((entry, index) => (
            <li key={index}>
              <img
                src={entry.profiles?.avatar_url || "default-avatar.png"}
                alt={entry.profiles?.user_name}
                width="30"
                style={{ borderRadius: "50%", marginRight: "10px" }}
              />
              <strong>{entry.profiles?.user_name || "알 수 없는 유저"}</strong>:{" "}
              {entry.score}점
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default RankingPage;
