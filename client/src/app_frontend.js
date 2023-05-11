import React, { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/cartProvider";
import LoginPage from "./components/Login/Login";
import SignupPage from "./components/Login/Signup";
import PurchasePage from "./components/Purchase/PurchasePage";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <ChakraProvider>
      <Router>
      <CartProvider>
        {cartIsShown && <Cart onClose={hideCartHandler} />}
        <Header onShowCart={showCartHandler}/>
          <Routes>
          <Route path="/" exact element={<Products/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/purchase" element={<PurchasePage/>}/>
          
          



          </Routes>           
        {/* <main>
          <Products />
        </main> */}
      </CartProvider>
      </Router>
    </ChakraProvider>
  );
}

export default App;
