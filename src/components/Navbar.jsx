import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaThLarge, FaProjectDiagram, FaUser, FaBars, FaTimes, FaHistory, FaSignOutAlt, FaSprayCan, FaChartBar } from "react-icons/fa";
import { User } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState({});

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaThLarge /> },
    { name: "Projects", path: "/projects", icon: <FaProjectDiagram /> },
    { name: "Stats", path: "/stats", icon: <FaChartBar /> },
    { name: "Account", path: "/account", icon: <FaUser /> },
    { name: "History", path: "/history", icon: <FaHistory /> },
    { name: "Predictions", path: "/home", icon: <FaSprayCan /> },
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email) {
      setLoggedUser(user);
    }
  }, []);

  const handleLogout = () => {
    toast.warn(
      <div className="flex flex-col items-center">
        <p className="mb-2 font-semibold">Are you sure you want to logout?</p>
        <div className="flex gap-4">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
            onClick={() => {
              localStorage.removeItem("file_name");
              localStorage.removeItem("user");
              toast.dismiss();
              toast.success("Logged out successfully!");
              navigate("/");
            }}
          >
            Yes
          </button>
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
            onClick={() => toast.dismiss()}
          >
            No
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
  };

  return (
    <>
      {/* Sidebar for larger screens */}
      <div
        className={`fixed top-0 left-0 h-screen w-72 bg-white/80 backdrop-blur-lg p-6 flex flex-col gap-8 shadow-lg transition-all duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
      >
        {/* User Profile Section */}
        <div className="flex items-center gap-4 p-4 bg-white/50 rounded-xl shadow-sm">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gray-100 border-2 border-gray-100 shadow-md hover:border-blue-500 transition-all duration-300 flex items-center justify-center">
              <User className="w-6 h-6 text-gray-600" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">{loggedUser.name || "Guest"}</h2>
            <p className="text-sm text-gray-500">{loggedUser.email ? "User" : "Not Logged In"}</p>
          </div>
          <button
            className="md:hidden ml-auto text-gray-500 hover:text-gray-700 transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 p-4 rounded-xl transition-all duration-200 ${isActive
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md mt-auto"
        >
          <FaSignOutAlt className="text-lg" />
          <span className="font-medium">Logout</span>
        </button>
      </div>

      {/* Mobile Navbar Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white/80 backdrop-blur-lg p-3 rounded-full shadow-lg hover:bg-white transition-all duration-200"
        onClick={() => setIsOpen(true)}
      >
        <FaBars size={20} className="text-gray-700" />
      </button>

      {/* Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-lg p-4 flex justify-around shadow-lg md:hidden">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 transition-all duration-200 ${isActive
                ? "text-blue-600 scale-110"
                : "text-gray-600 hover:text-gray-900"
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs font-medium">{item.name}</span>
          </NavLink>
        ))}
      </div>

      {/* Main Content Margin for Desktop */}
      <div className="hidden md:block md:ml-72"></div>
    </>
  );
}