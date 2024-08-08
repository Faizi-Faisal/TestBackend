import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './PropertiesSection.css';
import { io } from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath, faShare, faWifi } from '@fortawesome/free-solid-svg-icons';

const PropertiesSection = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const socketRef = useRef(null);
  const navigate = useNavigate();

  const getPreferredTagClass = (preferredBy) => {
    switch (preferredBy) {
      case 'Boys':
        return 'preferred-tag boys';
      case 'Girls':
        return 'preferred-tag girls';
      case 'Unisex':
        return 'preferred-tag unisex';
      default:
        return 'preferred-tag';
    }
  };

  useEffect(() => {
    socketRef.current = io('https://ser-dep.vercel.app/'); // Replace with backend URL

    socketRef.current.on('connect_error', (err) => {
      setError(err.message);
      setLoading(false);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (hasMore) {
      socketRef.current.emit('getProperties', { page, limit: 10 });

      socketRef.current.on('propertiesData', ({ properties: newProperties, total }) => {
        setProperties((prevProperties) => [...prevProperties, ...newProperties]);
        setLoading(false);
        if (newProperties.length < 10) {
          setHasMore(false);
        }
      });
    }
  }, [page]);

  const observer = useRef();
  const lastPropertyElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  if (loading && page === 1) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <p>Internet Connection interrupted: {error}</p>;
  }

  const handleCardClick = (id) => {
    navigate(`/property/${id}`);
  }

  const handleRequestCallbackClick = (event) => {
    event.stopPropagation();
    console.log('Request Callback clicked');
  }

  const renderPropertyCard = (property, ref = null) => (
    <div ref={ref} key={property._id} className='listingsectionproperty-column'>
      <div className={getPreferredTagClass(property.preferredBy)}>{property.preferredBy}</div>
      <div className='listingsectionproperty-card' onClick={() => handleCardClick(property._id)}>
        <Carousel showArrows={true} showThumbs={false} infiniteLoop={true} autoPlay={true} emulateTouch={true}>
          {property.images.map((image, imgIndex) => (
            <div key={imgIndex}>
              <img src={image} alt={`Hostel Image ${imgIndex + 1}`} className='listingsectionproperty-image' />
            </div>
          ))}
        </Carousel>
        <div className='listingsectionproperty-content'>
          <h5 className='listingsectionproperty-title'>{property.hostelName}</h5>
          <p className='listingsectionproperty-subtitle'>{property.location}</p>
          <FontAwesomeIcon icon={faShare} className='card-icon-share' />
          <div className='pre-def-aminities-card row'>
            <p className='pre-def-wifi'><FontAwesomeIcon icon={faWifi} /> Wifi</p>
            <p className='pre-def-wash'><FontAwesomeIcon icon={faBath} /> Attached Washroom</p>
          </div>
          <div className='listingsectionproperty-mobile'>
            <div className='column'>
              <p className='listingsectionproperty-text-mobile'>Starting from</p>
              <p className='listingsectionproperty-price'>₹ {property.price} <span className='permonth-card-largescreen'>/month</span></p>
              <p className='listingsectionproperty-price-mobile'>₹ {property.price} <span className='permonth-card-largescreen'>/mo*</span></p>
            </div>
            <button className='listingsectionproperty-button' onClick={handleRequestCallbackClick}>Request Callback</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className='listedPropertySection'>
      <h2 className='exploreTopPgs'>
        Explore Top PG's in <span className='exploreTopPgsBanglore'>Bangalore</span>
      </h2>
      <div className='containerlistedSection'>
        <div className='listingsectionproperty-row'>
          {properties.map((property, index) => {
            if (properties.length === index + 1) {
              return renderPropertyCard(property, lastPropertyElementRef);
            } else {
              return renderPropertyCard(property);
            }
          })}
        </div>
      </div>
      {loading && <div>Loading...</div>}
    </section>
  );
};

export default PropertiesSection;
