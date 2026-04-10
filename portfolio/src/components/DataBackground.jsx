import React, { useEffect, useRef } from 'react';

const DataBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let mouse = { x: -1000, y: -1000 };

    // Colors
    const colorPrimary = 'rgba(37, 99, 235, 1)'; // Blue
    const colorSecondary = 'rgba(6, 182, 212, 1)'; // Cyan
    const colorGlow = 'rgba(139, 92, 246, 0.5)'; // Purple glow

    // Resize handling
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    window.addEventListener('resize', resize);

    // Mouse handling
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    window.addEventListener('mouseleave', handleMouseLeave);

    // Particle definition
    class Particle {
      constructor(isChartNode = false, chartX = 0, chartY = 0) {
        this.radius = Math.random() * 2 + 1;
        this.x = isChartNode ? chartX : Math.random() * canvas.width;
        this.y = isChartNode ? chartY : Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.baseX = this.x;
        this.baseY = this.y;
        this.isChartNode = isChartNode;
        this.color = Math.random() > 0.5 ? colorPrimary : colorSecondary;
      }

      update() {
        if (!this.isChartNode) {
          this.x += this.vx;
          this.y += this.vy;

          if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
          if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        // Mouse interaction (parallax / subtle push)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;

        if (distance < maxDist && !this.isChartNode) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (maxDist - distance) / maxDist;
          this.x -= forceDirectionX * force * 2;
          this.y -= forceDirectionY * force * 2;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
      }
    }

    // Chart representation
    let chartNodes = [];
    const initChart = () => {
      chartNodes = [];
      const numPoints = 8;
      const startX = canvas.width * 0.1;
      const endX = canvas.width * 0.9;
      const stepX = (endX - startX) / (numPoints - 1);
      
      for (let i = 0; i < numPoints; i++) {
        const x = startX + i * stepX;
        const y = canvas.height * 0.5 + (Math.random() - 0.5) * canvas.height * 0.4;
        chartNodes.push(new Particle(true, x, y));
      }
    };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 100);
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
      initChart();
    };

    // Draw Grid
    const drawGrid = () => {
      const gridSize = 50;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      ctx.shadowBlur = 0;
      
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    // Animate Line Chart
    let chartOffset = 0;
    const drawChart = () => {
      if (chartNodes.length === 0) return;
      
      // Update chart nodes slowly for animation
      chartOffset += 0.005;
      chartNodes.forEach((node, idx) => {
        node.y = canvas.height * 0.5 + Math.sin(chartOffset + idx) * canvas.height * 0.2;
        node.draw();
      });

      // Draw lines between chart nodes
      ctx.beginPath();
      ctx.moveTo(chartNodes[0].x, chartNodes[0].y);
      for (let i = 1; i < chartNodes.length; i++) {
        ctx.lineTo(chartNodes[i].x, chartNodes[i].y);
      }
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.3)';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 15;
      ctx.shadowColor = colorSecondary;
      ctx.stroke();
      
      // Draw area under chart
      ctx.lineTo(chartNodes[chartNodes.length - 1].x, canvas.height);
      ctx.lineTo(chartNodes[0].x, canvas.height);
      ctx.closePath();
      
      const gradient = ctx.createLinearGradient(0, canvas.height * 0.3, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(6, 182, 212, 0.1)');
      gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.shadowBlur = 0; // Reset
    };

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawGrid();
      drawChart();

      // Update and draw particles
      particles.forEach(p => p.update());
      
      // Connect particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const opacity = 1 - (distance / 120);
            ctx.strokeStyle = `rgba(37, 99, 235, ${opacity * 0.3})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => p.draw());
      
      animationFrameId = requestAnimationFrame(animate);
    };

    // Initial setup
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        background: 'linear-gradient(to bottom, #000000, #0a0f1c)'
      }}
    />
  );
};

export default DataBackground;
