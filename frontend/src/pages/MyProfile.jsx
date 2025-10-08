import React, { useState } from "react";
import { assets } from "../assets/assets_frontend/assets";

const MyProfile = () => {
  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);

  // State for profile data
  const [profile, setProfile] = useState({
    fullName: "Edward Vincent",
    email: "richardjameswap@gmail.com",
    phone: "+1 123 456 7890",
    address: "57th Cross, Richmond Circle, Church Road, London",
    gender: "Male",
    birthday: "2024-07-20",
    image: assets.profile_pic,
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle Edit Mode
  const handleEdit = () => setIsEditing(true);

  // Save Information
  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved Profile:", profile);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
          <img
            src={profile.image}
            alt="Profile"
            className="w-32 h-32 rounded-xl object-cover shadow"
          />
          <div>
            {isEditing ? (
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                className="text-2xl font-bold border-b border-gray-300 focus:border-blue-500 outline-none"
              />
            ) : (
              <h2 className="text-2xl font-bold text-gray-800">
                {profile.fullName}
              </h2>
            )}
          </div>
        </div>

        <hr className="mb-6" />

        {/* Contact Information */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
            Contact Information
          </h3>

          <div className="space-y-3">
            <div>
              <p className="font-medium text-gray-700">Email id:</p>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 focus:border-blue-500 outline-none"
                />
              ) : (
                <p className="text-blue-600">{profile.email}</p>
              )}
            </div>

            <div>
              <p className="font-medium text-gray-700">Phone:</p>
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 focus:border-blue-500 outline-none"
                />
              ) : (
                <p className="text-blue-600">{profile.phone}</p>
              )}
            </div>

            <div>
              <p className="font-medium text-gray-700">Address:</p>
              {isEditing ? (
                <textarea
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 focus:border-blue-500 outline-none resize-none"
                />
              ) : (
                <p className="text-gray-700">{profile.address}</p>
              )}
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
            Basic Information
          </h3>

          <div className="space-y-3">
            <div>
              <p className="font-medium text-gray-700">Gender:</p>
              {isEditing ? (
                <select
                  name="gender"
                  value={profile.gender}
                  onChange={handleChange}
                  className="border-b border-gray-300 focus:border-blue-500 outline-none"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              ) : (
                <p className="text-gray-700">{profile.gender}</p>
              )}
            </div>

            <div>
              <p className="font-medium text-gray-700">Birthday:</p>
              {isEditing ? (
                <input
                  type="date"
                  name="birthday"
                  value={profile.birthday}
                  onChange={handleChange}
                  className="border-b border-gray-300 focus:border-blue-500 outline-none"
                />
              ) : (
                <p className="text-gray-700">
                  {new Date(profile.birthday).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="px-6 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="px-6 py-2 border border-blue-600 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              Save Information
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
