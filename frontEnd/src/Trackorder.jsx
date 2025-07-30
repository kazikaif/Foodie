import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

function Trackorder() {
  const navigate = useNavigate();
  const [userOrders, setUserOrders] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const loadOrders = () => {
      const savedOrders = localStorage.getItem("deliveryOrders");
      if (savedOrders) {
        const allOrders = JSON.parse(savedOrders);
        const myOrders = allOrders.filter(
          (order) => order.clientName === username
        );
        setUserOrders(myOrders.reverse()); // ✅ Reverse order list
      }
    };

    loadOrders();

    const interval = setInterval(() => {
      loadOrders();
    }, 3000);

    return () => clearInterval(interval);
  }, [username]);

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="p-4">
        <button
          onClick={handleHome}
          className="text-orange-500 cursor-pointer hover:text-orange-600 text-4xl"
        >
          <FaHome />
        </button>
      </div>

      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-orange-500">
          Track Your Order
        </h2>

        {userOrders.length === 0 ? (
          <p className="text-gray-600">No orders found.</p>
        ) : (
          userOrders.map((order, i) => (
            <div key={i} className="border rounded p-4 mb-4">
              <h3 className="font-bold text-lg mb-2">
                Order #{order.id}{" "}
                <span
                  className={`ml-2 px-2 py-1 rounded text-sm ${
                    order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "Accepted"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {order.status}
                </span>
              </h3>
              <ul className="divide-y divide-gray-200">
                {order.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center py-2"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h4 className="text-lg font-semibold">{item.name}</h4>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm text-gray-500">
                          Price: ₹{item.price}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-orange-600">
                      ₹{item.price * item.quantity}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-2 font-semibold">
                Total: ₹{order.totalPrice}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Trackorder;
