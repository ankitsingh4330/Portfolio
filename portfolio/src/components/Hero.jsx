import React, { useEffect, useState } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import DataBackground from './DataBackground';

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = "Data Scientist & Analyst";
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="hero-section">
      <div className="animated-bg text-left w-full">
        <DataBackground />
        <div className="video-overlay" style={{ background: 'transparent' }}></div>
      </div>
      
      <div className="container hero-container">
        <div className="hero-content">
          <p className="hero-greeting">Hi there, I am</p>
          <h1 className="hero-name">Ankit Kumar</h1>
          <h2 className="hero-title">
            <span className="typewriter">{text}</span>
            <span className="cursor">|</span>
          </h2>
          <p className="hero-description text-muted">
            I craft data-driven solutions and leverage machine learning to extract actionable insights. 
            Passionate about analytics, modeling, and turning complex data into compelling stories.
          </p>
          
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">
              View Work <ArrowRight size={18} />
            </a>
            <a href="/Resume.pdf" className="btn btn-outline" target="_blank" rel="noopener noreferrer" download="Ankit_Kumar_Resume.pdf">
              Resume <Download size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
