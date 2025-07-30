import React, { useState, useEffect } from "react";
import Adminlogo from './assets/Admin/admin.png';
 
function Admin() {
  const [activeSection, setActiveSection] = useState(localStorage.getItem("adminSection") || "users");
  const [users, setUsers] = useState([]);
  const [deliveryMen, setDeliveryMen] = useState([]);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role !== "admin") {
      alert("Access Denied: Admin Only");
      window.location.href = "/login";
      return;
    }
    fetchUsers();
    fetchDeliveryMen();
    const interval = setInterval(checkUpdates, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem("adminSection", activeSection);
  }, [activeSection]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("https://foodie-backend-hfaf.onrender.com/getAllUsers", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.status === 403) {
        handleLogout();
        return;
      }
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch Users Error:", err);
    }
  };

  const fetchDeliveryMen = async () => {
    try {
      const res = await fetch("http://localhost:5000/getAllDelivery", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.status === 403) {
        handleLogout();
        return;
      }
      const data = await res.json();
      setDeliveryMen(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch Delivery Error:", err);
    }
  };

  const checkUpdates = () => {
    fetchUsers();
    fetchDeliveryMen();
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await fetch(`http://localhost:5000/deleteUser/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
    }
  };

  const deleteDelivery = async (id) => {
    if (window.confirm("Are you sure you want to delete this delivery man?")) {
      await fetch(`http://localhost:5000/deleteDelivery/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchDeliveryMen();
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
    alert("Session expired or unauthorized. Please login again.");
  };

  const handleProfileClick = () => {
    window.location.href = "/adminprofile";
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-center items-center mb-6 relative">
  <h1 className="text-3xl font-bold text-orange-600">Admin Dashboard</h1>
  <button
    onClick={handleProfileClick}
    className="absolute right-0 rounded-full"
  >
    <img src={Adminlogo} alt="Profile" className="w-13 h-13 rounded-full cursor-pointer" />
  </button>
</div>


      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setActiveSection("users")}
          className={`px-4 py-2 rounded-lg cursor-pointer font-semibold ${
            activeSection === "users" ? "bg-orange-500 text-white" : "bg-gray-200"
          }`}
        >
          Users
        </button>
        <button
          onClick={() => setActiveSection("delivery")}
          className={`px-4 py-2 rounded-lg cursor-pointer font-semibold ${
            activeSection === "delivery" ? "bg-orange-500 text-white" : "bg-gray-200"
          }`}
        >
          Delivery Men
        </button>
      </div>

      {activeSection === "users" && (
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4 text-orange-500">All Users</h2>
          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Username</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Phone</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-100">
                    <td className="p-2 border">{user.Username}</td>
                    <td className="p-2 border">{user.Email}</td>
                    <td className="p-2 border">{user.Phone}</td>
                    <td className="p-2 border text-center">
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeSection === "delivery" && (
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4 text-orange-500">All Delivery Men</h2>
          {deliveryMen.length === 0 ? (
            <p>No delivery men found.</p>
          ) : (
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Username</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Phone</th>
                  <th className="p-2 border">Vehicle No.</th>
                  <th className="p-2 border">DL Number</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {deliveryMen.map((dm) => (
                  <tr key={dm._id} className="hover:bg-gray-100">
                    <td className="p-2 border">{dm.Username}</td>
                    <td className="p-2 border">{dm.Email}</td>
                    <td className="p-2 border">{dm.Phone}</td>
                    <td className="p-2 border">{dm.VehicleNumber}</td>
                    <td className="p-2 border">{dm.DLNumber}</td>
                    <td className="p-2 border text-center">
                      <button
                        onClick={() => deleteDelivery(dm._id)}
                        className="bg-red-500 cursor-pointer text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default Admin;
