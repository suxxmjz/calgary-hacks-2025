import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useUser, RedirectToSignIn } from "@clerk/clerk-react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import BottomNav from "./components/BottomNav";
import LoginPage from "./pages/LoginPage"; // Import custom login page

function App() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  // If not signed in, show login page instead of app content
  if (!isSignedIn) {
    return <LoginPage />;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post" element={<Post />} />
        </Routes>
      </div>
      <BottomNav />
    </div>
  );
}

export default App;
