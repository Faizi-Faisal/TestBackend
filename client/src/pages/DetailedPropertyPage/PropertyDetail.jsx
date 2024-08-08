import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';
import './PropertyDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath, faShare, faWifi } from '@fortawesome/free-solid-svg-icons';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://ser-dep.vercel.app/api/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching property details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <p>Error loading property details: {error}</p>;
  }

  if (!property) {
    return <p>Property not found.</p>;
  }

  return (
    <div className='property-detail'>
      <h1>{property.hostelName}</h1>
      <p>{property.location}</p>
      <Carousel showArrows={true} showThumbs={false} infiniteLoop={true} autoPlay={true} emulateTouch={true}>
        {property.images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Hostel Image ${index + 1}`} />
          </div>
        ))}
      </Carousel>
      <div className='pre-def-aminities-card row'>
        <p className='pre-def-wifi'><FontAwesomeIcon icon={faWifi} /> Wifi</p>
        <p className='pre-def-wash'><FontAwesomeIcon icon={faBath} /> Attached Washroom</p>
      </div>
      <div className='listingsectionproperty-mobile-Detailed'>
        <div className='column'>
          <p className='listingsectionproperty-text-mobile-Detailed'>Starting from</p>
          <p className='listingsectionproperty-price-Detailed'>₹ {property.price} <span className='permonth-card-largescreen'>/month</span></p>
        </div>
        <button className='listingsectionproperty-button-Detailed'>Request Callback</button>
      </div>
    </div>
  );
};

export default PropertyDetail;
