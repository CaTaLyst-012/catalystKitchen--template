import React from "react";
import Review from "../../Components/ReviewComp/Review";
import "./reviewPage.css";

function ReviewPage() {
  return (
    <div className="review-video-page">
      {/* Background Video */}
      <video
        className="review-bg-video"
        src="public/videos/friedriceVideo.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark Overlay */}
      <div className="review-overlay"></div>

      {/* Page Content */}
      <div className="review-content">
        <Review />
      </div>
    </div>
  );
}

export default ReviewPage;
