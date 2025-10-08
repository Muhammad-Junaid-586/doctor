import React, {  useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';
import RelatedDoctors from '../components/RelatedDoctors';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState({});
  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];


  const [docSlot , setDocSlot] = useState([]);
  const [slotIndex , setSlotIndex] = useState(0);
  const [slotTime , setSlotTime] = useState('');

  useEffect(() => {
    const fetchDocInfo = async () => {
      const doc = doctors.find((item) => item._id === docId);
      setDocInfo(doc);
    };
    fetchDocInfo();
  }, [docId, doctors]);

  useEffect(() => {
    const getAvailableSlots = async () => {
      setDocSlot([]);
      // getting current date
      let today = new Date();

      for (let i = 0; i < 7; i++) {
        // getting currentDate with index
        let currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);

        // setting end time of the date with index
        let endTime = new Date(currentDate);
        endTime.setDate(currentDate.getDate() + i);
        endTime.setHours(21, 0, 0, 0);

        // setting hours
        if (today.getDate() === currentDate.getDate()) {
          currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
          currentDate.setMinutes(currentDate.getMinutes()>30 ? 30 : 0);
        }else{
          currentDate.setHours(10);
          currentDate.setMinutes(0);
        }

        let timeSlots = [];

        while (currentDate < endTime) {
          let formattedTime = currentDate.toLocaleTimeString([], {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
});

          // add slot to an array
          timeSlots.push(
            {
              dateTime : new Date(currentDate),
              time : formattedTime,

            }
          );

          // increment current time by 30 minutes
          currentDate.setMinutes(currentDate.getMinutes() + 30);

          
        }
        setDocSlot((prevSlots) => [...prevSlots, timeSlots]);
    }
  }
    getAvailableSlots();
    
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlot);
    
  }, [docSlot]);


  return docInfo && (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* Doctor Image */}
        <div className="md:col-span-1 flex justify-center bg-blue-500 rounded-2xl">
          <img 
            src={docInfo.image} 
            alt={docInfo.name} 
            className="w-full sm:max-w-72 object-cover rounded-2xl shadow-md"
          />
        </div>

        {/* Doctor Details */}
        <div className="md:col-span-2">
          <div className="  border border-gray-400 rounded-2xl p-6">
          {/* Name & Verified */}
          <div>
            <p className="text-2xl font-semibold flex items-center gap-2">
              {docInfo.name}
              <img src={assets.verified_icon} alt="verified" className="w-5 h-5" />
            </p>
          </div>

          {/* Degree & Experience */}
          <div className="flex items-center gap-4 flex-wrap">
            <p className="text-gray-700 text-lg">
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="px-4 py-1 bg-blue-100 text-blue-600 text-sm rounded-full">
              {docInfo.experience} 
            </button>
          </div>

          {/* About Section */}
          <div className=" pt-4">
            <p className="text-lg font-medium flex items-center gap-2 mb-2">
              About <img src={assets.info_icon} alt="info" className="w-4 h-4" />
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              {docInfo.about}
            </p>
          </div>
          <p>
            Appointment fee : <span>{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>

      

      <div className="mt-8">
        <p className="text-2xl font-semibold flex items-center gap-2">
          Available Slots
          <img src={assets.clock_icon} alt="clock" className="w-5 h-5" />
        </p>
        <div className="mt-4 flex gap-2 text-center overflow-x-scroll">
          {docSlot.length && docSlot.map((item , index) => (
            <div 
              key={index}
              onClick={() => {
                setSlotIndex(index);
                setSlotTime(item.time);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium ${index === slotIndex ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'}`}
            >
              <p>{item[0] && weekDays[item[0].dateTime.getDay()]}</p>
              <p>{item[0] && item[0].dateTime.getDate()}</p>
            </div>
          ))}
              
    </div>

    <div className='flex gap-2 mt-4 overflow-x-scroll'>
      {docSlot.length && docSlot[slotIndex] && docSlot[slotIndex].map((item , index) => (
        <p key={index}
          
          onClick={() => {
            
            setSlotTime(item.time);
          }}
          className={`px-5 flex-shrink-0 py-2 rounded-full text-sm font-medium cursor-pointer ${item.time === slotTime ? 'bg-blue-600 text-white' : 'text-gray-400 border border-gray-400'}`}
        >
          {item.time.toLowerCase()}
        </p>
      ))}
    
         
    </div>

       <button className='px-6 py-3 my-4 bg-blue-600 text-white rounded-full shadow-md hover:scale-105 transition duration-300'>Book an Appointment</button>
    {/* ================ */}
      </div>
     
        </div>

      
    </div>
       {/* listing related doc */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
    </div>
  );
};

export default Appointment;
