import React, { useState } from 'react';

const Skills = () => {
  const [activeTab, setActiveTab] = useState('Data Science');

  const tabs = ['Data Science', 'Data Analytics', 'Tools & Platforms'];
  
  const skillsData = {
    'Data Science': [
      { name: 'Python (Pandas, NumPy, Scikit-learn)', level: 90 },
      { name: 'Machine Learning Models', level: 85 },
      { name: 'Deep Learning (TensorFlow/Keras)', level: 70 },
      { name: 'NLP & LLMs', level: 65 },
    ],
    'Data Analytics': [
      { name: 'SQL (PostgreSQL, MySQL)', level: 95 },
      { name: 'Data Visualization (Tableau, PowerBI)', level: 85 },
      { name: 'Statistical Testing & A/B Testing', level: 80 },
      { name: 'Excel (Advanced)', level: 90 },
    ],
    'Tools & Platforms': [
      { name: 'Jupyter Notebooks', level: 95 },
      { name: 'Git & GitHub', level: 85 },
      { name: 'AWS / Cloud Computing', level: 70 },
      { name: 'Docker / deployment', level: 60 },
    ]
  };

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <h2 className="section-title">My <span className="gradient-text">Skills</span></h2>
        
        <div className="tabs-container">
          <div className="glass-panel tabs-header">
            {tabs.map((tab) => (
              <button 
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="glass-panel tabs-content">
            {skillsData[activeTab].map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="skill-info">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percent">{skill.level}%</span>
                </div>
                <div className="progress-bar-bg">
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
