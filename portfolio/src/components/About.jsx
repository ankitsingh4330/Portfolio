import React from 'react';

const About = () => {
  return (
    <section id="about" className="about-section" style={{ paddingTop: '80px' }}>
      <div className="container">
        <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '3rem', borderBottom: '3px solid white', display: 'inline-block', paddingBottom: '10px' }}>
          About Me
        </h2>
        
        <div className="about-content" style={{ alignItems: 'flex-start', gap: '5rem' }}>
          <div className="about-image-wrapper">
             <img 
               src="/profile.jpg" 
               alt="Ankit Kumar" 
               className="profile-img"
               style={{ borderRadius: '12px', width: '100%', maxWidth: '300px', boxShadow: '0 10px 40px rgba(0,0,0,0.6)' }}
             />
          </div>
          
          <div className="about-text" style={{ padding: '0', background: 'transparent', border: 'none', flex: '1.5' }}>
            <div className="personal-info text-main" style={{ marginBottom: '2.5rem', fontSize: '1.05rem' }}>
              <p style={{ margin: '0.8rem 0' }}><strong style={{ color: 'white', fontWeight: '600' }}>Name:</strong> <span className="text-muted">Ankit Kumar</span></p>
              <p style={{ margin: '0.8rem 0' }}><strong style={{ color: 'white', fontWeight: '600' }}>Email:</strong> <span className="text-muted">as6206128@gmail.com</span></p>
              <p style={{ margin: '0.8rem 0' }}><strong style={{ color: 'white', fontWeight: '600' }}>Phone No:</strong> <span className="text-muted">+91 93134 40858</span></p>
            </div>

            <p className="text-muted" style={{ lineHeight: '1.8', marginBottom: '2.5rem', fontSize: '1rem' }}>
              I am an enthusiastic Data Scientist and Analyst, passionate about learning and growing in the field of analytics, with a particular focus on machine learning and predictive modeling. Specializing in Python and data visualization, I have built numerous projects, constantly improving my skills and expanding my knowledge. I'm now ready to take on new challenges and start freelancing, offering creative and efficient solutions to bring innovative ideas to life.
            </p>
            
            <div className="about-buttons" style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="/Resume.pdf" className="btn btn-outline" target="_blank" rel="noopener noreferrer" style={{ borderRadius: '8px', padding: '0.8rem 2.5rem', fontWeight: '600', letterSpacing: '0.5px', transition: 'all 0.3s' }}>
                📄 Download Resume
              </a>
              <a href="#contact" className="btn btn-primary" style={{ borderRadius: '8px', padding: '0.8rem 2.5rem', fontWeight: '600', letterSpacing: '0.5px', boxShadow: '0 8px 25px rgba(37,99,235,0.4)', transition: 'all 0.3s' }}>
                🚀 Hire Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
