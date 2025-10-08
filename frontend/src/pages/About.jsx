import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const About = () => {
  return (
    <div className="w-full py-16 px-6 md:px-20 bg-gray-50 text-gray-800">
      {/* Heading */}
      <div className="text-center mb-12">
        <p className="text-3xl font-bold tracking-wide">
          ABOUT <span className="text-blue-600">US</span>
        </p>
        <div className="w-20 h-1 bg-blue-600 mx-auto mt-2 rounded-full"></div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row  gap-10">
        {/* Image */}
        <div className="flex-1">
          <img
            src={assets.about_image}
            alt="About"
            className="w-full max-w-md mx-auto rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Text Section */}
        <div className="flex-1 space-y-4 text-justify text-sm">
          <p>
            Welcome to <span className="font-semibold text-blue-600">Prescripto</span>, 
            your trusted partner in managing your healthcare needs conveniently and efficiently. 
            At Prescripto, we understand the challenges individuals face when it comes to scheduling 
            doctor appointments and managing their health records.
          </p>

          <p>
            Prescripto is committed to excellence in healthcare technology. We continuously strive 
            to enhance our platform, integrating the latest advancements to improve user experience 
            and deliver superior service. Whether you're booking your first appointment or managing 
            ongoing care, Prescripto is here to support you every step of the way.
          </p>

          <b className="text-lg text-gray-900 block mt-6">Our Vision</b>

          <p>
            Our vision at Prescripto is to create a seamless healthcare experience for every user. 
            We aim to bridge the gap between patients and healthcare providers, making it easier 
            for you to access the care you need, when you need it.
          </p>
        </div>
      </div>

    {/* why choose us */}
      <div className="w-full py-16 px-6 md:px-20  text-gray-800">
  {/* Heading */}
  <div className="text-center mb-12">
    <p className="text-3xl font-bold tracking-wide">
      Why <span className="text-blue-600">Choose Us</span>
    </p>
    <div className="w-20 h-1 bg-blue-600 mx-auto mt-2 rounded-full"></div>
  </div>

  {/* Features Section */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
    {/* Card 1 */}
    <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <b className="text-lg text-blue-600 block mb-2">Efficiency</b>
      <p className="text-gray-600">
        Streamlined appointment scheduling that fits into your busy lifestyle.
      </p>
    </div>

    {/* Card 2 */}
    <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <b className="text-lg text-blue-600 block mb-2">Convenience</b>
      <p className="text-gray-600">
        Access to a network of trusted healthcare professionals in your area.
      </p>
    </div>

    {/* Card 3 */}
    <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <b className="text-lg text-blue-600 block mb-2">Personalization</b>
      <p className="text-gray-600">
        Tailored recommendations and reminders to help you stay on top of your health.
      </p>
    </div>
  </div>
</div>

    </div>
  );
};

export default About;
