import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useEffect } from "react";

const Navbar = () => {
  const {token , setToken , userData}  = React.useContext(AppContext);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(false);
    navigate("/");
  };

  useEffect(()=>{
      if (token) {
        navigate("/");
      }
  }, [token])
  
  return (
    <div className="flex justify-between items-center py-4 mb-5 text-sm border-b border-gray-300 px-6 md:px-12 relative">
      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        className="w-40 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-start gap-6 font-medium text-gray-700">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-blue-600" : "hover:text-blue-600"
          }
        >
          <li className="py-1">Home</li>
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-blue-600" : "hover:text-blue-600"
          }
        >
          <li className="py-1">About</li>
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "text-blue-600" : "hover:text-blue-600"
          }
        >
          <li className="py-1">Contact</li>
        </NavLink>
        <NavLink
          to="/doctors"
          className={({ isActive }) =>
            isActive ? "text-blue-600" : "hover:text-blue-600"
          }
        >
          <li className="py-1">Doctors</li>
        </NavLink>
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              className="w-8 h-8 rounded-full object-cover bg-indigo-50"
              src={userData.image}
              alt="Profile"
            />
            <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />

            {/* Dropdown Menu */}
            <div className="absolute top-0 right-0 z-20 pt-12 text-base font-medium text-gray-600 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded-lg shadow-lg flex flex-col gap-3 p-4">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={() => handleLogout()}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 py-2 px-6 text-white rounded-full font-light hidden md:block hover:bg-blue-700 transition"
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu Button */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 cursor-pointer md:hidden"
          src={assets.menu_icon}
          alt="Menu"
        />
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl transform ${
          showMenu ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 md:hidden`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <img src={assets.logo} className="w-28" alt="Logo" />
          <img
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            className="w-6 cursor-pointer"
            alt="Close"
          />
        </div>

        {/* Links */}
        <ul className="flex flex-col px-6 py-4 space-y-4 text-gray-700 font-medium">
          <NavLink
            to="/"
            onClick={() => setShowMenu(false)}
            className="hover:text-blue-600 transition"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setShowMenu(false)}
            className="hover:text-blue-600 transition"
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setShowMenu(false)}
            className="hover:text-blue-600 transition"
          >
            Contact
          </NavLink>
          <NavLink
            to="/doctors"
            onClick={() => setShowMenu(false)}
            className="hover:text-blue-600 transition"
          >
            Doctors
          </NavLink>

          {/* Mobile Auth Options */}
          {token ? (
            <>
              <hr className="border-gray-200" />
              <p
                onClick={() => {
                  setShowMenu(false);
                  navigate("/my-profile");
                }}
                className="hover:text-blue-600 cursor-pointer"
              >
                My Profile
              </p>
              <p
                onClick={() => {
                  setShowMenu(false);
                  navigate("/my-appointments");
                }}
                className="hover:text-blue-600 cursor-pointer"
              >
                My Appointments
              </p>
              <p
                onClick={() => {
                  handleLogout();
                  setShowMenu(false);
                }}
                className="hover:text-red-500 cursor-pointer"
              >
                Logout
              </p>
            </>
          ) : (
            <button
              onClick={() => {
                setShowMenu(false);
                navigate("/login");
              }}
              className="mt-4 bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition"
            >
              Create Account
            </button>
          )}
        </ul>
      </div>

      {/* Overlay (click outside to close) */}
      {showMenu && (
        <div
          onClick={() => setShowMenu(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
        ></div>
      )}
    </div>
  );
};

export default Navbar;
