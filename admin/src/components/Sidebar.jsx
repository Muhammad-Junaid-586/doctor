import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets_admin/assets'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  return (
    <div className=" h-screen w-28 md:w-64 bg-slate-200 shadow-lg flex flex-col">
      {aToken && (
        <ul className="mt-8 space-y-2 px-4">
          <li>
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 
                ${isActive ? 'bg-slate-400' : 'hover:bg-slate-300 '}`
              }
            >
              <img
                src={assets.home_icon}
                alt="Dashboard Icon"
                className="w-6 h-6 "
              />
              <p className="font-medium hidden md:block">Dashboard</p>
            </NavLink>
          </li>

          {/* Example: Add more sidebar links here */}
          <li>
            <NavLink
              to="/all-appointments"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 
                ${isActive ? 'bg-slate-400' : 'hover:bg-slate-300 '}`
              }
            >
              <img
                src={assets.appointment_icon}
                alt="Users Icon"
                className="w-6 h-6"
              />
              <p className="font-medium hidden md:block">Appointments</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/add-doctor"
              className={({ isActive }) =>
                `flex items-center gap-3  px-4 py-2 rounded-xl transition-all duration-200 
                ${isActive ? 'bg-slate-400' : 'hover:bg-slate-300 '}`
              }
            >
              <img
                src={assets.add_icon}
                alt="Settings Icon"
                className="w-6 h-6"
              />
              <p className="font-medium hidden md:block">Add Doctor</p>
            </NavLink>
          </li>

           <li>
            <NavLink
              to="/doctor-list"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 
                ${isActive ? 'bg-slate-400' : 'hover:bg-slate-300 '}`
              }
            >
              <img
                src={assets.people_icon}
                alt="Users Icon"
                className="w-6 h-6"
              />
              <p className="font-medium hidden md:block">DoctorsList</p>
            </NavLink>
          </li>
        </ul>
      )}

      {/* Sidebar content for non-admin users */}
      {dToken && (
        <ul className="mt-8 space-y-2 px-4">
          <li>
            <NavLink
              to="/doctor-dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 
                ${isActive ? 'bg-slate-400' : 'hover:bg-slate-300 '}`
              }
            >
              <img
                src={assets.home_icon}
                alt="Dashboard Icon"
                className="w-6 h-6 "
              />
              <p className="font-medium hidden md:block">Dashboard</p>
            </NavLink>
          </li>

          {/* Example: Add more sidebar links here */}
          <li>
            <NavLink
              to="/doctor-appointments"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 
                ${isActive ? 'bg-slate-400' : 'hover:bg-slate-300 '}`
              }
            >
              <img
                src={assets.appointment_icon}
                alt="Users Icon"
                className="w-6 h-6"
              />
              <p className="font-medium hidden md:block">Appointments</p>
            </NavLink>
          </li>

         

           <li>
            <NavLink
              to="/doctor-profile"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 
                ${isActive ? 'bg-slate-400' : 'hover:bg-slate-300 '}`
              }
            >
              <img
                src={assets.people_icon}
                alt="Users Icon"
                className="w-6 h-6"
              />
              <p className="font-medium hidden md:block">Profile</p>
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  )
}

export default Sidebar
