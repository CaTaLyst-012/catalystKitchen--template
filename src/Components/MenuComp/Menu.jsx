import React, { useState, useEffect } from "react";
import "./menu.css";  


function Menu({ cart, setCart }) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const openDays = ["Monday", "Wednesday", "Friday"];
  const cutoffHour = 17; // 5PM cutoff

  const PROTEIN_PRICES = {
    Chicken: 3000,
    Turkey: 4000,
  };

  const menuItems = [
    {
      name: "Jollof Rice",
      description: "Delicious jollof rice served with protein & sweet plantains.",
      basePrice: 2000,
      image: "/Images/jollofRice.jpg",
      days: ["Monday", "Wednesday", "Friday"],
      proteins: ["Chicken", "Turkey"],
    },
    {
      name: "Fried Rice",
      description: "Classic fried rice paired with protein & caramelized plantain.",
      basePrice: 2500,
      image: "/Images/FriedRice2.jpeg",
      days: ["Monday", "Wednesday"],
      proteins: ["Chicken", "Turkey"],
    },
    {
      name: "Jambalaya",
      description: "Flavorful jambalaya with protein & golden plantain.",
      basePrice: 4000,
      image: "/Images/jambalaya.jpg",
      days: ["Wednesday"],
      proteins: ["Chicken", "Turkey"],
    },
    {
      name: "Semo & Egusi Soup",
      description: "Soft semo served with rich egusi soup.",
      basePrice: 6000,
      image: "/Images/semoAndEgusi.jpg",
      days: ["Friday"],
      proteins: [],
    },
    {
      name: "Goat Meat Pepper Soup",
      description: "Hot and spicy goat meat pepper soup perfect for the soul.",
      basePrice: 7000,
      image: "/Images/goatmeatPeppersoup.jpg",
      days: ["Friday"],
      proteins: [],
    },
    {
      name: "Stir-Fried Spaghetti",
      description: "Flavorful spaghetti stir-fried with veggies, protein & sweet plantain.",
      basePrice: 2500,
      image: "/Images/stirfriedSpaghetti.jpg",
      days: ["Monday"],
      proteins: ["Chicken", "Turkey"],
    },
  ];

  const todayIndex = new Date().getDay();
  const today = days[todayIndex === 0 ? 5 : todayIndex - 1];
  const isCutoffPassed = new Date().getHours() >= cutoffHour;

  const [selectedDay, setSelectedDay] = useState(today);
  const [customOpen, setCustomOpen] = useState(false);
  const [customText, setCustomText] = useState("");
  const [selectedProteins, setSelectedProteins] = useState({});

  const getProteinPrice = protein => PROTEIN_PRICES[protein] || 0;

  const addToCart = (item, day, protein) => {
    const proteinExtra = protein ? getProteinPrice(protein) : 0;
    const finalPrice = item.basePrice + proteinExtra;

    const cartItem = {
      name: item.name,
      description: item.description,
      image: item.image,
      price: finalPrice,
      protein: protein || null,
      day,
    };

    setCart(prev => {
      const found = prev.find(
        i =>
          i.name === cartItem.name &&
          i.day === cartItem.day &&
          i.protein === cartItem.protein
      );
      if (found) {
        return prev.map(i =>
          i.name === cartItem.name &&
          i.day === cartItem.day &&
          i.protein === cartItem.protein
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...cartItem, quantity: 1 }];
    });
  };

  const sendCustomOrder = () => {
    const message = encodeURIComponent(
      `Hello Catalyst's Kitchen 👋\n\nCustom Order for ${selectedDay}:\n${customText}`
    );
    window.open(`https://wa.me/2349020610057?text=${message}`, "_blank");
    setCustomText("");
    setCustomOpen(false);
  };

  // CLOSE CUSTOM MODAL WHEN DAY CHANGES
  useEffect(() => {
    setCustomOpen(false);
    setCustomText("");
  }, [selectedDay]);

  return (
    <div className="menu-page">
      <h1 className="menu-title">Catalyst's Kitchen Menu</h1>

      {/* IMAGE-ONLY HORIZONTAL CAROUSEL */}
      <div className="food-carousel">
        <div className="carousel-track">
          {menuItems.map((item, idx) => (
            <img
              src={item.image}
              alt={item.name}
              className="carousel-img"
              key={idx}
            />
          ))}
          {menuItems.map((item, idx) => (
            <img
              src={item.image}
              alt={item.name}
              className="carousel-img"
              key={"dup-" + idx}
            />
          ))}
        </div>
      </div>

      {/* WEEKLY MENU */}
      <div className="calendar">
        {days.map(day => (
          <div
            key={day}
            className={`calendar-day ${
              openDays.includes(day) ? "open" : "closed"
            } ${day === selectedDay ? "selected" : ""}`}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </div>
        ))}
      </div>

      {/* OFFDAY CUSTOM ORDER */}
      {!openDays.includes(selectedDay) && (
        <div className="offday-section">
          <div className="offday-banner">
            🚫 We are closed on {selectedDay}. You can place a custom order for another day.
          </div>
          <button
            className="custom-btn"
            onClick={() => setCustomOpen(true)}
          >
            Place Custom Order
          </button>
        </div>
      )}

      {/* TODAY CUT-OFF */}
      {openDays.includes(selectedDay) &&
        selectedDay === today &&
        isCutoffPassed && (
          <div className="cutoff-banner">
            ⏱ Orders for today are closed after 5PM. You can place a custom order for another day.
            <button
              className="custom-btn"
              onClick={() => setCustomOpen(true)}
            >
              Place Custom Order
            </button>
          </div>
        )}

      {/* MENU CARDS */}
      <div className="menu-grid">
        {menuItems
          .filter(item => item.days.includes(selectedDay))
          .map((item, idx) => {
            const hasProteins = item.proteins && item.proteins.length > 0;
            const selectedProtein = selectedProteins[idx] || null;
            const finalPrice =
              item.basePrice +
              (selectedProtein ? getProteinPrice(selectedProtein) : 0);

            const addDisabled =
              (hasProteins && !selectedProtein) ||
              (selectedDay === today && isCutoffPassed);

            return (
              <div className="menu-card" key={idx}>
                <img src={item.image} alt={item.name} />
                <div className="menu-content">
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>

                  {/* PROTEIN SELECTOR */}
                  {hasProteins && (
                    <div className="variant-list">
                      {item.proteins.map(protein => (
                        <label key={protein} className="variant-option">
                          <input
                            type="radio"
                            name={`${item.name}-${idx}`}
                            checked={selectedProtein === protein}
                            onChange={() =>
                              setSelectedProteins(prev => ({
                                ...prev,
                                [idx]: protein,
                              }))
                            }
                          />
                          {protein} (+₦{getProteinPrice(protein).toLocaleString()})
                        </label>
                      ))}
                    </div>
                  )}

                  <div className="menu-footer">
                    <span>₦{finalPrice.toLocaleString()}</span>
                    <button
                      disabled={addDisabled}
                      onClick={() =>
                        addToCart(item, selectedDay, selectedProtein)
                      }
                    >
                      {hasProteins && !selectedProtein
                        ? "Choose protein"
                        : "Add"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* CUSTOM ORDER MODAL */}
      {customOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Custom Order for {selectedDay}</h3>
            <div className="modal-body">
              <textarea
                className="custom-textarea"
                placeholder="Describe your custom meal..."
                value={customText}
                onChange={e => setCustomText(e.target.value)}
              />
            </div>
            <div className="modal-actions">
              <button onClick={sendCustomOrder}>Send to WhatsApp</button>
              <button
                className="cancel"
                onClick={() => setCustomOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;
