import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div className="px-6 md:px-16 py-10">
      <p className="text-2xl font-semibold mb-8">
        My <span className="text-blue-600">Appointments</span>
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {doctors.slice(0, 4).map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center justify-between gap-5 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
          >
            {/* Doctor Image */}
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-blue-500 bg-indigo-50 flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Doctor Info */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-lg font-semibold text-gray-800">{item.name}</p>
              <p className="text-sm text-blue-600 font-medium mb-2">
                {item.speciality}
              </p>

              <div className="text-gray-600 text-sm space-y-1">
                <p className="font-medium">Address:</p>
                <p>{item.address.line1}</p>
                <p>{item.address.line2}</p>
              </div>

              <p className="mt-3 text-sm text-gray-700">
                <span className="font-semibold text-blue-600">
                  Date & Time:
                </span>{" "}
                25, July, 2024 | 8:30 PM
              </p>
           

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-2">
              <button className="bg-blue-600 text-white text-sm font-medium px-2 py-2 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-sm">
                Pay Online
              </button>
              <button className="border border-red-500 text-red-500 text-sm font-medium px-2 py-2 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm">
                Cancel Appointment
              </button>
            </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
