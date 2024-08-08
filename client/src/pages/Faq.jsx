import React, { useEffect, useRef } from 'react';
import './Faq.css';

const Faq = () => {
  const faqContainerRef = useRef(null);

  const faqData = [
    {
      question: "What amenities are offered at heavens living  With food?",
      answer: "At Heavens living residents can enjoy fully furnished rooms with comfortable beds, wardrobes, and study tables, high-speed Wi-Fi, 24/7 power backup, and purified drinking water. Additional amenities include daily housekeeping services, laundry facilities, nutritious meals prepared in-house, lounges, recreational zones, and gym facilities."
    },
    {
      question: "Are there any specific rules or regulations for residents at heavens living With food PGs for girls & boys?",
      answer: "Yes, to ensure a harmonious living environment, we have set some basic rules and regulations for our residents. These include maintaining cleanliness, adhering to noise levels after certain hours, Detailed rules will be shared upon booking confirmation."
    },
    {
      question: "What is the accommodation capacity of Heavens living  With food?",
      answer: "Our PGs in With food offer various accommodation options, including single, double, and triple occupancy rooms. The total capacity varies depending on the property, but we ensure that each resident has ample space and comfort. Specific capacity details can be provided based on the exact property you are interested in."
    },
    {
      question: "What are the different room options available at Heavens living?",
      answer: "We offer a variety of room configurations to suit different preferences and budgets. These include single occupancy rooms for those who prefer privacy, double occupancy rooms for shared living, and triple occupancy rooms for more affordable options. Each room is well-furnished and equipped with modern amenities."
    },
    {
      question: "Are there any additional charges or hidden fees associated with the heavens living?",
      answer: "At Heavens living, we believe in transparency. The monthly rent covers all basic amenities including Wi-Fi, housekeeping, and meals. Any additional services, such as laundry or special meal requests, may incur extra charges, which will be clearly communicated during the booking process. There are no hidden fees."
    },
    {
      question: "Does heavens living properties have a power backup and a water purifier?",
      answer: "Yes, all our PG properties in With food come equipped with 24/7 power backup to ensure uninterrupted electricity supply. We also provide purified drinking water through advanced water purifiers installed in our facilities."
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1
      }
    );

    const faqItems = faqContainerRef.current.querySelectorAll('.faq-item');
    faqItems.forEach((item) => {
      observer.observe(item);
    });

    return () => {
      faqItems.forEach((item) => {
        observer.unobserve(item);
      });
    };
  }, []);

  return (
    <>
     <h2 className='Faq-section-title'>
        Frequently Asked Questions (FAQ)
      </h2>
    <div className="faq-container" ref={faqContainerRef}>
      {faqData.map((item, index) => (
        <div className="faq-item" key={index}>
          <div className="faq-timeline">
            <div className="faq-circle"></div>
            {index < faqData.length - 1 && <div className="faq-line"></div>}
          </div>
          <div className="faq-content">
            <h3 className="faq-question">{item.question}</h3>
            <p className="faq-answer">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}

export default Faq;
