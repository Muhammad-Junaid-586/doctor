import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col sm:grid grid-cols-[3fr_1fr_1fr]  gap-8">
        
        {/* Left: Logo + Description */}
        <div>
          
            <img src={assets.logo} alt="Logo" className="w-40 mb-5" />
            
          
          <p className="w-full md:w-2/3  text-gray-600  leading-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>
        </div>

        {/* Middle: Company Links */}
        <div>
          <h3 className="text-gray-900 text-xl font-semibold mb-5">COMPANY</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li><a href="#" className="hover:text-blue-600">Home</a></li>
            <li><a href="#" className="hover:text-blue-600">About us</a></li>
            <li><a href="#" className="hover:text-blue-600">Contact us</a></li>
            <li><a href="#" className="hover:text-blue-600">Privacy policy</a></li>
          </ul>
        </div>

        {/* Right: Contact Info */}
        <div>
          <h3 className="text-gray-900 text-xl font-semibold mb-5">GET IN TOUCH</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>+1-212-456-7890</li>
            <li>junaid@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 py-4">
        <p className="text-center text-gray-500 text-sm">
          Copyright © 2024 Junaid - All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
