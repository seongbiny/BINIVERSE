import { HeaderActions } from "./HeaderActions";
import BiniGameTownLogo from "@/assets/icon/logo.svg";
import BiniGameTownLogoDark from "@/assets/icon/logo-dark.svg";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  isSignedIn?: boolean;
  variant?: "light" | "dark";
}

const Header = ({ isSignedIn = false, variant = "light" }: HeaderProps) => {
  const navigate = useNavigate();
  const logo = variant === "light" ? BiniGameTownLogo : BiniGameTownLogoDark;
  return (
    <div className="flex justify-between items-center px-[40px] py-[24px]">
      <img
        src={logo}
        style={{ width: "181px", height: "40px", cursor: "pointer" }}
        onClick={() => {
          navigate("/main");
        }}
      />

      <HeaderActions isSignedIn={isSignedIn} />
    </div>
  );
};

export default Header;
