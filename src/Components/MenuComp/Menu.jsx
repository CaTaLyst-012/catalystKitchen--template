import React, { useState, useEffect } from "react";
import "./menu.css";

function Menu({ cart, setCart }) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const openDays = ["Monday", "Wednesday", "Friday"];
  const cutoffHour = 17; // 5PM cutoff

  const PROTEIN_PRICES = {
    Chicken: 3000,
    SoloTurkey: 3500,
    LargeTurkey: 5000,
  };

  const WATER_PRICE = 500; // Bottled water price

  const menuItems = [
    {
      name: "Jollof Rice",
      description: "Full plate of delicious jollof rice served with protein & sweet plantains.",
      basePrice: 4000,
      image: "/Images/jollofRice.jpg",
      days: ["Monday", "Wednesday", "Friday"],
      proteins: ["Chicken","SoloTurkey","LargeTurkey"],
    },
    {
      name: "Fried Rice",
      description: "Full plate of classic fried rice paired with protein & caramelized plantain.",
      basePrice: 4000,
      image: "/Images/FriedRice2.jpeg",
      days: ["Monday", "Wednesday"],
      proteins: ["Chicken", "SoloTurkey","LargeTurkey"],
    },
    {
      name: "Jambalaya",
      description: "Full plate of flavorful jambalaya with protein & golden plantain.",
      basePrice: 6000,
      image: "/Images/jambalaya.jpg",
      days: ["Wednesday"],
      proteins: ["Chicken", "SoloTurkey","LargeTurkey"],
    },
    {
      name: "Semo & Egusi Soup",
      description: "Full plate of soft semo served with rich egusi soup.",
      basePrice: 8000,
      image: "/Images/semoAndEgusi.jpg",
      days: ["Friday"],
      proteins: [],
    },
    {
      name: "Goat Meat Pepper Soup",
      description: "Full plate of hot and spicy goat meat pepper soup perfect for the soul.",
      basePrice: 10000,
      image: "/Images/goatmeatPeppersoup.jpg",
      days: ["Friday"],
      proteins: [],
    },
    {
      name: "Stir-Fried Spaghetti",
      description: "Full plate of flavorful spaghetti stir-fried with veggies, protein & sweet plantain.",
      basePrice: 4000,
      image: "/Images/stirfriedSpaghetti.jpg",
      days: ["Monday"],
      proteins: ["Chicken", "SoloTurkey","LargeTurkey"],
    },
  ];

  const todayIndex = new Date().getDay();
  const today = days[todayIndex === 0 ? 5 : todayIndex - 1];
  const isCutoffPassed = new Date().getHours() >= cutoffHour;

  const [selectedDay, setSelectedDay] = useState(today);
  const [customOpen, setCustomOpen] = useState(false);
  const [customText, setCustomText] = useState("");
  const [selectedProteins, setSelectedProteins] = useState({});
  const [includeWater, setIncludeWater] = useState({}); // per-card water toggle

  const getProteinPrice = protein => PROTEIN_PRICES[protein] || 0;

  const addToCart = (item, day, protein, waterSelected, idx) => {
    const proteinExtra = protein ? getProteinPrice(protein) : 0;
    const waterExtra = waterSelected ? WATER_PRICE : 0;
    const finalPrice = item.basePrice + proteinExtra + waterExtra;

    const cartItem = {
      name: item.name,
      description: item.description,
      image: item.image,
      price: finalPrice,
      protein: protein || null,
      water: waterSelected || false,
      day,
    };

    setCart(prev => {
      const found = prev.find(
        i =>
          i.name === cartItem.name &&
          i.day === cartItem.day &&
          i.protein === cartItem.protein &&
          i.water === cartItem.water
      );
      if (found) {
        return prev.map(i =>
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

    // clear selections for this card after adding
    setSelectedProteins(prev => {
      const copy = { ...prev };
      delete copy[idx];
      return copy;
    });
    setIncludeWater(prev => {
      const copy = { ...prev };
      delete copy[idx];
      return copy;
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

  // CLOSE CUSTOM MODAL + CLEAR SELECTIONS WHEN DAY CHANGES
  useEffect(() => {
    setCustomOpen(false);
    setCustomText("");
    setSelectedProteins({});
    setIncludeWater({});
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
            const waterSelected = includeWater[idx] || false;

            const finalPrice =
              item.basePrice +
              (selectedProtein ? getProteinPrice(selectedProtein) : 0) +
              (waterSelected ? WATER_PRICE : 0);

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

                  {/* OPTIONAL ADD-ON: Bottled water */}
                  {hasProteins && (
                    <label className="variant-option">
                      <input
                        type="checkbox"
                        checked={includeWater[idx] || false}
                        onChange={e =>
                          setIncludeWater(prev => ({
                            ...prev,
                            [idx]: e.target.checked,
                          }))
                        }
                      />
                      Bottled water (+₦{WATER_PRICE.toLocaleString()})
                    </label>
                  )}

                  <div className="menu-footer">
                    <span>₦{finalPrice.toLocaleString()}</span>
                    <button
                      disabled={addDisabled}
                      onClick={() =>
                        addToCart(item, selectedDay, selectedProtein, waterSelected, idx)
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
