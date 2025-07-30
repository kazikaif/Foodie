import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import axios from "axios";

function Adminprofile() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({ Username: "", Email: "", Phone: "" });

useEffect(() => {
  const fetchAdminData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axios.get("http://localhost:5000/adminuser", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAdmin(res.data);
    } catch (err) {
      alert("Failed to load admin profile");
    }
  };
  fetchAdminData();
}, []);


  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    alert("Logout Successfully");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-500">
          Admin Profile
        </h2>

        <div className="text-lg text-gray-700 space-y-4 mb-6">
          <div><strong>Username:</strong> {admin.Username}</div>
          <div><strong>Email:</strong> {admin.Email}</div>
          <div><strong>Phone:</strong> {admin.Phone}</div>
        </div>

        <div className="flex justify-between">
          <Link
            to="/admin"
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            <FaHome /> Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Adminprofile;
