import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import AddProduct from "./components/Addproduct";
import "./styles.css"; // Import global styles
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import { WishlistProvider } from "./components/WishlistContext";
import Cart from "./components/Cart";
import DetailPage from "./components/DetailPage";
import Login from "./components/Login";
import Signup from "./components/Signup";

import Payment from "./components/Payment";


const Layout = ({ children }) => {
  const location = useLocation();

  // Hide Navbar and Banner only on "/add-product"
  const hideHeader = location.pathname === "/add-product";
  // const hideBanner = location.pathname === "/cart";
  const hideBanner = location.pathname === "/cart" || location.pathname.startsWith("/detail/");
  const hideforSignup = location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/payment";

  return (
    <>
      {!hideHeader && !hideforSignup && <Navbar />}
      {!hideHeader && !hideBanner && !hideforSignup && <Banner />}
      {children}
    </>
  );
};

const App = () => {
  return (
    <>
      <WishlistProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/detail/:id" element={<DetailPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/payment" element={<Payment />} />
            </Routes>
          </Layout>
        </Router>
      </WishlistProvider>
    </>
  );
};

export default App;
