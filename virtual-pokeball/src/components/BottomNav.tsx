import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Search, Bell, User, Settings } from "lucide-react";

const BottomNav: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-between items-center py-2 px-4 shadow-lg z-10">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex justify-center items-center text-gray-500 transition-all duration-200 flex-grow ${isActive ? "text-black" : ""}`
        }
      >
        <Home size={24} />
      </NavLink>
      <NavLink
        to="/explore"
        className={({ isActive }) =>
          `flex justify-center items-center text-gray-500 transition-all duration-200 flex-grow ${isActive ? "text-black" : ""}`
        }
      >
        <Search size={24} />
      </NavLink>
      <NavLink
        to="/notifications"
        className={({ isActive }) =>
          `flex justify-center items-center text-gray-500 transition-all duration-200 flex-grow ${isActive ? "text-black" : ""}`
        }
      >
        <Bell size={24} />
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `flex justify-center items-center text-gray-500 transition-all duration-200 flex-grow ${isActive ? "text-black" : ""}`
        }
      >
        <User size={24} />
      </NavLink>
      <NavLink
        to="/settings"
        className={({ isActive }) =>
          `flex justify-center items-center text-gray-500 transition-all duration-200 flex-grow ${isActive ? "text-black" : ""}`
        }
      >
        <Settings size={24} />
      </NavLink>
    </div>
  );
};

export default BottomNav;
