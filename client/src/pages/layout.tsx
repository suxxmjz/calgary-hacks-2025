import { JSX } from "react";
import { Outlet } from "react-router-dom";

export function Layout(): JSX.Element {
  return (
    <div className="border border-red-500 h-full bg-zinc-50">
      <div>Navbar</div>
      <Outlet />
    </div>
  );
}
