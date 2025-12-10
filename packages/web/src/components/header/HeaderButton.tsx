import SignoutIcon from '@/assets/icon/signout.svg';
import SignoutWhiteIcon from '@/assets/icon/signout-white.svg';
import SigninIcon from '@/assets/icon/signin.svg';
import SigninWhiteIcon from '@/assets/icon/signin-white.svg';
import RankingIcon from '@/assets/icon/ranking.svg';
import RankingWhiteIcon from '@/assets/icon/ranking-white.svg';

type HeaderButtonVariant = 'login' | 'logout' | 'ranking';

interface HeaderButtonProps {
  variant: HeaderButtonVariant;
  label: string;
  onClick: () => void;
}

const getBackgroundClass = (variant: HeaderButtonVariant) =>
  variant === 'ranking' ? 'bg-[#172445]' : 'bg-[#353C3F]';

export const HeaderButton = ({ variant, label, onClick }: HeaderButtonProps) => {
  return (
    <button
      className={`group flex items-center justify-center gap-[8px] cursor-pointer py-[12px] px-[20px] rounded-[12px] ${getBackgroundClass(variant)}`}
      onClick={onClick}
    >
      {variant === 'logout' && (
        <div className="flex h-6 w-6 items-center justify-center">
          <img src={SignoutIcon} className="block h-6 w-6 group-hover:hidden" alt="Sign out icon" />
          <img
            src={SignoutWhiteIcon}
            className="hidden h-6 w-6 group-hover:block"
            alt="Sign out icon hovered"
          />
        </div>
      )}

      {variant === 'login' && (
        <div className="flex h-6 w-6 items-center justify-center">
          <img src={SigninIcon} className="block h-6 w-6 group-hover:hidden" alt="Sign in icon" />
          <img
            src={SigninWhiteIcon}
            className="hidden h-6 w-6 group-hover:block"
            alt="Sign in icon hovered"
          />
        </div>
      )}

      {variant === 'ranking' && (
        <div className="flex h-6 w-6 items-center justify-center">
          <img src={RankingIcon} className="block h-6 w-6 group-hover:hidden" alt="Ranking icon" />
          <img
            src={RankingWhiteIcon}
            className="hidden h-6 w-6 group-hover:block"
            alt="Ranking icon hovered"
          />
        </div>
      )}

      <div className="text-[16px] text-[#CFD6D9] group-hover:text-white">{label}</div>
    </button>
  );
};
