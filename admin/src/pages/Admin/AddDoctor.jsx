import React, { useState } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    speciality: "General physician",
    education: "",
    address1: "",
    address2: "",
    experience: "1 year",
    fees: "",
    about: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const {backendUrl, aToken} = useContext(AdminContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.image) {
        toast.error("Please upload an image");
      }
      const frmData = new FormData();
      frmData.append("name", formData.name);
      frmData.append("email", formData.email);
      frmData.append("password", formData.password);
      frmData.append("speciality", formData.speciality);
      frmData.append("degree", formData.education);
      frmData.append("address", JSON.stringify({line1: formData.address1, line2: formData.address2}));
      frmData.append("experience", formData.experience);
      frmData.append("fees", Number(formData.fees));
      frmData.append("about", formData.about);
      frmData.append("image", formData.image);

      frmData.forEach((value, key) => {
        console.log(key, value);
      });

      const {data} =await axios.post(`${backendUrl}/api/admin/add-doctor`, frmData, {headers: {atoken: aToken}});
      
      if (data.success) {
        toast.success(data.message);
        // setFormData({
        //   name: "",
        //   email: "",
        //   password: "",
        //   speciality: "General physician",
        //   education: "",
        //   address1: "",
        //   address2: "",
        //   experience: "1 year",
        //   fees: "",
        //   about: "",
        //   image: null,
        // });
      }else{
        toast.error(data.message);
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
    }
    console.log("Doctor Data:", formData);
    // You can integrate with backend API here
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-md max-h-[80vh] overflow-y-scroll">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Upload Photo */}
        <div className="flex gap-2 items-center">
         <label
            htmlFor="image"
            className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer"
          >
            {formData.image ? (
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Doctor"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <img src={assets.upload_area} alt="" />
            )}
          </label>
           
         
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
          <p className="text-gray-600">Upload Doctor <br /> Picture</p>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-600 mb-1">Doctor name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Speciality</label>
            <select
              name="speciality"
              value={formData.speciality}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            >
              <option>General physician</option>
              <option>Cardiologist</option>
              <option>Dermatologist</option>
              <option>Gynecologist</option>
              <option>Neurologist</option>
              <option>Pediatrician</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Doctor Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Education</label>
            <input
              type="text"
              name="education"
              placeholder="Education"
              value={formData.education}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Doctor Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Address</label>
            <input
              type="text"
              name="address1"
              placeholder="Address 1"
              value={formData.address1}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mb-2"
            />
            <input
              type="text"
              name="address2"
              placeholder="Address 2"
              value={formData.address2}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Experience</label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            >
              <option value="">Experience</option>
              <option>1 years</option>
              <option>2 years</option>
              <option>3 years</option>
              <option>4 years</option>
              <option>5 years</option>
              <option>6 years</option>
              <option>7 years</option>
              <option>8 years</option>
              <option>9 years</option>
              <option>10+ years</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Fees</label>
            <input
              type="number"
              name="fees"
              placeholder="Your fees"
              value={formData.fees}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>
        </div>

        {/* About */}
        <div>
          <label className="block text-gray-600 mb-1">About me</label>
          <textarea
            name="about"
            rows="4"
            placeholder="Write about yourself"
            value={formData.about}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full shadow-md transition"
        >
          Add doctor
        </button>
      </form>
    </div>
  );
};

export default AddDoctor;
