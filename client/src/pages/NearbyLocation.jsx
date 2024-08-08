import React from 'react';
import './NearbyLocation.css';

const NearbyLocation = () => {
  const properties = [
    { id: 1, title: 'Koramangala', subtitle: '', imageUrl: 'https://www.thehosteller.com/_next/image/?url=https%3A%2F%2Fstatic.thehosteller.com%2Fhostel%2Fimages%2Fsteptodown.com484392.jpg%2Fsteptodown.com484392-1699007580150.jpg&w=2048&q=75' },
    { id: 2, title: 'Jigani', subtitle: '', imageUrl: 'https://www.bangaloreupcomingprojects.com/urbanrise/urbanrise-jigani-hobli/images/urbanrise-jigani-elevation.jpg' },
    { id: 3, title: 'Indiranagar', subtitle: '', imageUrl: 'https://www.century-regalia.co/wp-content/uploads/2024/04/Exploring-Indiranagar-Bangalore-Unveiling-the-Charms-of-this-Vibrant-Locale.webp' },
    { id: 4, title: 'Hennur', subtitle: '', imageUrl: 'https://imagecdn.99acres.com/media1/25263/15/505275843M-1721281345393.webp' },
    { id: 5, title: 'Marathahalli', subtitle: '', imageUrl: 'https://rook.gumlet.io/uploads/center/cover_photo/5d94bda79540da5f28220726/5.jpg?format=webp&h=auto&compress=true' },
    { id: 6, title: 'Vijayanagar', subtitle: '', imageUrl: 'https://im.proptiger.com/1/3125119/6/anugraha-phase-2-elevation-121334419.jpeg' },
  ];

  return (
    <section className='NearbyPropertySection'>
      <h2 className='Nearby-section-title'>
        Nearby Stays Coming soon!
      </h2>
      <div className='NearbyPropertyGrid'>
        {properties.map(property => (
          <div className='NearbyPropertyCard' key={property.id}>
            <div className='NearbyPropertyCardContent'>
              <img src={property.imageUrl} alt={property.title} className='NearbyPropertyImage' />
              <div className='NearbyPropertyText'>
                <h3 className='NearbyPropertyTitle'>{property.title}</h3>
                <p className='NearbyPropertySubtitle'>{property.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NearbyLocation;
