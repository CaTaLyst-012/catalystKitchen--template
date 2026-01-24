import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./Components/ScrolltoTopComp/ScrolltoTop";
import Navbar from './Components/WelcomeComp/Navbar/Navbar';
import Footer from './Components/WelcomeComp/Footer/Footer';
import Welcome from './Pages/Welcome/Welcome';
import Menu from './Pages/Menu/MenuPage';
import ReservationPage from './Pages/Reservation/ReservationPage';
import ReviewPage from './Pages/Review/ReviewPage';

function App() {
  // Shared cart state
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist cart on every change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <Router>
      <ScrollToTop />
      {/* Pass cart and setCart as props */}
      <Navbar cart={cart} setCart={setCart} />
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/menu' element={<Menu cart={cart} setCart={setCart} />} />
        <Route path='/reservations' element={<ReservationPage />} />
        <Route path='/reviews' element={<ReviewPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
