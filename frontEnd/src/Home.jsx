import "./App.css";
import foodItems from "./Fooditems";
import React, { useState, useEffect } from "react";
import profilelogo from "./assets/profilelogo.png";
import logo from "./assets/logo.png";
import poster from "./assets/poster.png";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Home() {
  const [LoggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/profile");
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const userRole = localStorage.getItem("role");
    if (loggedIn === "true") {
      setLoggedIn(true);
      setRole(userRole || "");
    }
    if (localStorage.getItem("orderPlaced") === "true") {
      setOrderPlaced(true);
    }
  }, []);

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (item) => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn !== "true") {
      alert("Please login to add items to the cart!");
      navigate("/login");
      return;
    }

    setCartItems((prev) => {
      const existingItem = prev.find((p) => p.name === item.name);
      if (existingItem) {
        return prev.map((p) =>
          p.name === item.name && p.quantity < 5
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const increment = (itemName) => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn !== "true") {
      alert("Please login to modify the cart!");
      navigate("/login");
      return;
    }

    setCartItems((prev) =>
      prev.map((p) =>
        p.name === itemName && p.quantity < 5
          ? { ...p, quantity: p.quantity + 1 }
          : p
      )
    );
  };

  const decrement = (itemName) => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn !== "true") {
      alert("Please login to modify the cart!");
      navigate("/login");
      return;
    }

    setCartItems((prev) =>
      prev
        .map((p) =>
          p.name === itemName ? { ...p, quantity: p.quantity - 1 } : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  const [selectedCategory, setSelectedCategory] = useState(() => {
    return localStorage.getItem("selectedCategory") || "All";
  });

  const handlekart = () => {
    navigate("/kart");
  };

  const handlelogin = () => {
    navigate("/login");
  };

  const handleTrackOrder = () => {
    navigate("/trackorder");
  };

  const [searchTerm, setSearchTerm] = useState(() => {
    return localStorage.getItem("searchTerm") || "";
  });

  const categoryFilterItems =
    selectedCategory === "All"
      ? foodItems
      : foodItems.filter((i) => i.category === selectedCategory);

  const searchFilterItems = categoryFilterItems.filter((i) => {
    const term = searchTerm.toLowerCase();
    return (
      i.name.toLowerCase().includes(term) ||
      i.restaurant.toLowerCase().includes(term) ||
      i.location.toLowerCase().includes(term)
    );
  });

  return (
    <>
      <header className="flex justify-between items-center bg-gray-600 h-20 px-6 shadow-md">
        <section className="flex items-center">
          <img className="h-20 w-20 ml-4" src={logo} alt="Logo" />
          <h1 className="text-amber-200 text-3xl font-bold">Foodie</h1>
        </section>

        <section>
          <input
            className="px-4 w-150 py-3 rounded-md bg-amber-50 focus:outline-none"
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              localStorage.setItem("searchTerm", e.target.value);
            }}
            placeholder="Search for Restaurant or Location..."
          />
        </section>

        <section className="flex gap-4 items-center">
          {LoggedIn && role === "client" && orderPlaced && (
            <button
              onClick={handleTrackOrder}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              Track Order
            </button>
          )}

          <button
            onClick={handlekart}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FaShoppingCart />
            Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
          </button>

          {LoggedIn ? (
            <button onClick={handleNavigate}>
              <img
                className="h-15 w-15 cursor-pointer"
                src={profilelogo}
                alt=""
              />
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

      <main>
        <div className="relative">
          <img
            className="w-full max-h-[300px] object-cover"
            src={poster}
            alt="Main Banner"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-white/20"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold text-center">
            Order Delicious Food From Foodie
          </div>
        </div>

        <div className="items">
          <div className="sidebar">
            <ul>
              {["All", "Breakfast", "Lunch", "Desert", "Dinner"].map((cat) => (
                <li key={cat}>
                  <button
                    className={`menu cursor-pointer px-4 py-2 hover:bg-orange-500 rounded w-full text-left ${
                      selectedCategory === cat
                        ? "bg-orange-500 text-white"
                        : "bg-white text-black"
                    }`}
                    onClick={() => {
                      setSelectedCategory(cat);
                      localStorage.setItem("selectedCategory", cat);
                    }}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mainbar">
            {searchFilterItems.map((data, i) => {
              const inCart = cartItems.find((c) => c.name === data.name);
              return (
                <section key={i} className="food-card">
                  <img
                    src={data.image}
                    alt={data.name}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h2 className="text-2xl font-semibold mb-2">{data.name}</h2>
                  <h3>₹{data.price}</h3>
                  <h4 className="text-gray-600 mb-4">{data.restaurant}</h4>
                  <h4 className="text-gray-600">📍{data.location}</h4>
                  <section className="flex justify-center gap-4">
                    {inCart ? (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => decrement(data.name)}
                          className="bg-orange-500 text-white px-3 py-1 rounded"
                        >
                          -
                        </button>
                        <span className="text-xl font-bold">
                          {inCart.quantity}
                        </span>
                        <button
                          onClick={() => increment(data.name)}
                          className="bg-orange-500 text-white px-3 py-1 rounded"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(data)}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      >
                        Add to Cart
                      </button>
                    )}
                  </section>
                </section>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
