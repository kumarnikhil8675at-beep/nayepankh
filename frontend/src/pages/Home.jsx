import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Quote } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const coursesRef = useRef(null);

  // Hook for intersection observer
  const [galleryRef, setGalleryRef] = useState(null);
  const [isGalleryVisible, setIsGalleryVisible] = useState(false);

  const reviews = [
    {
      id: 1,
      text: "NayePankh Foundation promotes the culture of kidness and wants to instill the sense of giving back to the society amongst modern youth..",
      avatar: "https://ik.imagekit.io/hswujnlap/Screenshot%202026-06-15%20235942.jpg",
    },
    {
      id: 2,
      text: "NayePankh Foundation has been working since 2021 for under and less priveleged people in the field of hunger, sanitary, health, education, awarness and rights..",
      avatar: "https://ik.imagekit.io/hswujnlap/Screenshot%202026-06-16%20000231.jpg",
    },
    {
      id: 3,
      text: "NayePankh Foundation works with a vision to create a society where children can prosper to their complete potential and enjoy equality in its true essence.",
      avatar: "https://ik.imagekit.io/hswujnlap/Screenshot%202026-06-15%20235433.jpg",
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsGalleryVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (galleryRef) {
      observer.observe(galleryRef);
    }
    return () => {
      if (galleryRef) observer.unobserve(galleryRef);
    };
  }, [galleryRef]);

  return (
    <div className="home-full-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div>
        <h1 style={{ fontSize: '5rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.1' }}>
          Nayepankh <span style={{ color: 'var(--accent-primary)' }}>Foundation</span>
        </h1>
        <div style={{ fontSize: '1.5rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto 2rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-base)' }}>It's that easy to bring a Smile on Their Faces</h2>
          <p style={{ fontSize: '1.1rem' }}>We don't ask for much, just help us with what you can- Be it Money, Skill or Your Time</p>
        </div>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => coursesRef.current?.scrollIntoView({ behavior: 'smooth' })}>Explore Us</button>
          <button className="btn btn-secondary" onClick={() => navigate('/donate')}>Donate Now</button>
        </div>
        </div>
        <div className='hero'></div>
      </section>

     

      {/* Courses Section */}
      <section ref={coursesRef} className="landing-section section-surface">
        <div className="page-container" style={{ padding: 0,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>About us</h2>
            <h1 style={{fontWeight:'bold',fontSize:'3rem'}}>Think global, Act local.</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2rem' }}>"NayePankh Foundation" is a non governmental organisation with a strong desire to help the society and make it a better place for all, by doing everything in our power and to make our vision successful we would require your vital support. Service to mankind is the service to god. Let’s revolutionise the society together!.</p>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}></div>
          </div><div className='iimage'></div>
        </div>
      </section>

      {/* Student Reviews Section */}
      <section className="landing-section section-alternate" style={{ overflow: 'hidden' }}>
        <div className="reviews-section" style={{ padding: 0 }}>
        <div className="reviews-header">
          <h2>Welcome to NayePankh Foundation</h2>
          <p>We are one of the Biggest Student led NGO of India with its operations extended in the city of Kanpur, Ghaziabad and various other cities.</p>
        </div>
        <div className="reviews-marquee">
          <div className="reviews-content">
            {/* Map reviews twice for infinite scroll effect */}
            {[...reviews, ...reviews, ...reviews].map((review, idx) => (
              <div key={idx} className="review-card">
                <Quote size={40} className="review-quote-icon" />
                <p className="review-text">"{review.text}"</p>
                <div className="review-footer">
                  <div className="review-author">
                    <img src={review.avatar} alt={review.name} className="review-avatar" />
                    {/* <div className="review-author-info">
                      <span className="review-author-name">{review.name}</span>
                      <span className="review-author-role">{review.role}</span>
                    </div> */}
                  </div>
                  {/* <div className="review-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} strokeWidth={i < review.rating ? 0 : 2} color={i < review.rating ? "#fbbf24" : "#cbd5e1"} />
                    ))}
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* Masonry Photo Gallery */}
      <section className="landing-section section-surface">
        <div className="page-container" style={{ padding: 0 }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>Spotlights</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>See what our Foundation is building and achieving.</p>
          </div>
          <div className="masonry-grid" ref={setGalleryRef}>
            {/* Tall Card (Col 1) */}
            <div className={`gallery-card tall-card ${isGalleryVisible ? 'scroll-visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
                <video
                src="https://ik.imagekit.io/hswujnlap/vidssave.com%20Lets%20spread%20some%20lve%20and%20make%20this%20talent%20go%20viral_%20_NayepankhFoundation%20_SupportTheUnderprivileged%20240P.mp4"
                className="gallery-image"
                autoPlay
                muted
                loop
                 playsInline
                />
                <div className="gallery-overlay">
                    <h3>#Nayepankh<br/>Foundation</h3>
                    <p>Lets spread some lve and make this talent go viral🌟</p>
                </div>
            </div>
            
            {/* Wide Card (Col 2 & 3 top) */}
            <div className={`gallery-card wide-card ${isGalleryVisible ? 'scroll-visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
                <img src="https://ik.imagekit.io/hswujnlap/1-YD0yJ4erqEIN3ZWV.avif" alt="Group" className="gallery-image" />
                <div className="gallery-overlay">
                    <h3>OUR TEAM</h3>
                    <p>"Join our team and make a difference in the lives of those in need. At NayePankh Foundation, we are committed to creating positive change and empowering communities. By joining our team, you will have the opportunity to contribute your time, skills, and ideas to help make a real impact. Whether you are passionate about education, health, or providing support during times of crisis, there is a place for you on our team. Join us today and be a part of an organization that is making a difference, one person at a time."</p>
                </div>
            </div>
            
            {/* Standard Card (Col 4 top) */}
            <div className={`gallery-card ${isGalleryVisible ? 'scroll-visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
                <img src="https://ik.imagekit.io/hswujnlap/whatsapp-image-2023-02-05-at-9.13.05-am-AzGEo7LOeZi2gn9v.webp" alt="Student Spotlight" className="gallery-image" />
                <div className="gallery-overlay">
                    <h3>NayePankh Foundation</h3>
                    <p>We are one of the Biggest Student led NGO of India with its operations extended in the city of Kanpur, Ghaziabad and various other cities.</p>
                </div>
            </div>
            
            {/* Standard Card (Col 2 bottom) */}
            <div className={`gallery-card ${isGalleryVisible ? 'scroll-visible' : ''}`} style={{ transitionDelay: '0.4s' }}>
                <div style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'white' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: 'bold' }}>4.89</h2>
                    <p style={{ fontSize: '1.5rem' }}>Thousand.</p>
                </div>
                <div className="gallery-overlay">
                    <h3>YouTube Subscribers</h3>
                    <p>4.89K subscribers</p>
                </div>
            </div>


             <div className={`gallery-card wide-card ${isGalleryVisible ? 'scroll-visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
                <img src="https://ik.imagekit.io/hswujnlap/whatsapp-image-2023-02-15-at-9.17.30-pm-AVLPXr08jETq2nyv.avif" alt="Group" className="gallery-image" />
                <div className="gallery-overlay">
                    <h3>Welcome to NayePankh Foundation</h3>
                    <p>UP GOVT. | 80G & 12A Registered</p>
                </div>
            </div>

            
        </div>
        </div>
      </section>
    </div>
  );
}
