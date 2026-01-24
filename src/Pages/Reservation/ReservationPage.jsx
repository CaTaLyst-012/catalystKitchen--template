import React from 'react'
import Reservation from '../../Components/ReservationComp/Reservation';
import './reservationPage.css';

function ReservationPage() {
  return (
    <div className="reservation-video-page">
      
      {/* Background Video */}
      <video
        className="reservation-video"
        autoPlay
        muted
        loop
        playsInline>
        <source src="public/videos/jambalayaVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay */}
      <div className="video-overlay"></div>

      {/* Content */}
      <div className="reservation-content">
        <Reservation />
      </div>

    </div>
  )
}

export default ReservationPage
