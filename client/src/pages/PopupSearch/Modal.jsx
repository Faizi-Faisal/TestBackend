import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Modal.css';

const Modal = ({ isOpen, onClose }) => {
  const [selected, setSelected] = useState(null);
  const [areaSelected, setAreaSelected] = useState(null); // State for area selection
  const [loading, setLoading] = useState(false); // State for loading indicator
  const navigate = useNavigate(); // Hook for navigation

  const handleClose = () => {
    setSelected(null); // Reset the selected state when closing the modal
    setAreaSelected(null); // Reset the area selection
    onClose();
  };

  const handleSelect = (index) => {
    setSelected(index);
  };

  const handleAreaSelect = async (index) => {
    setAreaSelected(index);
    if (index !== null && selected === 0) { // If an area is selected and Bangalore is chosen
      setLoading(true); // Show loading indicator
      // Simulate loading time
      setTimeout(() => {
        setLoading(false); // Hide loading indicator
        navigate('/'); // Navigate to the root path
        handleClose(); // Close the modal
      }, 200); // Adjust timeout as needed
    }
  };

  const locations = [
    { image: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/2d2d1c41951119.57bd38bb0b959.png', description: 'Banglore' },
    { image: 'https://www.shutterstock.com/image-vector/chennai-city-icon-central-station-260nw-2184117677.jpg', description: 'Chennai' },
    { image: 'https://as2.ftcdn.net/v2/jpg/02/81/01/81/1000_F_281018144_TGyTvl2QFvPOzfZ38Rm2dZ2j2Y5Yk8X4.jpg', description: 'Delhi' },
    { image: 'https://as1.ftcdn.net/v2/jpg/02/81/01/82/1000_F_281018227_nFn3vIYTQ14Yg2Yvz55GNM2sh5tzhGrK.jpg', description: 'Mumbai' },
    { image: 'https://as1.ftcdn.net/v2/jpg/02/81/01/82/1000_F_281018202_g9sN7xwFfYrds9Rsgp8UwaUNEvcaKOoq.jpg', description: 'Kolkata' },
    { image: 'https://as1.ftcdn.net/v2/jpg/02/81/01/82/1000_F_281018204_Gtd6UlkyMrUFIF7QzbpnXF0fCO3cYREe.jpg', description: 'Jaipur' },
  ];

  const areas = [
    { description: 'Jigani' },
  ];

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={handleClose}>X</button>
        <h2 className='modal-loc-title'>Select Location</h2>
        <div className='image-grid'>
          {locations.map((item, index) => (
            <div
              key={index}
              className={`image-box ${selected === index ? 'selected' : ''}`}
              onClick={() => handleSelect(index)}
            >
              <img src={item.image} alt={`Image ${index + 1}`} />
              <div className="image-description">{item.description}</div>
            </div>
          ))}
        </div>
        {selected === 0 ? ( // Only show area selection if Bangalore is selected
          <>
            <h2 className='modal-loc-title'>Select Area</h2>
            <div className='area-grid'>
              {areas.map((item, index) => (
                <div
                  key={index}
                  className={`area-box ${areaSelected === index ? 'selected' : ''}`}
                  onClick={() => handleAreaSelect(index)}
                >
                  <div className="area-description">{item.description}</div>
                </div>
              ))}
            </div>
          </>
        ) : (selected !== null && (
          <p className='danger-message'>
            Currently, we are not serving the selected location. 
            <span className='dmes-span'> We are only in Banglore</span>
          </p>
        ))}
        {loading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
