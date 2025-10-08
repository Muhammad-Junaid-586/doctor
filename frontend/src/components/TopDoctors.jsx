import React, { useContext } from 'react'
// import { doctors } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom';
import {AppContext} from '../context/AppContext';

const TopDoctors = () => {
  const navigate = useNavigate();
  const {doctors} = useContext(AppContext)
  return (
   <div className="max-w-6xl mx-auto px-4 py-12">
  <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
    Top Doctors to Book
  </h1>
  <p className="text-gray-600 text-center mt-2 mb-8">
    Simply browse through our extensive list of trusted doctors.
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
    {doctors.slice(0, 10).map((item, index) => (
      <div onClick={() => {navigate(`/appointment/${item._id}`), scrollTo(0, 0)}}
        key={index}
        className="bg-white rounded-2xl shadow-md hover:shadow-lg hover:translate-y-[-5px] transition-shadow duration-300 overflow-hidden"
      >
        {/* Doctor Image */}
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover object-top bg-blue-50"
        />

        {/* Info Section */}
        <div className="p-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <p className="text-green-600 font-semibold">● Available</p>
            <p className="text-gray-500">⭐ 4.9</p>
          </div>
          <p className="font-bold text-gray-800">{item.name}</p>
          <p className="text-gray-600 text-sm">{item.speciality}</p>
        </div>
      </div>
    ))}
  </div>

  {/* More Button */}
  <div onClick={() =>{ navigate('/doctors'), scrollTo(0, 0)}} className="flex justify-center mt-10">
    <button className="px-6 py-2 rounded-full bg-blue-50 text-gray-800 font-medium shadow hover:bg-blue-100 hover:text-gray-950 transition-colors duration-300">
      More
    </button>
  </div>
</div>

  )
}

export default TopDoctors