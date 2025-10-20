import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { doctors , backendUrl , token , getDoctorsData } = useContext(AppContext);
  const [appointments , setAppointments] = React.useState([])
  const months = [ "",
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const slotDateFormat = (slotDate) => {
  const slotDataArray = slotDate.split("-");
  return `${slotDataArray[2]} ${months[parseInt(slotDataArray[1]) ]} ${slotDataArray[0]}`
};


  const getUserAppointments = async () => {
    try {
     const {data} = await axios.get( `${backendUrl}/api/user/appointments` , {headers: {token: token}});

     if(data.success){
      setAppointments(data.appointments.reverse())
      console.log(data.appointments);
      
     }else{
      console.log(data.message , "data");
      
     }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }


  const cancelAppoinment = async (appointmentId) => {
    try {
      // console.log(appointmentId , "appointmentId");
      const {data} = await axios.post( `${backendUrl}/api/user/cancel-appointment/` , {appointmentId} , {headers: {token: token}});
      if(data.success){
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      }else{
        toast.error(data.message);
      }
      
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
    }
  }



  React.useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token])
  return (
    <div className="px-6 md:px-16 py-10">
      <p className="text-2xl font-semibold mb-8">
        My <span className="text-blue-600">Appointments</span>
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center justify-between gap-5 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
          >
            {/* Doctor Image */}
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-blue-500 bg-indigo-50 flex-shrink-0">
              <img
                src={item.docData.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Doctor Info */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-lg font-semibold text-gray-800">{item.docData.name}</p>
              <p className="text-sm text-blue-600 font-medium mb-2">
                {item.docData.speciality}
              </p>

              <div className="text-gray-600 text-sm space-y-1">
                <p className="font-medium">Address:</p>
                <p>{item.docData.address.line1}</p>
                <p>{item.docData.address.line2}</p>
              </div>

              <p className="mt-3 text-sm text-gray-700">
                <span className="font-semibold text-blue-600">
                  Date & Time:
                </span>{" "}
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
           

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-2">
             {!item.cancelled && !item.isCompleted &&  <button className="bg-blue-600 text-white text-sm font-medium px-2 py-2 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-sm">
                Pay Online
              </button>}
              {!item.cancelled && !item.isCompleted && <button onClick={() => cancelAppoinment(item._id)} className="bg-red-600 text-white text-sm font-medium px-2 py-2 rounded-full hover:bg-red-700 transition-all duration-300 shadow-sm">Cancel Appointment</button>}
              {item.cancelled && !item.isCompleted && <button className="bg-blue-600 text-white text-sm font-medium px-2 py-2 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-sm">Appointment Cancelled</button>}
              {item.isCompleted && <button className="bg-green-600 text-white text-sm font-medium px-2 py-2 rounded-full hover:bg-green-700 transition-all duration-300 shadow-sm">Completed</button>}
            </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
