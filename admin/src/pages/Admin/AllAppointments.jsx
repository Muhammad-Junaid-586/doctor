import React, { useContext } from "react";
// import { AppContext } from "../../../../frontend/src/context/AppContext";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";

const MyAppointments = () => {
  const { appointments , aToken , getAllAppointments , cancelAppointment } = useContext(AdminContext);
  const {calculateAge , slotDateFormat, currency} = useContext(AppContext);

  React.useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);
  return (
    <div className="w-full max-w-6xl mx-auto my-5 p-4">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded-xl text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll shadow-sm">
        {/* ======= Table Header ======= */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_2fr] border-b px-4 py-3 font-medium text-gray-700 bg-gray-100 sticky top-0">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* ======= Table Rows ======= */}
        {appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div
              key={index}
              className="flex flex-wrap justify-between sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_2fr] px-4 py-3 border-b text-gray-700 items-center hover:bg-gray-50 transition"
            >
              {/* # */}
              <p className="text-gray-600">{index + 1}</p>

              {/* Patient */}
              <div className="flex items-center gap-3">
                <img
                  src={item.userData?.image}
                  alt={item.userData?.name}
                  className="w-10 h-10 rounded-full object-cover border"
                />
                <p>{item.userData?.name}</p>
              </div>

              {/* Age */}
              <p>{calculateAge(item.userData?.dob)}</p>

              {/* Date & Time */}
              <p>
                {slotDateFormat(item.slotDate)} <br />
                <span className="text-gray-500 text-xs">{item.slotTime}</span>
              </p>

              {/* Doctor */}
              <div className="flex items-center gap-2">
                <img 
                  src={item.docData?.image}
                  alt={item.docData?.name}
                  className="w-10 h-10 rounded-full object-cover border bg-indigo-50"
                />
                <p>{item.docData?.name}</p>
              </div>

              {/* Fees */}
              <p className="font-semibold">${item.amount}</p>

              {/* Actions */}
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
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
