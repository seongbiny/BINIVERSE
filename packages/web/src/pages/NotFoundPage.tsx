import Header from "@/components/header/Header";
import { useAuthStore } from "@/stores/authStore";

const NotFoundPage = () => {
  const { session } = useAuthStore();
  console.log(session);
  return (
    <div className="h-screen flex flex-col bg-white">
      <Header isSignedIn={!!session} variant="dark" />
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-[36px]">
          <img
            src="/src/assets/image/not-found.png"
            alt="404 Not Found"
            className="w-auto h-[97px]"
          />
          <img
            src="/src/assets/image/not-found-cat.png"
            alt="Not Found Cat"
            className="w-[520px] h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
