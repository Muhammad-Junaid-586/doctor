import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DoctorContext } from "../../context/DoctorContext";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, backendUrl } = useContext(DoctorContext);
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch doctor profile
  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/profile`, {
        headers: { Authorization: `Bearer ${dToken}` },
      });
      if (data.success) {
        setProfile(data.doctorProfile);
        setFormData(data.doctorProfile);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    try {
      const { name, fees, address, available } = formData;
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/update-profile`,
        { name, fees, address, available },
        { headers: { Authorization: `Bearer ${dToken}` } }
      );

      if (data.success) {
        toast.success("Profile updated");
        setProfile({ ...profile, name, fees, address, available });
        setEditMode(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const handleCancel = () => {
    setFormData(profile);
    setEditMode(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-gray-600">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md mt-10 overflow-hidden">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start p-6 gap-6">
        {/* Left Image */}
        <div className="flex-shrink-0">
          <img
            src={profile.image || "/doctor-placeholder.png"}
            alt={profile.name}
            className="w-40 h-40 rounded-lg object-cover bg-blue-100"
          />
        </div>

        {/* Right Info */}
        <div className="flex-1 space-y-3">
          {/* Name */}
          {editMode ? (
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="text-2xl font-semibold border-b border-gray-300 focus:border-blue-500 outline-none w-full"
            />
          ) : (
            <h2 className="text-2xl font-semibold text-gray-800">
              {profile.name}
            </h2>
          )}

          <p className="text-gray-600">
            {profile.degree || "MBBS"} – {profile.speciality || "General Physician"}{" "}
            <span className="text-gray-500 text-sm ml-2">
              {profile.experience ? `${profile.experience} Years` : ""}
            </span>
          </p>

          {/* About */}
          <div>
            <p className="font-semibold text-gray-700">About:</p>
            {editMode ? (
              <textarea
                name="about"
                value={formData.about || ""}
                onChange={handleChange}
                rows={3}
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:border-blue-500 outline-none"
              />
            ) : (
              <p className="text-gray-600 leading-relaxed">
                {profile.about ||
                  "This doctor has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies."}
              </p>
            )}
          </div>

          {/* Fees */}
          <p className="text-gray-800">
            <span className="font-semibold">Appointment Fee:</span>{" "}
            {editMode ? (
              <input
                type="number"
                name="fees"
                value={formData.fees || ""}
                onChange={handleChange}
                className="border-b border-gray-300 focus:border-blue-500 outline-none w-24"
              />
            ) : (
              `$ ${profile.fees}`
            )}
          </p>

          {/* Address */}
          <div>
            <p className="font-semibold text-gray-700">Address:</p>
            {editMode ? (
              <textarea
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                rows={2}
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:border-blue-500 outline-none"
              />
            ) : (
              <p className="text-gray-600">
                {profile.address.line1 || "10 Main Road, City Name"}
              </p>
            )}
          </div>

          {/* Availability */}
          <div className="flex items-center gap-3">
            <label className="font-semibold text-gray-700">Available:</label>
            {editMode ? (
              <input
                type="checkbox"
                name="available"
                checked={formData.available || false}
                onChange={handleChange}
              />
            ) : (
              <span
                className={`font-medium ${
                  profile.available ? "text-green-600" : "text-red-500"
                }`}
              >
                {profile.available ? "Available" : "Not Available"}
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="mt-5">
            {editMode ? (
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded transition"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
