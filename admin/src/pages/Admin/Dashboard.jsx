import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";
import { FaUserMd, FaUser, FaCalendarAlt, FaClipboardList } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { assets } from "../../assets/assets_admin/assets";

const Dashboard = () => {
  
  const { dashboardData , fetchDashboardData , aToken , cancelAppointment } = useContext(AdminContext);

  useEffect(() => {
   if (aToken) {
    
     fetchDashboardData();
   }
  }, [ aToken]);

  if (!dashboardData) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-gray-500">
        Loading Dashboard...
      </div>
    );
  }

  const { doctors, patients, appointments, latestAppointments } = dashboardData;

  return (
    <div className="p-6 bg-[#f8f9fd] max-h-[80vh]  overflow-y-scroll">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {/* Doctors */}
        <div className="bg-white shadow rounded-xl flex items-center gap-4 p-6 border border-gray-100">
          <div className="bg-blue-100 p-4 rounded-xl">
            <FaUserMd className="text-blue-500 text-3xl" />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-gray-800">{doctors}</h2>
            <p className="text-gray-500 font-medium">Doctors</p>
          </div>
        </div>

        {/* Appointments */}
        <div className="bg-white shadow rounded-xl flex items-center gap-4 p-6 border border-gray-100">
          <div className="bg-purple-100 p-4 rounded-xl">
            <FaClipboardList className="text-purple-500 text-3xl" />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-gray-800">{appointments}</h2>
            <p className="text-gray-500 font-medium">Appointments</p>
          </div>
        </div>

        {/* Patients */}
        <div className="bg-white shadow rounded-xl flex items-center gap-4 p-6 border border-gray-100">
          <div className="bg-green-100 p-4 rounded-xl">
            <FaUser className="text-green-500 text-3xl" />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-gray-800">{patients}</h2>
            <p className="text-gray-500 font-medium">Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Appointments */}
      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-x-scroll">
        <div className="flex items-center gap-2 border-b px-6 py-4">
          <FaCalendarAlt className="text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-800">Latest Appointment</h3>
        </div>

        <div className="divide-y overflow-x-scroll">
          {latestAppointments.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center px-6 py-4 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.docData?.image}
                  alt={item.docData?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-800">{item.docData?.name}</p>
                  <p className="text-gray-500 text-sm">
                    Booking on {new Date(item.slotDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                              {item.cancelled ? (
                                <button className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium">
                                  Cancelled
                                </button>
                              ) : item.isCompleted ? (
                                <button className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                                  Completed
                                </button>
                              ) : (
                                <img onClick={()=> cancelAppointment(item._id)} src={assets.cancel_icon} alt=""  />
                              )}
                            </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
