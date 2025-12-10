import { supabase } from '@bini-game-town/shared';
import { useNavigate } from 'react-router-dom';
import { HeaderButton } from './HeaderButton';

type HeaderButtonVariant = 'login' | 'logout' | 'ranking';

interface HeaderActionsProps {
  isSignedIn: boolean;
}

export const HeaderActions = ({ isSignedIn }: HeaderActionsProps) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('로그아웃 오류:', error);
      return;
    }
    navigate('/sign-in');
  };

  const handleSignIn = () => {
    navigate('/sign-in');
  };

  const handleGoRanking = () => {
    navigate('/ranking');
  };

  const buttons: HeaderButtonVariant[] = isSignedIn ? ['ranking', 'logout'] : ['login'];

  const getButtonConfig = (variant: HeaderButtonVariant) => {
    switch (variant) {
      case 'login':
        return { label: 'Login', onClick: handleSignIn };
      case 'logout':
        return { label: 'Logout', onClick: handleSignOut };
      case 'ranking':
        return { label: 'Rank', onClick: handleGoRanking };
    }
  };

  return (
    <div className="flex items-center gap-[16px]">
      {buttons.map((variant) => {
        const { label, onClick } = getButtonConfig(variant);
        return <HeaderButton key={variant} variant={variant} label={label} onClick={onClick} />;
      })}
    </div>
  );
};
