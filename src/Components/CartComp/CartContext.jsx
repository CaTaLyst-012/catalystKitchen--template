import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item, day) => {
    setCart((prev) => {
      const found = prev.find((i) => i.name === item.name && i.day === day);
      if (found) {
        return prev.map((i) =>
          i.name === item.name && i.day === day
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1, day }];
    });
  };

  const removeFromCart = (itemName, day) => {
    setCart((prev) =>
      prev.filter((i) => !(i.name === itemName && i.day === day))
    );
  };

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalItems, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
