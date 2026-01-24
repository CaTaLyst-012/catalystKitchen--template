import React, { useState } from "react";
import "./reservation.css";

function Reservation() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    notes: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const message = `
Reservation Request:
Name: ${formData.name}
Phone: ${formData.phone}
Date: ${formData.date}
Time: ${formData.time}
Guests: ${formData.guests}
Notes: ${formData.notes}
    `;

    // open WhatsApp
    window.open(
      `https://wa.me/2349020610057?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    // clear the form after "submit"
    setFormData({
      name: "",
      phone: "",
      date: "",
      time: "",
      guests: "",
      notes: "",
    });
  }

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      <h1>Reserve a Table</h1>

      <input
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="guests"
        placeholder="Guests"
        value={formData.guests}
        onChange={handleChange}
        required
      />
      <textarea
        name="notes"
        placeholder="Additional notes"
        value={formData.notes}
        onChange={handleChange}
      ></textarea>

      <button type="submit">Reserve</button>
    </form>
  );
}

export default Reservation;
