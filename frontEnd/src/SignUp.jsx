import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const role = (searchParams.get("role") || "client").toLowerCase();

  const [form, setForm] = useState({
    Username: "",
    Email: "",
    Phone: "",
    Password: "",
    VehicleNumber: "",
    DLNumber: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRoleChange = (newRole) => {
    setSearchParams({ role: newRole });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      Username: form.Username.trim(),
      Email: form.Email.trim(),
      Phone: form.Phone.trim(),
      Password: form.Password.trim(),
      role: role === "delivery" ? "delivery" : "client",
      VehicleNumber: role === "delivery" ? form.VehicleNumber.trim() : "",
      DLNumber: role === "delivery" ? form.DLNumber.trim() : ""
    };

    try {
      const res = await axios.post("http://localhost:5000/signup", formattedData);
      alert(res.data);

      setForm({
        Username: "",
        Email: "",
        Phone: "",
        Password: "",
        VehicleNumber: "",
        DLNumber: ""
      });

      navigate("/login");
    } catch (err) {
      console.error("❌ Signup Error:", err);
      alert("Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-500">
          Sign Up as {role === "delivery" ? "Delivery Man" : "Client"}
        </h2>

        <div className="flex justify-between mb-6">
          <button
            onClick={() => handleRoleChange("client")}
            className={`w-1/2 px-4 py-2 rounded-l-md ${role === "client" ? "bg-orange-500 text-white" : "bg-gray-200"}`}
          >
            Client
          </button>
          <button
            onClick={() => handleRoleChange("delivery")}
            className={`w-1/2 px-4 py-2 rounded-r-md ${role === "delivery" ? "bg-orange-500 text-white" : "bg-gray-200"}`}
          >
            Delivery Man
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              name="Username"
              placeholder="Username"
              onChange={handleChange}
              value={form.Username}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="Email"
              placeholder="you@example.com"
              onChange={handleChange}
              value={form.Email}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              name="Phone"
              placeholder="e.g. 9876543210"
              onChange={handleChange}
              value={form.Phone}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              name="Password"
              placeholder="********"
              onChange={handleChange}
              value={form.Password}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {role === "delivery" && (
            <>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">Vehicle Number</label>
                <input
                  type="text"
                  name="VehicleNumber"
                  placeholder="Enter Vehicle Number"
                  onChange={handleChange}
                  value={form.VehicleNumber}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">Driving License (DL) Number</label>
                <input
                  type="text"
                  name="DLNumber"
                  placeholder="Enter DL Number"
                  onChange={handleChange}
                  value={form.DLNumber}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-semibold py-2 rounded-md hover:bg-orange-600 transition duration-200"
          >
            Sign Up as {role === "delivery" ? "Delivery Man" : "Client"}
          </button>

          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
