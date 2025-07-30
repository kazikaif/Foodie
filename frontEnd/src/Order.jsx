import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Order() {
  const [isOrdered, setIsOrdered] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("cartItems");
    if (saved) {
      setCartItems(JSON.parse(saved));
    }
  }, []);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    if (!address.trim()) {
      alert("Please enter your delivery address!");
      return;
    }

    const username = localStorage.getItem("username") || "Guest";

    const orderData = {
      id: Date.now(),
      clientName: username,
      address,
      totalPrice,
      items: cartItems,
      status: "Pending"
    };

    let existingOrders = JSON.parse(localStorage.getItem("deliveryOrders")) || [];
    existingOrders.push(orderData);
    localStorage.setItem("deliveryOrders", JSON.stringify(existingOrders));

    setIsOrdered(true);
    localStorage.removeItem("cartItems");
  };

  useEffect(() => {
    if (isOrdered && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (isOrdered && countdown === 0) {
      navigate("/");
    }
  }, [isOrdered, countdown, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        {!isOrdered ? (
          <>
            <h1 className="text-3xl font-bold text-orange-500 mb-4">
              Confirm Your Order
            </h1>
            <p className="text-gray-700 mb-4">
              Please enter your delivery address and confirm to place your order.
            </p>

            <input
              type="text"
              placeholder="Enter delivery address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <p className="text-xl font-semibold text-orange-600 mb-6">
              Total Amount: ₹{totalPrice}
            </p>
            <button
              onClick={handlePlaceOrder}
              className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded text-lg font-semibold w-full"
            >
              Place Order
            </button>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-green-600 mb-6">
              Order Placed!
            </h1>
            <p className="text-gray-700 mb-4">
              Thank you for your order. Your food will be delivered shortly!
            </p>
            <p className="text-sm text-gray-500">
              Redirecting to home in {countdown}...
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Order;
