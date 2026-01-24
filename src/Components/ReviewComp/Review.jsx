import React from "react";
import "./review.css";

function Review() {
  const reviews = [
    "/Images/review1.jpeg",
    "/Images/review2.jpeg",
    "/Images/review3.jpeg",
    "/Images/review4.jpeg",
    "/Images/review5.jpeg",
    "/Images/review6.jpeg",
    "/Images/review7.jpeg",
    "/Images/review8.jpeg",
    "/Images/review10.jpeg",
    "/Images/review11.jpeg",
  ];

  return (
    <div className="review-container">
      <h1 className="review-title">What Our Customers Say</h1>
      <p className="review-subtitle">
        Real reviews from real customers ❤️
      </p>

      <div className="review-grid">
        {reviews.map((img, index) => (
          <div className="review-card" key={index}>
            <img src={img} alt={`Customer review ${index + 1}`} />
          </div>
        ))}
      </div>

      <div className="review-cta">
        <p>Enjoyed our food?</p>
        <a
          href="https://wa.me/2349020610057"
          target="_blank"
          rel="noopener noreferrer"
        >
          Leave us a review on WhatsApp 💬
        </a>
      </div>
    </div>
  );
}

export default Review;
