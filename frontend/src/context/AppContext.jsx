import { createContext, useEffect, useState } from "react";
// import { doctors } from "../assets/assets_frontend/assets";
import axios from "axios";
import { toast } from "react-toastify";



// create context
export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  // const backendUrl = "http://localhost:5000";
  const [doctors, setDoctors] = useState([]);
  const [token , setToken] = useState(`${localStorage.getItem("token") ? localStorage.getItem("token"): ""}`);
  const [userData , setUserData] = useState(false);


  const getDoctorsData = async () => {
    try {

      const { data } = await axios.get(`${backendUrl}/api/doctor/list`  );
      if (data.success) {
        setDoctors(data.doctors);
        // toast.success(data.message);
      } else {
        console.log(data.message);
        
        toast.error(data.message);
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
    }
    
  }

  const loadUserProfileData = async () => {
    try {

      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {headers: {token: token}}  );
      if (data.success) {
        setUserData(data.user);
        // toast.success(data.message);
      } else {
        console.log(data.message);
        
        toast.error(data.message);
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
    }
    
  }

  useEffect(()=>{
    getDoctorsData();
  },[])

  useEffect(()=>{
    if(token){
      loadUserProfileData();
    }else{
      setUserData(false);
    }
  },[token])


  const value = {
    doctors, getDoctorsData,
    currencySymbol,
    token, setToken,
    backendUrl,
    userData, setUserData, 
    loadUserProfileData
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
