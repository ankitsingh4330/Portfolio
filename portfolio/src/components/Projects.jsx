import React, { useState } from 'react';
import { ExternalLink, Code } from 'lucide-react';

const Projects = () => {
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', 'Machine Learning', 'Data Analysis', 'Web Apps'];
  
  const projects = [
    {
      title: "Predictive Customer Churn Model",
      category: "Machine Learning",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
      desc: "Built a robust random forest classifier in Python to predict customer churn with 89% accuracy.",
      tech: ["Python", "Scikit-learn", "Pandas"],
      github: "#",
      live: "#"
    },
    {
      title: "Sales Global Dashboard",
      category: "Data Analysis",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
      desc: "Interactive Tableau dashboard visualizing multi-region sales data to identify trends and outliers.",
      tech: ["Tableau", "SQL", "Excel"],
      github: "#",
      live: "#"
    },
    {
      title: "CarLink360 - Analytics Portal",
      category: "Web Apps",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=600&auto=format&fit=crop",
      desc: "Full-stack web portal for car dealership analytics integrating REST APIs and database metrics.",
      tech: ["React", "Express", "MongoDB", "Node.js"],
      github: "#",
      live: "#"
    }
  ];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
        
        <div className="filter-tabs">
          {categories.map(cat => (
            <button 
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, idx) => (
            <div key={idx} className="project-card glass-panel">
              <div className="project-img-wrapper">
                <img src={project.image} alt={project.title} className="project-img" />
              </div>
              <div className="project-info">
                <span className="project-category">{project.category}</span>
                <h3>{project.title}</h3>
                <p className="text-muted">{project.desc}</p>
                <div className="project-tech">
                  {project.tech.map(t => <span key={t} className="tech-badge">{t}</span>)}
                </div>
                <div className="project-links">
                  <a href={project.github} className="icon-link"><Code size={20} /> Code</a>
                  <a href={project.live} className="icon-link"><ExternalLink size={20} /> Live Demo</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
