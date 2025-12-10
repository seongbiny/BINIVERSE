import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import MainPage from './pages/MainPage';
import AuthCallback from './pages/AuthCallback';
import RankingPage from './pages/RankingPage';
import SplashPage from './pages/SplashPage';
import GamePage from './pages/GamePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/game/:gameName" element={<GamePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
