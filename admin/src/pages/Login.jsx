import React, { useState, useContext } from "react";
import { assets } from "../assets/assets_admin/assets";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", { state, email, password });

    try {
      if (state === "Admin") {
        // Admin login
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          toast.success("Admin login successful!");
        } else {
          toast.error(data.message);
        }
      } else {
        // Doctor login
        const { data } = await axios.post(`${backendUrl}/api/doctor/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          toast.success("Doctor login successful!");
          console.log(data.token);
          
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log("Error caught:", error.message);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <form
      className="min-h-[80vh] flex items-center justify-center bg-gray-50"
      onSubmit={onSubmitHandler}
    >
      <div className="flex flex-col gap-4 m-auto bg-white shadow-lg rounded-2xl p-8 w-[90%] max-w-sm border border-gray-200">
        {/* Header */}
        <p className="text-center text-2xl font-semibold text-gray-800">
          <span className="text-indigo-600">{state}</span> Login
        </p>

        {/* Email Field */}
        <div>
          <p className="text-gray-700 mb-1 font-medium">Email</p>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Password Field */}
        <div>
          <p className="text-gray-700 mb-1 font-medium">Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            placeholder="Enter your password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-2 mt-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-200"
        >
          Login
        </button>

        {/* Toggle Login Type */}
        <div className="text-center mt-4 text-gray-600 text-sm">
          {state === "Admin" ? (
            <p>
              Doctor Login?{" "}
              <span
                className="text-indigo-600 font-medium cursor-pointer hover:underline hover:text-indigo-700"
                onClick={() => setState("Doctor")}
              >
                Click here
              </span>
            </p>
          ) : (
            <p>
              Admin Login?{" "}
              <span
                className="text-indigo-600 font-medium cursor-pointer hover:underline hover:text-indigo-700"
                onClick={() => setState("Admin")}
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

export default Login;
