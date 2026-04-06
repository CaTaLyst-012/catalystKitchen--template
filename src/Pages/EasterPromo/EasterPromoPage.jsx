import React from 'react'
import EasterPromo from '../../Components/EasterPromoComp/EasterPromo'
import "./easterPromoPage.css"

function EasterPromoPage({ cart, setCart }) {
  return (
    <div className="easter-menu-container">
      <div className="easter-menu-control">
        <EasterPromo cart={cart} setCart={setCart} />
      </div>
    </div>
  );
}

export default EasterPromoPage
