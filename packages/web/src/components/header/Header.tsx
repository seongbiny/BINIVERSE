import { HeaderActions } from './HeaderActions';

interface HeaderProps {
  isSignedIn?: boolean;
}

const Header = ({ isSignedIn = false }: HeaderProps) => {
  return (
    <div className="flex justify-between items-center px-[40px] py-[24px]">
      <img src="/logo2.png" style={{ width: '105px', height: '24px' }} />
      <HeaderActions isSignedIn={isSignedIn} />
    </div>
  );
};

export default Header;
