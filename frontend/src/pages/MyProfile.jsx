import React, { useState } from "react";
// import { assets } from "../assets/assets_frontend/assets";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import axios from "axios";
import { toast } from "react-toastify";


const MyProfile = () => {
  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);

  // State for userData data
  // const [userData, setUserData] = useState({
  //   fullName: "Edward Vincent",
  //   email: "richardjameswap@gmail.com",
  //   phone: "+1 123 456 7890",
  //   address: "57th Cross, Richmond Circle, Church Road, London",
  //   gender: "Male",
  //   birthday: "2024-07-20",
  //   image: assets.profile_pic,
  // });
  const {userData , setUserData , loadUserProfileData , token, backendUrl} = React.useContext(AppContext);
  const [image , setImage] = useState(false)

  // Handle input change
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
    
  //   setUserData((prev) => ({ ...prev, [name]: value }));
  // };

  const handleChange = (e) => {
  const { name, value } = e.target;

  // Check if it's a nested field like "address.line1"
  if (name.includes(".")) {
    const [parent, child] = name.split(".");

    setUserData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: value,
      },
    }));
  } else {
    // Handle normal fields
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};


  // Toggle Edit Mode
  const handleEdit = () => setIsEditing(true);

  // Save Information
 

  const updateUserProfile = async () => {
    try{
      const formData = new FormData();
      formData.append('name' , userData.name)
      formData.append('email' , userData.email)
      formData.append('phone' , userData.phone)
      formData.append('address' , JSON.stringify(userData.address))
      formData.append('gender' , userData.gender)
      formData.append('dob' , userData.dob)
     image && formData.append('image' , image)

     const {data} = await axios.post(`${backendUrl}/api/user/update-profile` , formData , {headers: {token: token}})
     if(data.success){
      toast.success(data.message)
      await loadUserProfileData()
      setIsEditing(false)
      setImage(false)
     }else{
      toast.error(data.message)
     }
    }catch(err){
      console.log(err)
      toast.error(err.message)
    }
  }

  return userData && (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        {/* Profile Header */}
        <div className="flex flex-col   gap-6 mb-8">
          {isEditing ? (
           <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <img className="w-32 h-32 rounded border-2 border-gray-300 opacity-70 bg-indigo-50" src={image ? URL.createObjectURL(image) : userData.image } alt="" />
              <img className="absolute bottom-12 right-12 w-10" src={image ? "" : assets.upload_icon } alt="" />
            </div>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} id="image" className="hidden" />
           </label>
          ) :(<img
            src={userData.image}
            alt="Profile"
            className="w-32 h-32 rounded-xl object-cover shadow bg-indigo-50"
          />)}
          
          <div>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="text-2xl font-bold border-b border-gray-300 focus:border-blue-500 outline-none"
              />
            ) : (
              <h2 className="text-2xl font-bold text-gray-800">
                {userData.name}
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

          <div className="space-y-3 ">
            <div className="flex items-center gap-14">
              <p className="font-medium text-gray-700">Email:</p>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 focus:border-blue-500 outline-none"
                />
              ) : (
                <p className="text-blue-600">{userData.email}</p>
              )}
            </div>

            <div className="flex items-center gap-14">
              <p className="font-medium text-gray-700">Phone:</p>
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 focus:border-blue-500 outline-none"
                />
              ) : (
                <p className="text-blue-600">{userData.phone}</p>
              )}
            </div>

           <div className="flex items-center gap-14"> 
  <p className="font-medium text-gray-700">Address:</p>
  {isEditing ? (
    <div>
      <input
      name="address.line1"
      value={userData?.address?.line1 || ""}
      onChange={handleChange}
      className="w-full border-b border-gray-300 focus:border-blue-500 outline-none resize-none"
    />
    <input
      name="address.line2"
      value={userData?.address?.line2 || ""}
      onChange={handleChange}
      className="w-full border-b border-gray-300 focus:border-blue-500 outline-none resize-none"
    />
    </div>
  ) : (
    <p className="text-gray-700">
      {userData?.address
        ? `${userData.address.line1}, ${userData.address.line2}`
        : "No address available"}
    </p>
  )}
</div>

          </div>
        </div >

        {/* Basic Information */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
            Basic Information
          </h3>

          <div className="space-y-3">
            <div className="flex items-center gap-14">
              <p className="font-medium text-gray-700">Gender:</p>
              {isEditing ? (
                <select
                  name="gender"
                  value={userData.gender}
                  onChange={handleChange}
                  className="border-b border-gray-300 focus:border-blue-500 outline-none"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              ) : (
                <p className="text-gray-700">{userData.gender}</p>
              )}
            </div>

            <div className="flex items-center gap-14">
              <p className="font-medium text-gray-700">Birthday:</p>
              {isEditing ? (
                <input
                  type="date"
                  name="dob"
                  value={userData.dob}
                  onChange={handleChange}
                  className="border-b border-gray-300 focus:border-blue-500 outline-none"
                />
              ) : (
                <p className="text-gray-700">
                  {new Date(userData.dob).toLocaleDateString("en-GB", {
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
              onClick={updateUserProfile}
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
