import React from 'react'
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { useEffect } from 'react';


const DoctorsList = () => {
  const {aToken , doctors ,getAllDoctors , changeAvailability} = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);
  return (
   <div className="p-6 w-full max-h-[80vh] overflow-y-scroll">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">All Doctors</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col items-center text-center border border-gray-100"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-28 h-28 object-cover rounded-full mb-4 border-2 border-indigo-500"
            />
            <div>
              <p className="text-lg font-semibold text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-500 mb-3">{item.speciality}</p>
              <div className="flex items-center justify-center gap-2">
                <input
                onChange={()=>changeAvailability(item._id)}
                  type="checkbox"
                  checked={item.available}
                  
                  className="w-4 h-4 accent-indigo-600"
                />
                <p className="text-gray-700 text-sm">Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList