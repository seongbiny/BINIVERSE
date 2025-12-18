import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import MainPage from "./pages/MainPage";
import AuthCallback from "./pages/AuthCallback";
import RankingPage from "./pages/RankingPage";
import SplashPage from "./pages/SplashPage";
import GamePage from "./pages/GamePage";
import NotFoundPage from "./pages/NotFoundPage";
import { useAuthStore } from "./stores/authStore";
import { useEffect } from "react";
import { supabase } from "@bini-game-town/shared";

function App() {
  const { setSession } = useAuthStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [setSession]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/game/:gameName" element={<GamePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
