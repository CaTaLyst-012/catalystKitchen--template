import React, { useState, useEffect } from "react";
import "./easterPromo.css";
import easterMenuImg from "../../../public/Images/easterMenuImg.jpg";

// Promo runs from now until the end of April of the current year
const getPromoEndDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  // Last day of April at 23:59:59 (month index 4 = May, day 0 = last day of April)
  return new Date(year, 7, 0, 23, 59, 59);
};

const promoEndDate = getPromoEndDate();

const EASTER_BASE_PRICE = 5500;
const WATER_PRICE = 500;

function EasterPromo({ cart, setCart }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isPromoActive, setIsPromoActive] = useState(true);
  const [message, setMessage] = useState("");
  const [includeWater, setIncludeWater] = useState(false);
  const [resetKey, setResetKey] = useState(0); // used to remount UI

  // For consistency, set a logical "day" label for the cart
  const promoDayLabel = "Birthday Bonazaaa";

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = promoEndDate.getTime() - now;

      if (distance <= 0) {
        setIsPromoActive(false);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleAddToCart = () => {
    if (!isPromoActive) {
      setMessage("Birthday Bonazaaa has ended. Please order from the regular menu.");
      return;
    }

    const finalPrice = EASTER_BASE_PRICE + (includeWater ? WATER_PRICE : 0);

    const cartItem = {
      name: "Birthday Jollof Special",
      description: "Smoky jollof rice with turkey and ripe plantains",
      image: "/Images/easterMenuImg.jpg",
      price: finalPrice,
      protein: null, // no protein choice here
      water: includeWater,
      day: promoDayLabel,
    };

    setCart((prev) => {
      const found = prev.find(
        (i) =>
          i.name === cartItem.name &&
          i.day === cartItem.day &&
          i.protein === cartItem.protein &&
          i.water === cartItem.water
      );

      if (found) {
        return prev.map((i) =>
          i.name === cartItem.name &&
          i.day === cartItem.day &&
          i.protein === cartItem.protein &&
          i.water === cartItem.water
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, { ...cartItem, quantity: 1 }];
    });

    setMessage(
      `Added to cart: Birthday Jollof Special${
        includeWater ? " + bottled water" : ""
      } (Total: ₦${finalPrice.toLocaleString()}). ` +
        "Orders can be placed all through the week till Thursday 12 pm. " +
        "Orders from 2 plates and above comes with our brand packaging, while lower amounts comes with our regular packaging."
    );

    // Reset local UI but stay on /easter
    setIncludeWater(false);
    setResetKey((prev) => prev + 1);
  };

  return (
    <section className="easter-promo-wrapper" key={resetKey}>
      <div className="easter-promo-header">
        <div className="easter-promo-text">
          <h1 className="easter-title">Birthday Bonazaaa Menu</h1>
          <p className="easter-subtitle">
            Limited-time Birthday Jollof Special available until end of July.
          </p>

          <div className="easter-countdown-box">
            {isPromoActive ? (
              <>
                <p className="easter-countdown-label">Promo ends in:</p>
                <div className="easter-countdown-values">
                  <div className="easter-countdown-item">
                    <span>{timeLeft.days}</span>
                    <small>Days</small>
                  </div>
                  <div className="easter-countdown-item">
                    <span>{timeLeft.hours}</span>
                    <small>Hours</small>
                  </div>
                  <div className="easter-countdown-item">
                    <span>{timeLeft.minutes}</span>
                    <small>Minutes</small>
                  </div>
                  <div className="easter-countdown-item">
                    <span>{timeLeft.seconds}</span>
                    <small>Seconds</small>
                  </div>
                </div>
              </>
            ) : (
              <p className="easter-ended-text">
                Birthday Bonazaaa has ended. See our regular menu for more options.
              </p>
            )}
          </div>
        </div>

        <div className="easter-promo-image-box">
          <img
            src={easterMenuImg}
            alt="Birthday Jollof Special - jollof rice, turkey and plantains"
            className="easter-promo-image"
          />
        </div>
      </div>

      <div className="easter-menu-list">
        <div className="easter-menu-card">
          <h3 className="easter-menu-name">Birthday Jollof Special</h3>
          <p className="easter-menu-desc">
            Smoky jollof rice with turkey and ripe plantains.
          </p>
          <p className="easter-menu-price">
            ₦{EASTER_BASE_PRICE.toLocaleString()}
          </p>

          <div className="easter-addon-row">
            <label className="easter-addon-label">
              <input
                type="checkbox"
                checked={includeWater}
                onChange={(e) => setIncludeWater(e.target.checked)}
              />
              <span>
                Add bottled water for ₦{WATER_PRICE.toLocaleString()}
              </span>
            </label>
          </div>

          <div className="easter-menu-footer">
            <span className="easter-final-price">
              Total: ₦
              {(
                EASTER_BASE_PRICE + (includeWater ? WATER_PRICE : 0)
              ).toLocaleString()}
            </span>
            <button
              className="easter-order-btn"
              onClick={handleAddToCart}
              disabled={!isPromoActive}
            >
              {isPromoActive ? "Add to cart" : "Promo ended"}
            </button>
          </div>
        </div>
      </div>

      <div className="easter-rules-box">
        <h2 className="easter-rules-title">Promo ordering details</h2>
        <ul className="easter-rules-list">
          <li>Orders can be placed all through the week till Thursday 12:00 pm.</li>
          <li>Orders from 2 plates and above comes with our special brand packaging.</li>
          <li>Orders below 2 plates will be served in our regular packaging.</li>
        </ul>
      </div>

      {message && <p className="easter-message">{message}</p>}
    </section>
  );
}

export default EasterPromo;