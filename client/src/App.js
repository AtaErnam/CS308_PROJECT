import React, { useState, useEffect } from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CartPage from "./components/CartPage/CartPage";
import PaymentPage from "./components/PaymentPage/PaymentPage";
import Header from "./components/Layout/Header";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/cartProvider";

function App() {
  const [message, setMessage] = useState("");
  const [cartIsShown, setCartIsShown] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3008/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <ChakraProvider>
      <CartProvider>
        {cartIsShown && <Cart onClose={hideCartHandler} />}
        <Router>
          <Navbar />
          <Header onShowCart={showCartHandler} />
          <Routes>
            <Route path="/" exact element={<Products />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </CartProvider>
    </ChakraProvider>
  );
}

export default App;
