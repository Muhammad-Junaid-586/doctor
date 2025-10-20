import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [dToken , setDToken] = useState(`${localStorage.getItem("dtoken") ? localStorage.getItem("dtoken"): ""}`);
  const [appointments , setAppointments] = useState([])
   const [dashboardData, setDashboardData] = useState(null);
   const [loading, setLoading] = useState(true);


  const getAppointments = async () => {
    try {
      const {data} = await axios.get(`${backendUrl}/api/doctor/appointments` , {headers: {dtoken: dToken}});
      if (data.success) {
        setAppointments(data.appointments.reverse());
        toast.success(data.message);
        console.log(data.appointments);
        
        
      }else{
        toast.error(data.message);
        
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
    }
  }

  const cancelAppoinment = async (appointmentId) => {
    try {
      // console.log(appointmentId , "appointmentId");
      const {data} = await axios.post( `${backendUrl}/api/doctor/cancel-appointment/` , {appointmentId} , {headers: {dtoken: dToken}});
      if(data.success){
        toast.success(data.message);
        getAppointments();
      }else{
        toast.error(data.message);
      }
      
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
    }
  }

  const completeAppoinment = async (appointmentId) => {
    try {
      // console.log(appointmentId , "appointmentId");
      const {data} = await axios.post( `${backendUrl}/api/doctor/complete-appointment/` , {appointmentId} , {headers: {dtoken: dToken}});
      if(data.success){
        toast.success(data.message);
        getAppointments();
      }else{
        toast.error(data.message);
      }
      
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
    }
  }

  const getDashboardData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/doctor/dashboard`, {
        headers: { Authorization: `Bearer ${dToken}` },
      });

      if (data.success) {
        setDashboardData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Dashboard Error:", error);
      toast.error("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };


  const value = {
    backendUrl,
    dToken,
    setDToken,
    getAppointments,
    appointments, setAppointments ,
    cancelAppoinment,
    completeAppoinment,
    dashboardData,
    getDashboardData,
    loading
  };
  return (
    <DoctorContext.Provider value={value}>
      
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;