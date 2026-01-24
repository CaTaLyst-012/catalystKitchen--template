import React from 'react'
import jollofRice2 from '../../../assets/Images/jollofRice2.png';
import './heroSection.css';
import { Link } from "react-router-dom";


function HeroSection() {
  return (
    <div className="hero-sectionContainer">
        <div className="overallHero-container">
            <div className="leftHero-text">
                <h1>Enjoy our <span className='flavourfully'>flavourfully crafted </span> <span className='sumptuous'>sumptuous meals</span></h1>
                <p className='heroParagrapgh'>We bring authentic Nigerian flavors to your table with fresh ingredients and traditional recipes. Every dish tells a story of home. </p>

                <div className="buttons">
                    <Link to="/menu" className="viewMenu-button">
                        View Menu
                    </Link>

                    <Link to="/menu" className="orderNow2-button">
                        Order Now
                    </Link>
                  
                </div>

            </div>

            <div className="rightHero-img">
                <img className='heroImg' src={jollofRice2} alt="Hero-Image" />

            </div>
        </div>
      
    </div>
  )
}

export default HeroSection
