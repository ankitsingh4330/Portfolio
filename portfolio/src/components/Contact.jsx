import React, { useState } from 'react';
import { Mail, MapPin, Phone, Code, Link, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    setStatus('loading');
    
    // Convert FormData to JSON
    const formData = new FormData(form);
    const object = {};
    formData.forEach((value, key) => { object[key] = value });
    
    try {
      // using the /ajax/ prefix disables the external redirect
      const res = await fetch("https://formsubmit.co/ajax/as6206128@gmail.com", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(object)
      });
      
      const data = await res.json();
      if (data.success === "true" || data.success === true) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus(''), 5000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="section-title">Get In <span className="gradient-text">Touch</span></h2>
        
        <div className="contact-grid">
          <div className="contact-info glass-panel">
            <h3>Let's talk about <br/><span className="gradient-text">Data</span></h3>
            <p className="text-muted mb-4">
              I am currently open to full-time opportunities or freelance projects. Connect with me if you want to turn your data into insights!
            </p>
            
            <div className="info-items">
              <div className="info-item">
                <div className="icon-box"><Mail size={20}/></div>
                <div>
                  <h4>Email</h4>
                  <p className="text-muted">as6206128@gmail.com</p>
                </div>
              </div>
              <div className="info-item">
                <div className="icon-box"><MapPin size={20}/></div>
                <div>
                  <h4>Location</h4>
                  <p className="text-muted">India</p>
                </div>
              </div>
            </div>

            <div className="social-links">
               <a href="#" className="social-link"><Code size={20} /></a>
               <a href="#" className="social-link"><Link size={20} /></a>
               <a href="#" className="social-link"><MessageSquare size={20} /></a>
            </div>
          </div>

          <form className="contact-form glass-panel" onSubmit={handleSubmit}>
            <input type="hidden" name="_subject" value="New Contact from Portfolio!" />
            <input type="text" name="_honey" style={{ display: 'none' }} />
            
            <div className="form-group">
              <label>Your Name</label>
              <input type="text" name="name" placeholder="John Doe" required />
            </div>
            <div className="form-group">
              <label>Your Email</label>
              <input type="email" name="email" placeholder="john@example.com" required />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea name="message" rows={5} placeholder="How can I help you?" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-full" disabled={status === 'loading'} style={{ justifyContent: 'center' }}>
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'success' && <p style={{ color: '#4ade80', marginTop: '1rem', textAlign: 'center' }}>Message sent successfully!</p>}
            {status === 'error' && <p style={{ color: '#f87171', marginTop: '1rem', textAlign: 'center' }}>Failed to send. Please try again.</p>}
          </form>
        </div>
      </div>
      <div className="footer-bottom">
         <p className="text-muted text-center">© 2026 Ankit Kumar. All rights reserved.</p>
      </div>
    </section>
  );
};

export default Contact;
