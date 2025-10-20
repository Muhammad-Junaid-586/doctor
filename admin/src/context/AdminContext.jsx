import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

  const [aToken , setAToken] = useState(localStorage.getItem("atoken")? localStorage.getItem("atoken"): "");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);

  const getAllDoctors = async ()=>{
    try {
      
      const {data} =await axios.post(`${backendUrl}/api/admin/all-doctors`,{} , {headers: {atoken: aToken}});
      if (data.success) {
        setDoctors(data.doctors);
        // toast.success(data.message);
      }else{
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
    }
  }


  const changeAvailability = async (docId) => {
    try {
      
      const {data} =await axios.post(`${backendUrl}/api/admin/change-availability`,{docId} , {headers: {atoken: aToken}});
      if (data.success) {
        toast.success(data.message);
        getAllDoctors()
      }else{
        toast.error(data.message);
      }

    } catch (error) {
       console.log(error);
      toast.error(error.message);
      
    }
  }

  const getAllAppointments = async () => {
    try {
      const {data} = await axios.get(backendUrl + "/api/admin/appointments" , {headers: {atoken: aToken}});
      if (data.success) {
        setAppointments(data.appointments);
        
      }else{
        toast.error(data.message);
      }
      
    } catch (error) {
      toast.error(error.message);
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const {data} = await axios.post(backendUrl + "/api/admin/cancel-appointment" , {appointmentId} , {headers: {atoken: aToken}});  
      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
        fetchDashboardData()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

   const fetchDashboardData = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, {
          headers: { atoken: aToken },
        });
        if (data.success) {
          setDashboardData(data.dashData);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load dashboard data");
      }
    };

  

  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    setDoctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    setAppointments,
    getAllAppointments,
    cancelAppointment,
    dashboardData,
    fetchDashboardData
  };
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;