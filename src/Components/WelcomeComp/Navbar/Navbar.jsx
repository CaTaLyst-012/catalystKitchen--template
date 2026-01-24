import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import logo from "../../../assets/Images/catalystLogo.jpg";

function Navbar({ cart = [], setCart }) {
  const [contactOpen, setContactOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const cartRef = useRef(null); // ref to cart wrapper

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const increaseQty = (name, day) => {
    setCart(prev =>
      prev.map(i =>
        i.name === name && i.day === day
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    );
  };

  const decreaseQty = (name, day) => {
    setCart(prev =>
      prev
        .map(i =>
          i.name === name && i.day === day
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter(i => i.quantity > 0)
    );
  };

  const totalPrice = cart.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const whatsappMessage = encodeURIComponent(
    `Hello Catalyst's Kitchen 👋\n\n` +
      cart
        .map(i => `• ${i.name} x${i.quantity} (${i.day})`)
        .join("\n") +
      `\n\nTotal: ₦${totalPrice.toLocaleString()}`
  );

  const handlePlaceOrder = () => {
    window.open(
      `https://wa.me/2349020610057?text=${whatsappMessage}`,
      "_blank"
    );
    setCart([]);
    setCartOpen(false);
  };

  // Close cart when clicking anywhere outside the cart area
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cartRef.current &&
        !cartRef.current.contains(event.target)
      ) {
        setCartOpen(false);
      }
    };

    if (cartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartOpen]);

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="navbar-left">
        <div className="catalystKitchen">
          <img src={logo} alt="Catalyst Kitchen" className="logo" />
          <h3>Catalyst's Kitchen</h3>
        </div>

        {/* DESKTOP NAV LINKS (hidden on mobile via CSS) */}
        <div className="nav-links-desktop">
          <ul className="nav-links-left">
            <li>
              <Link className="nav-item" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="nav-item" to="/menu">
                Menu
              </Link>
            </li>
            <li>
              <Link className="nav-item" to="/reservations">
                Reservations
              </Link>
            </li>
            <li>
              <Link className="nav-item" to="/reviews">
                Reviews
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* RIGHT */}
      <div className="navbar-right">
        {/* HAMBURGER – mobile only */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        {/* CONTACT (desktop only) */}
        <div
          className="contact-wrapper"
          onMouseEnter={() => setContactOpen(true)}
          onMouseLeave={() => setContactOpen(false)}
        >
          <span className="contact-link">Contact</span>
          {contactOpen && (
            <div className="contact-dropdown">
              <a href="tel:+2349020610057">📞 +234 902 061 0057</a>
              <a href="mailto:catalystkitchennn@gmail.com">
                ✉️ catalystkitchennn@gmail.com
              </a>
            </div>
          )}
        </div>

        {/* CART (desktop + mobile) */}
        <div className="cart-wrapper" ref={cartRef}>
          <div className="cart-icon" onClick={() => setCartOpen(!cartOpen)}>
            🛒
            {totalItems > 0 && (
              <span className="cart-count">{totalItems}</span>
            )}
          </div>

          {cartOpen && totalItems > 0 && (
            <div className="cart-dropdown">
              {cart.map((item, idx) => (
                <div key={idx} className="cart-item">
                  <span>
                    {item.name} ({item.day})
                  </span>
                  <div className="qty">
                    <button onClick={() => decreaseQty(item.name, item.day)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(item.name, item.day)}>
                      +
                    </button>
                  </div>
                </div>
              ))}

              <h4>Total: ₦{totalPrice.toLocaleString()}</h4>

              <button
                type="button"
                className="whatsapp-btn"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE NAV DROPDOWN (full nav + contact) */}
      <div className={`nav-links-mobile ${menuOpen ? "active" : ""}`}>
        <ul className="nav-links-left">
          <li>
            <Link
              className="nav-item"
              to="/"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="nav-item"
              to="/menu"
              onClick={() => setMenuOpen(false)}
            >
              Menu
            </Link>
          </li>
          <li>
            <Link
              className="nav-item"
              to="/reservations"
              onClick={() => setMenuOpen(false)}
            >
              Reservations
            </Link>
          </li>
          <li>
            <Link
              className="nav-item"
              to="/reviews"
              onClick={() => setMenuOpen(false)}
            >
              Reviews
            </Link>
          </li>

          <li className="mobile-contact">
            <a href="tel:+2349020610057" className="nav-item">
              📞 +234 902 061 0057
            </a>
            <a href="mailto:catalystkitchennn@gmail.com" className="nav-item">
              ✉️ catalystkitchennn@gmail.com
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
