import { JSX } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const LOGIN_ROUTE = "/login";
export const REGISTER_ROUTE = "/register";
export const PROFILE_ROUTE = "/profile";
export const CREATE_POST_ROUTE = "/post";
export const COMMUNITY_POSTS_ROUTE = "/community-posts";

export function ProtectedRoute(): JSX.Element {
  const isAuth = true;

  return isAuth ? <Outlet /> : <Navigate to={LOGIN_ROUTE} />;
}
