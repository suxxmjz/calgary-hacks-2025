import { Routes, Route } from "react-router-dom";
import { useUser, RedirectToSignIn } from "@clerk/clerk-react";
import Home from "./pages/HomePage";
import Profile from "./pages/ProfilePage";
import Post from "./pages/CreatePostPage";
import BottomNav from "./components/BottomNav";
import CommunityPage from "./pages/CommunityPage";
import {
  COMMUNITY_POSTS_ROUTE,
  CREATE_POST_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  REGISTER_ROUTE,
} from "./utils/routes";
import LoginPage from "./pages/LoginPage";

export const BASE_API_URL = `${import.meta.env.VITE_BACKEND_API_URL}/api`;

function App() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={PROFILE_ROUTE} element={<Profile />} />
          <Route path={CREATE_POST_ROUTE} element={<Post />} />
          <Route path={COMMUNITY_POSTS_ROUTE} element={<CommunityPage />} />
          <Route path={LOGIN_ROUTE} element={<LoginPage />} />
          <Route path={REGISTER_ROUTE} element={<>Register Page</>} />
        </Routes>
      </div>
      <BottomNav />
    </div>
  );
}

export default App;
