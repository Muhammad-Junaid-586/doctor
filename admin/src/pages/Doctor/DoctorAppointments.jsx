import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";

const DoctorAppointments = () => {
  const {
    appointments,
    dToken,
    getAppointments,
    cancelAppoinment,
    completeAppoinment,
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl mx-auto my-5 p-4">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded-xl text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll shadow-sm">
        {/* ======= Table Header (Desktop Only) ======= */}
        <div className="hidden md:grid grid-cols-[0.5fr_3fr_1fr_1fr_3fr_3fr_1fr_2fr] border-b px-4 py-3 font-medium text-gray-700 bg-gray-100 sticky top-0">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
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
              className="border-b text-gray-700 items-center hover:bg-gray-50 transition px-4 py-3 
              md:grid md:grid-cols-[0.5fr_3fr_1fr_1fr_3fr_3fr_1fr_2fr] flex flex-col gap-2 sm:gap-3"
            >
              {/* Desktop number */}
              <p className="hidden md:block text-gray-600">{index + 1}</p>

              {/* Patient */}
              <div className="flex items-center gap-3">
                <img
                  src={item.userData?.image}
                  alt={item.userData?.name}
                  className="w-10 h-10 rounded-full object-cover border"
                />
                <p className="font-medium">{item.userData?.name}</p>
              </div>

              {/* Payment */}
              <p className="text-gray-600 border rounded-full px-2 py-0.5 text-center text-xs w-fit md:w-auto">
                {item.payment ? "ONLINE" : "CASH"}
              </p>

              {/* Age */}
              <p className="hidden md:block">{calculateAge(item.userData?.dob)}</p>

              {/* Date & Time */}
              <div>
                <p>{slotDateFormat(item.slotDate)}</p>
                <span className="text-gray-500 text-xs">{item.slotTime}</span>
              </div>

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
              <p className="font-semibold">{currency || "$"}{item.amount}</p>

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

              {/* Mobile View Extra Info */}
              <div className="md:hidden flex flex-wrap gap-2 text-xs text-gray-600 border-t pt-2 mt-2">
                <p>
                  <span className="font-medium">Age:</span>{" "}
                  {calculateAge(item.userData?.dob)}
                </p>
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {slotDateFormat(item.slotDate)}
                </p>
                <p>
                  <span className="font-medium">Time:</span> {item.slotTime}
                </p>
                <p>
                  <span className="font-medium">Fees:</span>{" "}
                  {currency || "$"}
                  {item.amount}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">
            No appointments found.
          </p>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;
