import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SplashPage.css';

const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timerId = setTimeout(() => {
      navigate('/main', { replace: true });
    }, 3000);

    return () => clearTimeout(timerId);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <img src="/logo.png" alt="BINIVERSE Logo" className="splash-logo w-40 h-40" />
    </div>
  );
};

export default SplashPage;
