// src/components/visuals/KnowledgeFlowVisualization.jsx
import React, { useEffect, useRef, useState } from 'react';

const KnowledgeFlowVisualization = () => {
  const [animationState, setAnimationState] = useState('initial');
  const [expertNodesActive, setExpertNodesActive] = useState([false, false, false, false, false]);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
  // Animation phases timing
  useEffect(() => {
    // Start connections expanding
    const connectionsTimer = setTimeout(() => {
      setAnimationState('connecting');
    }, 1500);
    
    // Activate expert nodes one by one
    const activateNodes = expertNodesActive.map((_, index) => {
      return setTimeout(() => {
        setExpertNodesActive(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, 2500 + (index * 300));
    });
    
    // Start return flow
    const returnFlowTimer = setTimeout(() => {
      setAnimationState('returning');
    }, 4500);
    
    // Complete the visualization
    const completionTimer = setTimeout(() => {
      setAnimationState('complete');
    }, 7000);
    
    // Reset and restart the animation
    const resetTimer = setTimeout(() => {
      setAnimationState('initial');
      setExpertNodesActive([false, false, false, false, false]);
    }, 10000);
    
    return () => {
      clearTimeout(connectionsTimer);
      activateNodes.forEach(timer => clearTimeout(timer));
      clearTimeout(returnFlowTimer);
      clearTimeout(completionTimer);
      clearTimeout(resetTimer);
    };
  }, [animationState === 'initial']);
  
  // Canvas drawing for connection lines and particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Central position
    const centerX = width / 2;
    const centerY = height / 2;
    const centerRadius = 8; // Radius of center node (half of its width/height)
    
    // Expert node positions (in circular arrangement)
    const expertPositions = [];
    const radius = Math.min(width, height) * 0.35;
    const expertCount = 5;
    const expertRadius = 6; // Radius of expert nodes (half of their width/height)
    
    for (let i = 0; i < expertCount; i++) {
      const angle = (i * 2 * Math.PI / expertCount) - Math.PI/2;
      expertPositions.push({
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
        angle: angle
      });
    }
    
    // Particles for return flow
    const particles = [];
    if (animationState === 'returning' || animationState === 'complete') {
      expertPositions.forEach((pos, idx) => {
        if (expertNodesActive[idx]) {
          for (let i = 0; i < 3; i++) {
            particles.push({
              x: pos.x,
              y: pos.y,
              targetX: centerX,
              targetY: centerY,
              progress: Math.random() * 0.4, // Start at different positions
              speed: 0.01 + Math.random() * 0.005,
              size: 3 + Math.random() * 3,
              expertIndex: idx
            });
          }
        }
      });
    }
    
    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw connection lines
      if (animationState !== 'initial') {
        expertPositions.forEach((pos, idx) => {
          if (animationState === 'connecting') {
            // Draw expanding lines with adjusted start/end points
            const progress = expertNodesActive[idx] ? 1 : Math.min((Date.now() % 3000) / 3000, 1);
            drawConnectionLine(ctx, centerX, centerY, pos, progress, centerRadius, expertRadius);
          } else {
            // Draw full lines with adjusted start/end points
            drawConnectionLine(ctx, centerX, centerY, pos, 1, centerRadius, expertRadius);
          }
        });
      }
      
      // Update and draw particles
      if (particles.length > 0) {
        particles.forEach(particle => {
          // Update position along the path
          particle.progress += particle.speed;
          
          // Calculate current position
          const currentX = particle.x + (particle.targetX - particle.x) * particle.progress;
          const currentY = particle.y + (particle.targetY - particle.y) * particle.progress;
          
          // Draw the particle
          ctx.beginPath();
          const gradient = ctx.createRadialGradient(
            currentX, currentY, 0,
            currentX, currentY, particle.size
          );
          
          // Get expert color based on index
          const expertHue = 260 + (particle.expertIndex * 15); // Varying purple hues
          gradient.addColorStop(0, `hsla(${expertHue}, 80%, 70%, 0.9)`);
          gradient.addColorStop(1, `hsla(${expertHue}, 80%, 70%, 0)`);
          
          ctx.fillStyle = gradient;
          ctx.arc(currentX, currentY, particle.size, 0, Math.PI * 2);
          ctx.fill();
          
          // Remove particles that reached the target
          if (particle.progress >= 1) {
            const index = particles.indexOf(particle);
            if (index > -1) {
              particles.splice(index, 1);
            }
            
            // Add pulse effect to center when particle arrives
            addPulseToCenter();
          }
        });
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Helper function for pulse effect
    const pulses = [];
    function addPulseToCenter() {
      pulses.push({
        radius: 10,
        opacity: 0.7,
        growing: true
      });
    }
    
    // Draw connection lines with gradient, respecting node boundaries
    function drawConnectionLine(ctx, centerX, centerY, expertPos, progress, centerRadius, expertRadius) {
      // Calculate vectors for the line
      const dx = expertPos.x - centerX;
      const dy = expertPos.y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Normalize direction vector
      const unitX = dx / distance;
      const unitY = dy / distance;
      
      // Calculate start point (edge of center node)
      const startX = centerX + unitX * centerRadius;
      const startY = centerY + unitY * centerRadius;
      
      // Calculate end point (edge of expert node)
      const fullEndX = expertPos.x - unitX * expertRadius;
      const fullEndY = expertPos.y - unitY * expertRadius;
      
      // Calculate current end point based on progress
      const lineLength = Math.sqrt(
        Math.pow(fullEndX - startX, 2) + 
        Math.pow(fullEndY - startY, 2)
      );
      const currentLength = lineLength * progress;
      
      // Current end point
      const currentEndX = startX + unitX * currentLength;
      const currentEndY = startY + unitY * currentLength;
      
      // Create gradient for the line
      const gradient = ctx.createLinearGradient(startX, startY, currentEndX, currentEndY);
      gradient.addColorStop(0, 'rgba(128, 50, 200, 0.7)');
      gradient.addColorStop(1, 'rgba(180, 130, 230, 0.3)');
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(currentEndX, currentEndY);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Add subtle glow effect
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(currentEndX, currentEndY);
      ctx.strokeStyle = 'rgba(180, 100, 240, 0.2)';
      ctx.lineWidth = 5;
      ctx.stroke();
    }
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animationState, expertNodesActive]);
  
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative h-full w-full">
        {/* Canvas for drawing connections and particles */}
        <canvas 
          ref={canvasRef} 
          width={600} 
          height={600} 
          className="absolute top-0 left-0 w-full h-full"
        />
        
        {/* Central question node */}
        <div 
          className={`absolute left-1/2 top-1/2 w-16 h-16 transform -translate-x-1/2 -translate-y-1/2 
                      bg-purple-800 rounded-full flex items-center justify-center z-10
                      ${animationState === 'complete' ? 'scale-110' : 'scale-100'}
                      transition-all duration-700`}
          style={{
            boxShadow: `0 0 ${animationState === 'complete' ? '30px' : '15px'} rgba(126, 34, 206, ${animationState === 'complete' ? '0.6' : '0.3'})`
          }}
        >
          {/* Pulsing effect for question node */}
          <div 
            className={`absolute inset-0 bg-purple-600 rounded-full 
                        ${animationState !== 'initial' ? 'animate-pulse' : ''}
                        ${animationState === 'complete' ? 'opacity-80' : 'opacity-50'}`}
          />
          
          {/* Solid question mark */}
          <div className="text-white text-2xl font-bold relative z-20">
            ?
          </div>
        </div>
        
        {/* Expert nodes */}
        {[0, 1, 2, 3, 4].map((index) => {
          // Calculate position in a circle around the center
          const angle = (index * 2 * Math.PI / 5) - Math.PI/2; // Start from top
          const radius = 180;
          const x = 300 + radius * Math.cos(angle);
          const y = 300 + radius * Math.sin(angle);
          
          // Convert from canvas coords to div positioning
          const divX = (x / 600) * 100;
          const divY = (y / 600) * 100;
          
          return (
            <div
              key={index}
              className={`absolute w-12 h-12 transform -translate-x-1/2 -translate-y-1/2
                         bg-purple-100 rounded-full flex items-center justify-center
                         transition-all duration-500
                         ${expertNodesActive[index] ? 'bg-purple-500 scale-110' : 'scale-100'}`}
              style={{ 
                left: `${divX}%`, 
                top: `${divY}%`,
                boxShadow: expertNodesActive[index] 
                  ? '0 0 20px rgba(126, 34, 206, 0.5)' 
                  : '0 0 5px rgba(126, 34, 206, 0.2)'
              }}
            >
              {/* Particle emission effect */}
              {expertNodesActive[index] && animationState === 'returning' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full absolute animate-ping rounded-full bg-purple-400 opacity-20" />
                </div>
              )}
              
              {/* Expert icon */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                className={`w-6 h-6 ${expertNodesActive[index] ? 'text-white' : 'text-purple-700'}`}
              >
                <path 
                  fill="currentColor" 
                  d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z"
                />
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KnowledgeFlowVisualization;