import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowDownShortWide } from '@fortawesome/free-solid-svg-icons';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Ensure this is imported
import './HomePage.css';
import PropertiesSection from './PropertiesSection';
import HeaderSection from './HeaderSection';
import NearbyLocation from './NearbyLocation';
import Faq from './Faq';
import Modal from './PopupSearch/Modal'; // Import Modal component

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [location, setLocation] = useState('');
  const [properties, setProperties] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleIndicatorClick = (index) => {
    setSelectedIndex(index);
  };

  const handleSearchFocus = () => {
    if (window.innerWidth >= 1024) { // Check for large devices
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <Helmet>
        <title>Home Page | Your Company</title>
        <meta name="description" content="Welcome to our homepage. Explore our services and find what you need with ease." />
        <meta name="keywords" content="homepage, services, company, location, carousel, search" />
        <meta property="og:title" content="Home Page | Your Company" />
        <meta property="og:description" content="Explore our services and find what you need with ease. Welcome to our homepage." />
        <meta property="og:image" content="https://example.com/image.jpg" />
        <meta property="og:url" content="https://example.com/home" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Home Page | Your Company" />
        <meta name="twitter:description" content="Explore our services and find what you need with ease. Welcome to our homepage." />
        <meta name="twitter:image" content="https://example.com/image.jpg" />
      </Helmet>
      
      <HeaderSection />
      <section className="carouselSection">
        <Carousel
          selectedItem={selectedIndex}
          showArrows={true}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          emulateTouch={true}
          showStatus={false}
          renderIndicator={() => null}
          onChange={(index) => setSelectedIndex(index)}
          className="carousel-m"
        >
          <div className='main-carousel'>
            <img
              src="https://www.stanzaliving.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fstanza-living%2Fimage%2Fupload%2Ff_auto%2Cq_auto%2Fv1688556552%2FWebsite%2FCMS-Uploads%2FWeb_Banner_03_Desktop_1_vzb4dj.png&w=1920&q=75"
              alt="Image 1"
            />
          </div>
          <div className='main-carousel'>
            <img
              src="https://www.stanzaliving.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fstanza-living%2Fimage%2Fupload%2Ff_auto%2Cq_auto%2Fv1688556582%2FWebsite%2FCMS-Uploads%2FWeb_Banner_03_Desktop_3_mknpwg.png&w=1920&q=75"
              alt="Image 2"
            />
          </div>
          <div className='main-carousel'>
            <img
              src="https://www.stanzaliving.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fstanza-living%2Fimage%2Fupload%2Ff_auto%2Cq_auto%2Fv1688556616%2FWebsite%2FCMS-Uploads%2FWeb_Banner_Desktop_2_fukrjc.png&w=1920&q=75"
              alt="Image 3"
            />
          </div>
        </Carousel>
        <div className="customIndicators">
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              className={`indicator ${index === selectedIndex ? 'selected' : ''}`}
              onClick={() => handleIndicatorClick(index)}
            />
          ))}
        </div>
        <div className="searchContainer">
          <FontAwesomeIcon icon={faMagnifyingGlass} style={{ marginLeft: '10px' }} />
          <input
            type="text"
            className="searchInput"
            placeholder="Search Hostels and Pg's Nearby......."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onFocus={handleSearchFocus} // Trigger modal on focus
          />
          <FontAwesomeIcon
            icon={faArrowDownShortWide}
            style={{ fontSize: '24px', marginRight: '20px', color: 'black', cursor: 'pointer' }}
          />
        </div>
      </section>

      <PropertiesSection />
      <NearbyLocation />
      <Faq />

      {/* Render modal */}
      <Modal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
}

export default HomePage;
