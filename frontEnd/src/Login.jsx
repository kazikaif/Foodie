import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ Username: "", Password: "" });
  const [role, setRole] = useState("client");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleHome = () => navigate("/");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://foodie-backend-hfaf.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Username: form.Username.trim(),
          Password: form.Password.trim(),
          role: role.toLowerCase()
        })
      });

      const data = await response.json();

      if (data.message === "Login Successfully") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", data.role);
        localStorage.setItem("token", data.token);

        if (data.role === "admin") {
          localStorage.setItem("adminData", JSON.stringify(data.admin));
          alert(`Welcome ${data.admin.Username}`);
          navigate("/admin");
        } else if (data.role === "delivery") {
          localStorage.setItem("username", data.username);
          alert(`Welcome Delivery Man ${data.username}`);
          navigate("/delivery");
        } else {
          localStorage.setItem("username", data.username);
          alert(`Welcome ${data.username}`);
          navigate("/");
        }
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      alert("Server error, please try again");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="p-5 flex justify-start">
        <button onClick={handleHome} className="text-orange-500 cursor-pointer ml-7.5 mt-5 hover:text-orange-600 text-4xl">
          <FaHome />
        </button>
      </div>

      <div className="flex justify-center items-center mt-10">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-orange-500">Login to Foodie</h2>

          <div className="flex justify-between mb-6">
            <button onClick={() => setRole("client")} className={`px-4 py-2 rounded-md w-1/4 ${role === "client" ? "bg-orange-500 text-white" : "bg-gray-200"}`}>Client</button>
            <button onClick={() => setRole("delivery")} className={`px-4 py-2 rounded-md w-1/3 ${role === "delivery" ? "bg-orange-500 text-white" : "bg-gray-200"}`}>Delivery Man</button>
            <button onClick={() => setRole("admin")} className={`px-4 py-2 rounded-md w-1/3 ${role === "admin" ? "bg-orange-500 text-white" : "bg-gray-200"}`}>Admin</button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                name="Username"
                onChange={handleChange}
                value={form.Username}
                placeholder="Username"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                name="Password"
                onChange={handleChange}
                value={form.Password}
                placeholder="********"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-semibold py-2 rounded-md hover:bg-orange-600 transition duration-200"
            >
              Login as {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>

            {(role === "client" || role === "delivery") && (
              <p className="text-sm text-center text-gray-600 mt-4">
                Don't have an account?{" "}
                <Link to={`/signup?role=${role}`} className="text-orange-500 hover:underline">
                  Sign Up
                </Link>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
