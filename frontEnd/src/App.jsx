import { useState } from "react";
import Home from "./Home";
import Kart from "./Kart";
import Login from "./Login";
import SignUp from "./SignUp";
import Order from "./Order";
import Profile from "./Profile";
import Delivery from "./Delivery";
import Admin from "./Admin";
import Trackorder from "./Trackorder";
import Adminprofile from "./Adminprofile";
import Deliveryprofile from "./Deliveryprofile";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kart" element={<Kart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/order" element={<Order />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/deliveryprofile" element={<Deliveryprofile />} />
        <Route path="/adminprofile" element={<Adminprofile />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/trackorder" element={<Trackorder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
