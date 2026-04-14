import React from 'react';
import './About.css';
// import logo from './logo.png';
// import heroImage from './about-hero.png'; 

const About = () => {
  return (
    <div className="about-page">
      <main className="about-main">
        <div className="about-content">
          <div className="about-text-side">
            <h1 className="about-heading">
              RideWatch helps commuters track public transport vehicles and view accurate arrival times.
            </h1>
          </div>
          <div className="about-image-side">
            <div className="image-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '300px', minHeight: '200px' }}>
              <h1 style={{ color: '#8b0000', fontSize: '3rem', margin: 0, textAlign: 'center' }}>RIDEWATCH</h1>
            </div>
          </div>
        </div>
      </main>

      <footer className="about-footer">
        <p>© 2026-2027 RideWatch. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;