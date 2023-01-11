import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./navBar";
import Dashboard from "./components/Dashboard/dashboard";
import Products from "./components/Products/products";
import Contact from "./components/Contact/contact";
import AboutUs from "./components/About/aboutUs";
import Product from "./components/Products/product";
import Footer from "./components/Footer/footer";
import TopBar from "./components/TopBar/topBar";
import BottomBar from "./components/Footer/bottomBar";
import DisplayCartProducts from "./components/Cart/displayCartProducts";
import Checkout from "./components/Checkout/checkout";
import CheckoutConfirmation from "./components/Checkout/checkoutConfirmation";

function App() {
  return (
    <div className="App">
      <div>
        <BrowserRouter>
          <TopBar />
          <NavBar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/cart" element={<DisplayCartProducts />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route
              path="/checkoutConfirmation"
              element={<CheckoutConfirmation />}
            />
          </Routes>
          <Footer />
          <BottomBar />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
