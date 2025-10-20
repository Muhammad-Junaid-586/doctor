import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const {speciality} = useParams();
  console.log(speciality);
  const navigate = useNavigate();
  const {doctors} = useContext(AppContext)
  const [filterDoc, setFilterDoc] = useState([]);

  // const applyFilter = ()=>{
  //   if (speciality) {
  //     setFilterDoc(doctors.filter((item) => item.speciality === speciality));
      
  //   }else{
  //     setFilterDoc(doctors);
  //   }
  // }

 useEffect(() => {
  if (speciality) {
    setFilterDoc(doctors.filter((item) => item.speciality === speciality));
  } else {
    setFilterDoc(doctors);
  }
}, [speciality, doctors]);

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col md:flex-row items-start gap-4 mt-5 overflow-x-hidden'>
          <div className='flex flex-col gap-4 text-sm text-gray-600'>
            <p onClick={()=>speciality==="General physician"? navigate("/doctors") : navigate('/doctors/General physician')} className={`w-[90vw] sm:w-auto  pl-3 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician"? "bg-indigo-100 text-black" : ""}`}>General physician</p>
            <p onClick={()=>speciality==="Gynecologist"? navigate("/doctors") : navigate('/doctors/Gynecologist')} className={`w-[90vw] sm:w-auto pl-3 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist"? "bg-indigo-100 text-black" : ""}`}>Gynecologist</p>
            <p onClick={()=>speciality==="Dermatologist"? navigate("/doctors") : navigate('/doctors/Dermatologist')} className={`w-[90vw] sm:w-auto pl-3 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist"? "bg-indigo-100 text-black" : ""}`}>Dermatologist</p>
            <p onClick={()=>speciality==="Pediatricians"? navigate("/doctors") : navigate('/doctors/Pediatricians')} className={`w-[90vw] sm:w-auto pl-3 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians"? "bg-indigo-100 text-black" : ""}`}>Pediatricians</p>
            <p onClick={()=>speciality==="Neurologist"? navigate("/doctors") : navigate('/doctors/Neurologist')} className={`w-[90vw] sm:w-auto pl-3 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist"? "bg-indigo-100 text-black" : ""}`}>Neurologist</p>
            <p onClick={()=>speciality==="Gastroenterologist"? navigate("/doctors") : navigate('/doctors/Gastroenterologist')} className={`w-[90vw] sm:w-auto px-3 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist"? "bg-indigo-100 text-black" : ""}`}>Gastroenterologist</p>
          </div>
          <div className='w-[90vw]  sm:grid mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
            {
              filterDoc.map((item, index) => (
      <div onClick={() => navigate(`/appointment/${item._id}`)}
        key={index}
        className="bg-white rounded-2xl shadow-md hover:shadow-lg hover:translate-y-[-5px] transition-shadow duration-300 overflow-hidden mb-3 sm:mb-0"
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
            <p className={`font-semibold ${item.available ? 'text-green-600' : 'text-gray-500'}`}>
  ● {item.available ? 'Available' : 'Not Available'}
</p>

            <p className="text-gray-500">⭐ 4.9</p>
          </div>
          <p className="font-bold text-gray-800">{item.name}</p>
          <p className="text-gray-600 text-sm">{item.speciality}</p>
        </div>
      </div>
    ))}
            
          </div>
      </div>
    </div>
  )
}

export default Doctors