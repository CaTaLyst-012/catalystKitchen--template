import React from 'react'
import { useState } from "react";
import logo from '../../../assets/Images/catalystLogo.jpg';
import facebookIcon from '../../../assets/Images/facebookIcon-black.png';
import instaIcon from '../../../assets/Images/InstagramIcon-Black.png';
import tiktokIcon from '../../../assets/Images/tiktokicon-black.png';
import whatsappIcon from '../../../assets/Images/whatsapp.png';
import mailIcon from '../../../assets/Images/mail-icon.png';
import './footer.css';
import emailjs from '@emailjs/browser';

function Footer() {
   const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_SUBSCRIBER_TEMPLATE_ID,
      {
        user_email: email,
        message: "Wlcome to catalyst kitche",
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        user_email: email, // must match EmailJS template variable
        subscription_date: new Date().toLocaleString(),
         source: "Website Newsletter Form",
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
      .then(
        () => {
          setStatus("Subscribed successfully 🎉");
          setEmail("");
        },
        (error) => {
          setStatus("Something went wrong 😢");
          console.error(error);
        }
      );
  };

   {/* const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email");
      return;
    }

    // TEMP: replace later with real backend / service
    console.log("Subscribed email:", email);

    alert("Thanks for subscribing!");
    setEmail("");
  };*/}
  return (
    <div className='footerSection'>
      <div className="newsletterSection">
            <div className="loopContainer">
                    <h1>Stay in the loop</h1>
                    <p>Get updates on new dishes, special offers and stories from our kitchen deliverd to your inbox</p>
                    <form onSubmit={handleSubmit} className="newsletter-form">
                        <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required/>
                        <button className='subscribe-btn' type="submit">Subscribe</button>{status && <p>{status}</p>}
                    </form>
                    <p>By subscribing you agree to receive emails from Catalyst's kitchen about promotions and updates.</p>
            </div>

      </div>

      <div className="footerContainer">
         <div className="downLeftFooter">
            <p className='footerPara'>© 2026 Catalyst's Kitchen 🍴, Inc. All rights reserved</p>
         </div>

          <div className="downMiddleFooter">
            <img src= {logo} alt="Catalyst's Kitchen Logo" className='logo2'/>

          </div>

            <div className="social-icons">
                <a href="https://instagram.com/catalyst_kitchen" target="_blank" rel="noreferrer">
                <img src={instaIcon} alt="Instagram" className="insta-icon" />
                </a>

                <a href="https://facebook.com/Catalyst's Kitchen" target="_blank" rel="noreferrer">
                <img src={facebookIcon} alt="Facebook" className="facebook-icon" />
                </a>

                <a href="https://tiktok.com/@catalyst.kitchen" target="_blank" rel="noreferrer">
                <img src={tiktokIcon} alt="TikTok" className="tiktok-icon" />
                </a>

                <a href="https://wa.me/2349020610057" target="_blank" rel="noreferrer">
                <img src={whatsappIcon} alt="Whatsapp" className="whatsapp-icon" />
                </a>

                <a href="mailto:catalystkitchennn@gmail.com">
                <img src={mailIcon} alt="Email" className="mail-icon" />
                </a>

            </div>

          


      </div>


    </div>
  )
}

export default Footer;
