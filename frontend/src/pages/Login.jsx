import React, { useState } from "react";

const Login = () => {
  // State: determines which form to show
  const [isSignUp, setIsSignUp] = useState(true);

  // Form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      console.log("Sign Up Data:", formData);
    } else {
      console.log("Login Data:", {
        email: formData.email,
        password: formData.password,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          {isSignUp ? "Create an Account" : "Login"}
        </h2>
        <p className="text-center text-gray-600 mb-6">
          {isSignUp
            ? "Please sign up to book an appointment"
            : "Welcome back! Please login to your account"}
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Full Name (only for Sign Up) */}
          {isSignUp && (
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="fullName">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            {isSignUp ? "Create Account" : "Login"}
          </button>
        </form>

        {/* Toggle between Sign Up and Login */}
        <p className="text-center text-gray-600 mt-6">
          {isSignUp ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-600 font-semibold hover:underline"
          >
            {isSignUp ? "Login here" : "Sign up here"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
