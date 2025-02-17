import React from "react";
import { Routes, Route } from "react-router-dom";
import { useUser, RedirectToSignIn } from "@clerk/clerk-react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import BottomNav from "./components/BottomNav";
import CommunityPage from "./pages/CommunityPage";

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
          <Route path="/profile" element={<Profile />} />
          <Route path="/post" element={<Post />} />
          <Route path="/communityposts" element={<CommunityPage />} />
        </Routes>
      </div>
      <BottomNav />
    </div>
  );
}

export default App;
