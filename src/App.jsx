import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./Components/ScrolltoTopComp/ScrolltoTop";
import Navbar from "./Components/WelcomeComp/Navbar/Navbar";
import Footer from "./Components/WelcomeComp/Footer/Footer";
import Welcome from "./Pages/Welcome/Welcome";
import Menu from "./Pages/Menu/MenuPage";
import ReservationPage from "./Pages/Reservation/ReservationPage";
import ReviewPage from "./Pages/Review/ReviewPage";
import EasterPromoPage from "./Pages/EasterPromo/EasterPromoPage";
import ScrollFadeLayout from "./Components/ScrollFadeLayout/ScrollFadeLayout";
import "./App.css";

function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [menuResetKey, setMenuResetKey] = useState(0);

  const triggerMenuReset = () => {
    setMenuResetKey((prev) => prev + 1);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <Router>
      <ScrollToTop />
      <Navbar cart={cart} setCart={setCart} onMenuReset={triggerMenuReset} />

      {/* Global scroll-fade for all pages */}
      <ScrollFadeLayout>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/menu"
            element={
              <Menu
                cart={cart}
                setCart={setCart}
                resetKey={menuResetKey}
              />
            }
          />
          <Route path="/reservations" element={<ReservationPage />} />
          <Route path="/reviews" element={<ReviewPage />} />
          <Route
            path="/easter"
            element={<EasterPromoPage cart={cart} setCart={setCart} />}
          />
        </Routes>
      </ScrollFadeLayout>

      <Footer />
    </Router>
  );
}

export default App;
