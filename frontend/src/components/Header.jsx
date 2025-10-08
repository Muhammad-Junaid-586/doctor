import React from 'react'
import { assets } from '../assets/assets_frontend/assets';

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary px-6 md:px-10 lg:px-16 rounded-lg'>
      {/* left side */}
      <div className='md:w-1/2 flex flex-col justify-center items-start gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px] '>
<p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight '>Book Appointment <br /> with trusted doctors</p>
<div className='flex flex-col md:flex-row items-center gap-3 text-white font-light text-sm'>
  <img className='w-28' src={assets.group_profiles} alt="" />
  <p>Simply browse through our extensive list of trusted doctors,
    {/* <br  className='hidden sm:block'/> */}
schedule your appointment hassle-free.</p>
</div>
<a className='flex items-center gap-2 bg-white text-gray-600 px-8 py-3 font-semibold text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300 rounded-full ' href="#speciality">
  Book Appointment
  <img className='w-3' src={assets.arrow_icon} alt="" />
</a>

      </div>
      {/* right side */}
      <div className='md:w-1/2 relative'>
        <img className='w-full md:absolute bottom-0 rounded-lg h-auto' src={assets.header_img} alt="" />
      </div>
    </div>
  )
}

export default Header;