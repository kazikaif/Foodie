import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaHome, FaSignOutAlt } from "react-icons/fa";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ Username: "", Email: "", Phone: "" });
useEffect(() => {
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axios.get("http://localhost:5000/clientuser", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data);
    } catch (err) {
      alert("Failed to load client profile");
    }
  };
  fetchUserData();
}, []);


  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    alert("Logout Successfully");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-500">Your Profile</h2>

        <div className="text-lg text-gray-700 space-y-4 mb-6">
          <div><strong>Username:</strong> {user.Username}</div>
          <div><strong>Email:</strong> {user.Email}</div>
          <div><strong>Phone:</strong> {user.Phone}</div>
        </div>

        <div className="flex justify-between">
          <Link to="/" className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"><FaHome /> Home</Link>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"><FaSignOutAlt /> Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
