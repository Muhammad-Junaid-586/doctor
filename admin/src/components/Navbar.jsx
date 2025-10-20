import React, { useContext } from "react";
import { assets } from "../assets/assets_admin/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
   aToken && localStorage.removeItem("aToken");
   dToken && localStorage.removeItem("dToken");
   dToken && setDToken("");
   aToken && setAToken("");
  };

  return (
    <nav className=" flex justify-between items-center bg-white shadow-md px-6 py-3 border-b border-gray-200">
      {/* Left Section: Logo and Title */}
      <div className="flex items-center gap-3">
        <img
          src={assets.admin_logo}
          alt="Admin Logo"
          className="w-20 h-10 object-contain"
        />
        <p className=" font-semibold text-gray-800 border rounded-full px-2.5 py-0.5">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>

      {/* Right Section: Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition duration-200"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
