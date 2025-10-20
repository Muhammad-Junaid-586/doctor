import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import {
  DollarSign,
  CalendarCheck,
  Users,
  Clock,
  User,
  CreditCard,
} from "lucide-react";
import { assets } from "../../assets/assets_admin/assets";

const DoctorDashboard = () => {
  const { dToken, dashboardData, getDashboardData, loading , cancelAppoinment , completeAppoinment } =
    useContext(DoctorContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) getDashboardData();
  }, [dToken]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-[80vh] text-gray-500">
        Loading dashboard...
      </div>
    );

  if (!dashboardData)
    return (
      <div className="flex items-center justify-center h-[80vh] text-gray-500">
        No dashboard data found.
      </div>
    );

  const { earning, appointments, patients, latestAppointments } = dashboardData;

  return  (
    <div className="w-full max-w-6xl mx-auto my-6 px-4 max-h-[80vh] overflow-y-scroll">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Doctor Dashboard
      </h2>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-3 gap-5 mb-8">
        {/* Earnings Card */}
        <div className="bg-white shadow-md rounded-xl p-5 border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Earnings</p>
            <h3 className="text-2xl font-semibold text-indigo-600 mt-1">
              ${earning.toLocaleString()}
            </h3>
          </div>
          <div className="p-3 bg-indigo-100 rounded-full">
           <img src={assets.earning_icon} alt="" />
          </div>
        </div>

        {/* Appointments Card */}
        <div className="bg-white shadow-md rounded-xl p-5 border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Appointments</p>
            <h3 className="text-2xl font-semibold text-green-600 mt-1">
              {appointments}
            </h3>
          </div>
          <div className="p-3 bg-green-100 rounded-full">
            <img src={assets.appointments_icon} alt="" />
          </div>
        </div>

        {/* Patients Card */}
        <div className="bg-white shadow-md rounded-xl p-5 border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Patients</p>
            <h3 className="text-2xl font-semibold text-blue-600 mt-1">
              {patients}
            </h3>
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <img src={assets.patients_icon} alt="" />
          </div>
        </div>
      </div>

      {/* Latest Appointments */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b bg-gray-100 flex items-center gap-2">
          <Clock size={18} className="text-indigo-600" />
          <p className="font-medium text-gray-700">Latest Appointments</p>
        </div>

        {latestAppointments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-gray-600 border-b bg-gray-50">
                <tr>
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4 flex items-center gap-1">
                    <User size={14} /> Patient
                  </th>
                 
                  
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {latestAppointments.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition duration-150"
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4 ">
                      <div className="flex items-center gap-2">
                        <img className="w-8 h-8 rounded-full" src={item.userData?.image} alt="" />
                        <div>
                          <p>{item.userData?.name}</p>
                          <p>{slotDateFormat(item.slotDate)}  {item.slotTime}</p>
                        </div>
                      </div>
                      
                      </td>
                    
                   
                    <td className="py-3 px-4">
                     {/* Actions */}
                                   {item.cancelled ? (
                                     <p className="text-red-500 text-xs border rounded-full px-2 py-0.5 text-center w-fit">
                                       CANCELLED
                                     </p>
                                   ) : item.isCompleted ? (
                                     <p className="text-green-600 text-xs border rounded-full px-2 py-0.5 text-center w-fit">
                                       COMPLETED
                                     </p>
                                   ) : (
                                     <div className="flex gap-3">
                                       <img
                                         src={assets.cancel_icon}
                                         onClick={() => cancelAppoinment(item._id)}
                                         className="w-7 cursor-pointer hover:scale-110 transition"
                                         alt="Cancel"
                                       />
                                       <img
                                         src={assets.tick_icon}
                                         onClick={() => completeAppoinment(item._id)}
                                         className="w-7 cursor-pointer hover:scale-110 transition"
                                         alt="Complete"
                                       />
                                     </div>
                                   )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500 py-6">
            No recent appointments found.
          </p>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
