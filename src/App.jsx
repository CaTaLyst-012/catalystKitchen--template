import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./Components/ScrolltoTopComp/ScrolltoTop";
import Navbar from "./Components/WelcomeComp/Navbar/Navbar";
import Footer from "./Components/WelcomeComp/Footer/Footer";
import Welcome from "./Pages/Welcome/Welcome";
import Menu from "./Pages/Menu/MenuPage";
import ReservationPage from "./Pages/Reservation/ReservationPage";
import ReviewPage from "./Pages/Review/ReviewPage";
import "./App.css";

function App() {
  // Shared cart state
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Key used to reset Menu internal state
  const [menuResetKey, setMenuResetKey] = useState(0);

  const triggerMenuReset = () => {
    setMenuResetKey(prev => prev + 1);
  };

  // Persist cart on every change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <Router>
      <ScrollToTop />
      {/* Pass cart, setCart, and menu reset trigger */}
      <Navbar cart={cart} setCart={setCart} onMenuReset={triggerMenuReset} />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route
          path="/menu"
          element={
            <Menu
              cart={cart}
              setCart={setCart}
              resetKey={menuResetKey} // used inside Menu to clear selections
            />
          }
        />
        <Route path="/reservations" element={<ReservationPage />} />
        <Route path="/reviews" element={<ReviewPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
