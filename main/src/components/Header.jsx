import React, { useEffect, useState } from "react";
import { Users, LogIn, LogOut, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../swap.css";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleViewProfile = () => {
    navigate("/profile");
    setDropdownOpen(false);
    console.log("clicked");
  };
  const handleback = () => {
    navigate("/");
    setDropdownOpen(false);
  };
  const handleViewList = () => {
    navigate("/listing");
    setDropdownOpen(false);
  };

  return (
    <header className="bg-slate-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Users onClick={handleback} className="h-8 w-8 text-teal-400" />
          <h1 className="ppfftt text-2xl font-bold">Skill Swap Platform</h1>
        </div>

        {/* Right section */}
        {user ? (
          <div className="relative flex items-center space-x-4">
            <button
              onClick={toggleDropdown}
              className="flex items-center bg-slate-800 text-teal-300 font-medium px-4 py-2 rounded-full transition-all hover:bg-slate-700"
            >
              👋 Hi, {user.name}
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-16 top-12 mt-2 w-40 bg-white text-black rounded-md shadow-lg z-50">
                <button
                  onClick={handleViewProfile}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  View Profile
                </button>
                <button
                  onClick={handleViewList}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Requests
                </button>
              </div>
            )}

            <button
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <button
            className="loginkabaap flex items-center space-x-2 bg-teal-600 hover:bg-teal-700 px-6 py-2 transition-colors rounded-md"
            onClick={handleLoginClick}
          >
            <LogIn className="h-4 w-4" />
            <span>Login</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
