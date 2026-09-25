import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./easterPromo.css";
import anniversaryJollofImg from "../../../public/Images/jollof-image.jpeg";
import anniversaryFriedRiceImg from "../../../public/Images/fried-rice-image.jpeg";
import anniversaryFamilyFestImg from "../../../public/Images/family-fest-image.jpeg";

/**
 * Catalyst's Kitchen @1 Anniversary Menu
 * ---------------------------------------------------------------------
 * NOTE ON FILE / ROUTE NAMING:
 * This file is intentionally still named EasterPromo.jsx (and the route
 * is still /easter) so that the existing wrapper (EasterPromoPage.jsx)
 * and homepage CTA keep working without any import changes. Only the
 * internal component name, CSS classes, constants and content have
 * been renamed to anniversary terminology.
 *
 * EVENT DATES (edit here only):
 * Start: September 28, 2026
 * End:   October 30, 2026, 23:59:59 (local time of whoever views the page)
 * Dates are built with explicit (year, monthIndex, day, ...) constructors
 * rather than parsed from strings, to avoid timezone / parsing surprises.
 * If you deploy across timezones and need a single canonical cutoff
 * (e.g. always Lagos time), swap these two Date constructions for a
 * fixed-offset ISO string instead, e.g. new Date("2026-10-30T23:59:59+01:00").
 */
const EVENT_START = new Date(2026, 8, 28, 0, 0, 0); // Sept 28, 2026
const EVENT_END = new Date(2026, 9, 30, 23, 59, 59); // Oct 30, 2026 23:59:59

const EVENT_CATEGORY = "Catalyst's Kitchen @1 Anniversary";

// Shared turkey pricing used by all three rice dishes
const TURKEY_OPTIONS = [
  { id: "solo", label: "Solo Turkey", price: 5000, previousPrice: 6500 },
  { id: "xl", label: "Extra-large Turkey", price: 6500, previousPrice: 8000 },
];
const DEFAULT_TURKEY_ID = "solo";

const RICE_ITEMS = [
  {
    id: "smoky-jollof",
    name: "Catalyzed Smoky Jollof",
    description: "Smoky jollof rice served with your choice of turkey size.",
    image: anniversaryJollofImg,
    imagePath: "/Images/anniversaryJollof.jpg",
    alt: "Catalyzed Smoky Jollof - smoky jollof rice with turkey",
  },
  {
    id: "fried-rice",
    name: "Catalyzed Fried Rice",
    description: "Fried rice served with your choice of turkey size.",
    image: anniversaryFriedRiceImg,
    imagePath: "/Images/anniversaryFriedRice.jpg",
    alt: "Catalyzed Fried Rice - fried rice with turkey",
  },
  {
    id: "mixed-rice",
    name: "Catalyzed Mixed Rice",
    description:
      "Half Catalyzed Smoky Jollof and half Catalyzed Fried Rice, served with your choice of turkey size.",
    image: anniversaryJollofImg, // reuse jollof image until a dedicated mixed-rice image is supplied
    imagePath: "/Images/anniversaryJollof.jpg",
    alt: "Catalyzed Mixed Rice - half jollof, half fried rice with turkey",
  },
];

const FAMILY_FEST = {
  id: "family-fest",
  name: "Catalyze Family Fest",
  description:
    "A small tray of Catalyzed Smoky Jollof and Catalyzed Fried Rice with 6 turkeys and side plantains.",
  price: 40000,
  image: anniversaryFamilyFestImg,
  imagePath: "/Images/anniversaryFamilyFest.jpg",
  alt: "Catalyze Family Fest - tray of jollof and fried rice with 6 turkeys and plantains",
};

const DELIVERY_INFO = {
  price: 2000,
  previousPrice: 6000,
  location: "First Gate Bus Stop, LASU Ojo",
};

const REWARDS = [
  {
    id: "discounted-prices",
    title: "Discounted Food Prices",
    text: "The anniversary menu includes special discounted food prices.",
  },
  {
    id: "loyalty",
    title: "Loyalty Reward",
    text:
      "Our top three loyal Catalyst's Kitchen customers of Year One will each receive a complimentary meal and drink.",
  },
  {
    id: "early-bird",
    title: "Early Bird Reward",
    text: "The first 20 paid anniversary-menu orders receive a free drink.",
  },
  {
    id: "spend",
    title: "Spend Reward",
    text:
      "One qualifying order of ₦30,000 or more receives a complimentary food pack with turkey and a drink.",
  },
  {
    id: "socials",
    title: "Socials Reward",
    text: "Three customers win based on the published content rules.",
  },
  {
    id: "referral",
    title: "Referral Reward",
    text: "Three customers win based on the published referral rules.",
  },
];

function getEventStatus(now) {
  if (now < EVENT_START) return "upcoming";
  if (now > EVENT_END) return "ended";
  return "active";
}

function getCountdownParts(targetDate, now) {
  const distance = targetDate.getTime() - now.getTime();
  if (distance <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

function formatNaira(amount) {
  return `₦${amount.toLocaleString()}`;
}

/**
 * Reusable price block: current price prominent, previous price struck
 * through underneath using semantic <del>. Never uses color alone to
 * signal which is current vs previous - relies on size/weight + <del>.
 */
function PriceTag({ current, previous, label }) {
  return (
    <span className="ap-price-tag">
      <span className="ap-price-current">{formatNaira(current)}</span>
      {previous ? (
        <del className="ap-price-previous" aria-label={`previous price ${formatNaira(previous)}`}>
          {formatNaira(previous)}
        </del>
      ) : null}
      {label ? <span className="ap-price-label">{label}</span> : null}
    </span>
  );
}

/**
 * One rice-dish card with its own independent turkey selector.
 */
function RiceMenuCard({ item, isOrderable, onAdd, index }) {
  const [turkeyId, setTurkeyId] = useState(DEFAULT_TURKEY_ID);
  const selectedTurkey =
    TURKEY_OPTIONS.find((t) => t.id === turkeyId) || TURKEY_OPTIONS[0];

  const handleAdd = () => {
    onAdd(item, selectedTurkey);
    setTurkeyId(DEFAULT_TURKEY_ID); // reset this card's selection only
  };

  return (
    <article
      className="ap-menu-card"
      style={{ "--ap-stagger": index }}
    >
      <img src={item.image} alt={item.alt} className="ap-menu-card-img" />
      <div className="ap-menu-card-body">
        <h3 className="ap-menu-card-name">{item.name}</h3>
        <p className="ap-menu-card-desc">{item.description}</p>

        <fieldset className="ap-turkey-fieldset">
          <legend className="ap-turkey-legend">Choose turkey size</legend>
          <div className="ap-turkey-options" role="radiogroup" aria-label={`Turkey size for ${item.name}`}>
            {TURKEY_OPTIONS.map((option) => {
              const inputId = `${item.id}-${option.id}`;
              return (
                <label key={option.id} htmlFor={inputId} className="ap-turkey-option">
                  <input
                    type="radio"
                    id={inputId}
                    name={`turkey-${item.id}`}
                    value={option.id}
                    checked={turkeyId === option.id}
                    onChange={() => setTurkeyId(option.id)}
                  />
                  <span className="ap-turkey-option-content">
                    <PriceTag current={option.price} previous={option.previousPrice} />
                    <span className="ap-turkey-option-label">{option.label}</span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="ap-menu-card-footer">
          <span className="ap-total">
            Total: <strong>{formatNaira(selectedTurkey.price)}</strong>
          </span>
          <button
            type="button"
            className="ap-add-btn"
            onClick={handleAdd}
            disabled={!isOrderable}
          >
            {isOrderable ? "Add to cart" : "Unavailable"}
          </button>
        </div>
      </div>
    </article>
  );
}

/**
 * Family Fest card - fixed price, no turkey selector.
 */
function FamilyFestCard({ item, isOrderable, onAdd, index }) {
  return (
    <article className="ap-menu-card ap-menu-card--fest" style={{ "--ap-stagger": index }}>
      <img src={item.image} alt={item.alt} className="ap-menu-card-img" />
      <div className="ap-menu-card-body">
        <h3 className="ap-menu-card-name">{item.name}</h3>
        <p className="ap-menu-card-desc">{item.description}</p>
        <div className="ap-menu-card-footer">
          <span className="ap-total">
            <strong>{formatNaira(item.price)}</strong>
          </span>
          <button
            type="button"
            className="ap-add-btn"
            onClick={() => onAdd(item)}
            disabled={!isOrderable}
          >
            {isOrderable ? "Add to cart" : "Unavailable"}
          </button>
        </div>
      </div>
    </article>
  );
}

function AnniversaryPromo({ cart, setCart }) {
  const [now, setNow] = useState(() => new Date());
  const [message, setMessage] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  const status = useMemo(() => getEventStatus(now), [now]);
  const isOrderable = status === "active";

  const countdownTarget = status === "upcoming" ? EVENT_START : EVENT_END;
  const countdown = useMemo(
    () => getCountdownParts(countdownTarget, now),
    [countdownTarget, now]
  );

  const addRiceToCart = useCallback(
    (item, turkeyOption) => {
      if (!isOrderable) return;

      const cartItem = {
        name: item.name,
        description: item.description,
        image: item.imagePath,
        price: turkeyOption.price,
        protein: null,
        turkeySize: turkeyOption.id,
        day: EVENT_CATEGORY,
        category: EVENT_CATEGORY,
      };

      setCart((prev) => {
        const found = prev.find(
          (i) =>
            i.name === cartItem.name &&
            i.turkeySize === cartItem.turkeySize &&
            i.category === cartItem.category
        );
        if (found) {
          return prev.map((i) =>
            i.name === cartItem.name &&
            i.turkeySize === cartItem.turkeySize &&
            i.category === cartItem.category
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        }
        return [...prev, { ...cartItem, quantity: 1 }];
      });

      setMessage(
        `Added to cart: ${item.name} (${turkeyOption.label}) - Total: ${formatNaira(
          turkeyOption.price
        )}.`
      );
    },
    [isOrderable, setCart]
  );

  const addFamilyFestToCart = useCallback(
    (item) => {
      if (!isOrderable) return;

      const cartItem = {
        name: item.name,
        description: item.description,
        image: item.imagePath,
        price: item.price,
        protein: null,
        turkeySize: null,
        day: EVENT_CATEGORY,
        category: EVENT_CATEGORY,
      };

      setCart((prev) => {
        const found = prev.find(
          (i) =>
            i.name === cartItem.name &&
            i.turkeySize === cartItem.turkeySize &&
            i.category === cartItem.category
        );
        if (found) {
          return prev.map((i) =>
            i.name === cartItem.name &&
            i.turkeySize === cartItem.turkeySize &&
            i.category === cartItem.category
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        }
        return [...prev, { ...cartItem, quantity: 1 }];
      });

      setMessage(`Added to cart: ${item.name} - Total: ${formatNaira(item.price)}.`);
    },
    [isOrderable, setCart]
  );

  return (
    <section className="ap-wrapper">
      <header className="ap-hero">
        <div className="ap-hero-text">
          <p className="ap-hero-kicker">Catalyst's Kitchen</p>
          <h1 className="ap-hero-title">
            <span className="ap-hero-at1">@1</span> Anniversary Menu
          </h1>
          <p className="ap-hero-dates">
            September 28 - October 30, 2026
          </p>
          <p className="ap-hero-message">
            We're celebrating one year of Catalyst's Kitchen with a limited
            anniversary menu, discounted prices, and rewards for our
            customers.
          </p>

          <div className="ap-countdown-box" aria-live="polite">
            {status === "ended" ? (
              <p className="ap-ended-text">
                The Catalyst's Kitchen @1 Anniversary Menu has ended. Please
                visit our regular menu for other options.
              </p>
            ) : (
              <>
                <p className="ap-countdown-label">
                  {status === "upcoming"
                    ? "Anniversary menu opens in:"
                    : "Anniversary menu ends in:"}
                </p>
                <div className="ap-countdown-values">
                  <div className="ap-countdown-item">
                    <span>{countdown.days}</span>
                    <small>Days</small>
                  </div>
                  <div className="ap-countdown-item">
                    <span>{countdown.hours}</span>
                    <small>Hours</small>
                  </div>
                  <div className="ap-countdown-item">
                    <span>{countdown.minutes}</span>
                    <small>Minutes</small>
                  </div>
                  <div className="ap-countdown-item">
                    <span>{countdown.seconds}</span>
                    <small>Seconds</small>
                  </div>
                </div>
              </>
            )}
          </div>

          <p className="ap-order-hint">
            {isOrderable
              ? "Order below - available for a limited time only."
              : "Ordering opens once the anniversary menu is active."}
          </p>
        </div>

        <div className="ap-hero-image-box">
          <img
            src={FAMILY_FEST.image}
            alt="Catalyst's Kitchen @1 Anniversary spread"
            className="ap-hero-image"
          />
          <span className="ap-hero-badge">@1</span>
        </div>
      </header>

      <div className="ap-menu-grid">
        {RICE_ITEMS.map((item, index) => (
          <RiceMenuCard
            key={item.id}
            item={item}
            index={index}
            isOrderable={isOrderable}
            onAdd={addRiceToCart}
          />
        ))}
        <FamilyFestCard
          item={FAMILY_FEST}
          index={RICE_ITEMS.length}
          isOrderable={isOrderable}
          onAdd={addFamilyFestToCart}
        />
      </div>

      {message && (
        <p className="ap-message" role="status" aria-live="polite">
          {message}
        </p>
      )}

      <section className="ap-rewards" aria-labelledby="ap-rewards-heading">
        <h2 id="ap-rewards-heading" className="ap-rewards-title">
          Anniversary Events &amp; Rewards
        </h2>
        <div className="ap-rewards-grid">
          {REWARDS.map((reward, index) => (
            <div key={reward.id} className="ap-reward-card" style={{ "--ap-stagger": index }}>
              <h3 className="ap-reward-title">{reward.title}</h3>
              <p className="ap-reward-text">{reward.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="ap-delivery" aria-labelledby="ap-delivery-heading">
        <h2 id="ap-delivery-heading" className="ap-delivery-heading">
          Ordering &amp; Delivery
        </h2>
        <p className="ap-delivery-text">
          Orders are open throughout the week. Anniversary meals are cooked
          and delivered every Friday.
        </p>
        <p className="ap-delivery-text">
          Delivery to {DELIVERY_INFO.location}:{" "}
          <PriceTag current={DELIVERY_INFO.price} previous={DELIVERY_INFO.previousPrice} />
        </p>
      </section>
    </section>
  );
}

export default AnniversaryPromo;
