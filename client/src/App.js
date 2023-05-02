import React, { useState, useEffect } from "react";
import "./App.css";
import { ChakraProvider } from '@chakra-ui/react'
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartPage from "./components/CartPage/CartPage"
import ProductsPage from "./components/ProductsPage/ProductsPage"

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3008/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <ChakraProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" exact element={<ProductsPage/>} />
          {/* <Route path="/signin" component={Signin} /> */}
          {/* <Route path="/signup" component={Signup} /> */}
          <Route path="/cart" element={<CartPage/>} />
        </Routes>
      </Router>
      <div className="App">
        <h1>{message}</h1>
      </div>
    </ChakraProvider>
  );
}

export default App