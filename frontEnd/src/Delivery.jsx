import React, { useState, useEffect } from "react";
import logo from "./assets/logo.png";
import profilelogo from "./assets/Delivery/deliverylogo.png";

function Delivery() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [LoggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    const savedOrders = localStorage.getItem("deliveryOrders");
    if (savedOrders) setOrders(JSON.parse(savedOrders));

    const interval = setInterval(() => {
      const updatedOrders = localStorage.getItem("deliveryOrders");
      if (updatedOrders && updatedOrders !== JSON.stringify(orders)) {
        setOrders(JSON.parse(updatedOrders));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [orders]);

  const handleAccept = (id) => {
    const updated = orders.map(order =>
      order.id === id ? { ...order, status: "Accepted" } : order
    );
    setOrders(updated);
    localStorage.setItem("deliveryOrders", JSON.stringify(updated));
  };

  const handleDelivered = (id) => {
    const updated = orders.map(order =>
      order.id === id ? { ...order, status: "Delivered" } : order
    );
    setOrders(updated);
    localStorage.setItem("deliveryOrders", JSON.stringify(updated));
  };

  const handleNavigate = () => {
    window.location.href = "/deliveryprofile";
  };

  const handlelogin = () => {
    window.location.href = "/login";
  };

  const filteredOrders = orders
    .filter(order =>
      order.address.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .reverse(); // ✅ Show newest orders on top

  return (
    <>
      <header className="flex justify-between items-center bg-gray-600 h-20 px-6 shadow-md">
        <section className="flex items-center">
          <img className="h-20 w-20 mr-4" src={logo} alt="Logo" />
          <h1 className="text-white text-3xl font-bold">Foodie</h1>
        </section>

        <section>
          <input
            className="px-4 w-150 py-3 rounded-md bg-amber-50 focus:outline-none"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Location..."
          />
        </section>

        <section className="flex gap-4 items-center">
          {LoggedIn ? (
            <button onClick={handleNavigate}>
              <img className="h-15 w-15 cursor-pointer" src={profilelogo} alt="" />
            </button>
          ) : (
            <button
              onClick={handlelogin}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Login
            </button>
          )}
        </section>
      </header>

      <div className="p-6">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Delivery Orders</h1>

        <div className="overflow-x-auto">
          <div className="min-w-full bg-white rounded-lg shadow-lg">
            <div className="grid grid-cols-7 bg-gray-200 font-bold text-gray-700 p-3 rounded-t-lg">
              <span>Order ID</span>
              <span>Username</span>
              <span>Location</span>
              <span>Products</span>
              <span>Total</span>
              <span>Status</span>
              <span>Action</span>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="grid grid-cols-7 p-6 text-center bg-gray-50">
                <span className="col-span-7 text-gray-500 font-medium">
                  No orders match the search.
                </span>
              </div>
            ) : (
              filteredOrders.map(order => (
                <div
                  key={order.id}
                  className="grid grid-cols-7 items-center border-b p-4 hover:bg-gray-50 transition-all duration-200 hover:shadow-md"
                >
                  <span className="font-medium">#{order.id}</span>
                  <span className="font-medium">{order.clientName}</span>
                  <span className="text-gray-600">{order.address}</span>
                  <span>
                    {order.items.map((item, i) => (
                      <div key={i} className="text-sm text-gray-700">
                        {item.name} x {item.quantity}
                      </div>
                    ))}
                  </span>
                  <span className="font-semibold text-orange-600">₹{order.totalPrice}</span>
                  <span
                    className={`font-medium px-2 py-1 rounded w-30 ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "Accepted"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order.status}
                  </span>
                  <div className="flex gap-2">
                    {order.status === "Pending" && (
                      <button
                        onClick={() => handleAccept(order.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition"
                      >
                        Accept
                      </button>
                    )}
                    {order.status === "Accepted" && (
                      <button
                        onClick={() => handleDelivered(order.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition"
                      >
                        Delivered
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Delivery;
