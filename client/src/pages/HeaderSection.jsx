// src/components/HeaderSection.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './HeaderSection.css';

const HeaderSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <header className="header">
        <div className="logo">
          <a href="/" style={{textDecoration:'none', fontWeight: '600',fontSize: '26px',color:'grey', fontFamily: `'Poppins', sans-serif;`}} className='logofirst'>
          Heavens 
          <span style={{fontWeight:'500'}}>&nbsp;Living</span></a>
        </div>
        <nav className="nav">
          <a href="#home" className="navLink">Home</a>
          <a href="#about" className="navLink">About</a>
          <a href="#contact" className="navLink">Contact</a>
        </nav>
        <div className="listProperty">
          <a href="#list-property" className="listPropertyLink">
            Partners Program <FontAwesomeIcon icon={faHandshake} />
          </a>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </div>
        <div className={`mobileMenu ${menuOpen ? 'open' : ''}`}>
          <a href="#home" className="mobileNavLink">Home</a>
          <a href="#about" className="mobileNavLink">About</a>
          <a href="#contact" className="mobileNavLink">Contact</a>
          <a href="#list-property" className="mobileNavLink">List Your Property</a>
        </div>
      </header> 
    </div>
  );
};

export default HeaderSection;
