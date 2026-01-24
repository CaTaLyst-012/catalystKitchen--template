import React from "react";
import "./review.css";

function Review() {
  const reviews = [
    "public/images/review1.jpeg",
    "public/images/review2.jpeg",
    "public/images/review3.jpeg",
    "public/images/review4.jpeg",
    "public/images/review5.jpeg",
    "public/images/review6.jpeg",
    "public/images/review7.jpeg",
    "public/images/review8.jpeg",
    "public/images/review10.jpeg",
    "public/images/review11.jpeg",
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
