import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="flex bg-primary px-6 sm:px-10 md:px-16 rounded-lg my-20  gap-3">
      {/* left div */}
      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-4">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white leading-tight my-2">
          <p className="">
          Book Appointment 
          
        </p>
        <p className="mt-4">With 100+ Trusted Doctors</p>
        </div>
       
        <button onClick={() => {navigate("/login"), scrollTo(0, 0)}} className="px-6 py-3 my-4  bg-white rounded-full shadow-md  hover:scale-105 transition duration-300">
          Create Account
        </button>
      </div>

      {/* right div */}
      <div className="hidden md:block  md:w-1/2 lg:w-[370px] relative  ">
        <img
          src={assets.appointment_img}
          alt="Appointment"
          className="absolute bottom-0 right-0 max-w-sm "
        />
      </div>
    </div>
  );
};

export default Banner;
