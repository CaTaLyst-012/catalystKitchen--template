// MenuPage.jsx
import React from "react";
import Menu from "../../Components/MenuComp/Menu";
import "./menuPage.css";

function MenuPage({ cart, setCart }) {
  return (
    <div className="menu-container">
      <div className="menu-control">
        <Menu cart={cart} setCart={setCart} />
      </div>
    </div>
  );
}

export default MenuPage;
