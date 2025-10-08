import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Contact = () => {
  return (
   <div className="w-full py-16 px-6 md:px-20 bg-gray-50 text-gray-800">
  {/* Heading */}
  <div className="text-center mb-12">
    <p className="text-3xl font-bold tracking-wide">
      CONTACT <span className="text-blue-600">US</span>
    </p>
    <div className="w-20 h-1 bg-blue-600 mx-auto mt-2 rounded-full"></div>
  </div>

  {/* Content Section */}
  <div className="flex flex-col md:flex-row items-center gap-10">
    {/* Image */}
    <div className="flex-1">
      <img
        src={assets.contact_image}
        alt="Contact"
        className="w-full max-w-md mx-auto rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
      />
    </div>

    {/* Info Section */}
    <div className="flex-1 space-y-6">
      {/* Office Info */}
      <div>
        <p className="text-xl font-semibold text-blue-600 mb-2">Our Office</p>
        <div className="text-gray-700">
          <p>54709 Willms Station</p>
          <p>Suite 350, Washington, USA</p>
        </div>
      </div>

      {/* Contact Details */}
      <div>
        <p className="text-gray-700">
          <span className="font-semibold">Tel:</span> (415) 555-0132
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Email:</span> greatstackdev@gmail.com
        </p>
      </div>

      {/* Careers Section */}
      <div>
        <p className="text-xl font-semibold text-blue-600 mb-2 uppercase">
          Careers at <span className="text-gray-900">PRESCRIPTO</span>
        </p>
        <p className="text-gray-700 mb-4">
          Learn more about our teams and job openings.
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-full shadow hover:bg-blue-700 transition-colors duration-300">
          Explore Jobs
        </button>
      </div>
    </div>
  </div>
</div>

  )
}

export default Contact