import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaHome, FaSignOutAlt } from "react-icons/fa";

function DeliveryProfile() {
  const navigate = useNavigate();
  const [deliveryUser, setDeliveryUser] = useState({
    Username: "", Email: "", Phone: "", VehicleNumber: "", DLNumber: ""
  });

useEffect(() => {
  const fetchDeliveryData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axios.get("https://foodie-backend-hfaf.onrender.com/deliveryuser", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDeliveryUser(res.data);
    } catch (err) {
      alert("Failed to load delivery profile");
    }
  };
  fetchDeliveryData();
}, []);


  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    alert("Logout Successfully");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-500">Delivery Profile</h2>

        <div className="text-lg text-gray-700 space-y-4 mb-6">
          <div><strong>Username:</strong> {deliveryUser.Username}</div>
          <div><strong>Email:</strong> {deliveryUser.Email}</div>
          <div><strong>Phone:</strong> {deliveryUser.Phone}</div>
          <div><strong>Vehicle No.:</strong> {deliveryUser.VehicleNumber}</div>
          <div><strong>DL Number:</strong> {deliveryUser.DLNumber}</div>
        </div>

        <div className="flex justify-between">
          <Link to="/" className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"><FaHome /> Home</Link>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"><FaSignOutAlt /> Logout</button>
        </div>
      </div>
    </div>
  );
}

export default DeliveryProfile;
