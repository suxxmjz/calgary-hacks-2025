import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import Post from "./pages/CreatePostPage";
import CommunityPage from "./pages/CommunityPage";
import {
  COMMUNITY_POSTS_ROUTE,
  CREATE_POST_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  ProtectedRoute,
  REGISTER_ROUTE,
} from "./utils/routes";
import { ProfilePage } from "./pages/ProfilePage";
import { LoginPage } from "./pages/LoginPage";
import { Layout } from "./pages/layout";
import { RegisterPage } from "./pages/RegisterPage";

export const BASE_API_URL = `${import.meta.env.VITE_BACKEND_API_URL}/api`;

function App() {
  return (
    <Routes>
      <Route path={LOGIN_ROUTE} element={<LoginPage />} />
      <Route path={REGISTER_ROUTE} element={<RegisterPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path={PROFILE_ROUTE} element={<ProfilePage />} />
          <Route path={CREATE_POST_ROUTE} element={<Post />} />
          <Route path={COMMUNITY_POSTS_ROUTE} element={<CommunityPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
