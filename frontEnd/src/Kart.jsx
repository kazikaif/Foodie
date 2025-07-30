import "./App.css";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useState, useEffect } from "react";

function Kart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("cartItems");
    if (saved) {
      setCartItems(JSON.parse(saved));
    }
  }, []);

  const handleOrder = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }
    localStorage.setItem("orderPlaced", "true"); // ✅ Save flag when order is placed
    navigate("/order");
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleRemove = (name) => {
    const updatedCart = cartItems.filter((item) => item.name !== name);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      <div className="bg-gray-100 shadow-md p-4 flex justify-start">
        <button
          onClick={handleHome}
          className="text-orange-500 cursor-pointer ml-5.5 mt-5 hover:text-orange-600 text-4xl"
        >
          <FaHome />
        </button>
      </div>

      <div className="kt min-h-screen p-6 bg-gray-100">
        <div className="kartdiv max-w-3xl mx-auto bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-orange-500">Your Cart</h2>

          {cartItems.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <>
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center py-4 gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <div>
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <p className="text-gray-600">{item.restaurant}</p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm text-gray-500">
                          Price: ₹{item.price}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <p className="text-orange-600 font-bold text-lg">
                        ₹{item.price * item.quantity}
                      </p>
                      <button
                        onClick={() => handleRemove(item.name)}
                        className="text-red-500 text-sm hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex justify-between font-bold text-xl border-t pt-4">
                <span>Total Amount:</span>
                <span className="text-orange-600">₹{totalPrice}</span>
              </div>

              <button
                onClick={handleOrder}
                className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded text-lg font-semibold"
              >
                Order Now
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Kart;
