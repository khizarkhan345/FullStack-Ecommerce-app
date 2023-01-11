import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./navBar";
import Dashboard from "./components/dashboard";
import Products from "./components/products";
import Contact from "./components/contact";
import AboutUs from "./components/aboutUs";
import Product from "./components/product";
import Checkout from "./components/Checkout/checkout";

function AppRoutes() {
  return (
    <div className="App my-2">
      <div className="container ">
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default AppRoutes;
