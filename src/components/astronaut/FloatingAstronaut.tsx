import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingAstronaut: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const scheduleNextAppearance = () => {
      // Random interval between 10 to 60 seconds
      const randomDelay = Math.random() * (60000 - 10000) + 10000;
      
      const timeoutId = setTimeout(() => {
        setIsVisible(true);
        
        // Hide astronaut after animation completes (12 seconds)
        setTimeout(() => {
          setIsVisible(false);
          scheduleNextAppearance();
        }, 12000);
      }, randomDelay);
      
      return timeoutId;
    };

    const timeoutId = scheduleNextAppearance();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const astronautVariants = {
    hidden: {
      x: '-20vw',
      y: '120vh',
      opacity: 0,
      rotate: -15,
      scale: 0.8,
    },
    visible: {
      x: '120vw',
      y: '-20vh',
      opacity: [0, 1, 1, 1, 0],
      rotate: 15,
      scale: 1,
      transition: {
        duration: 12,
        ease: 'linear',
        opacity: {
          times: [0, 0.1, 0.8, 0.9, 1],
          duration: 12,
        },
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={astronautVariants}
          style={{
            position: 'fixed',
            width: '150px',
            height: '150px',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          {/* Simple Astronaut SVG */}
          <svg
            width="150"
            height="150"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Helmet/Head */}
            <circle cx="100" cy="70" r="45" fill="#E8F4F8" opacity="0.9" />
            <circle cx="100" cy="70" r="42" fill="#4A90E2" opacity="0.3" />
            
            {/* Visor reflection */}
            <ellipse cx="90" cy="60" rx="15" ry="20" fill="#FFFFFF" opacity="0.6" />
            
            {/* Face shield */}
            <path
              d="M 70 70 Q 100 90 130 70"
              stroke="#1E3A5F"
              strokeWidth="3"
              fill="none"
              opacity="0.4"
            />
            
            {/* Body */}
            <ellipse cx="100" cy="130" rx="35" ry="45" fill="#F0F0F0" />
            
            {/* Chest panel */}
            <rect x="85" y="110" width="30" height="35" rx="3" fill="#4A90E2" opacity="0.6" />
            
            {/* Arms */}
            <ellipse 
              cx="65" 
              cy="125" 
              rx="12" 
              ry="35" 
              fill="#F0F0F0"
              transform="rotate(-20 65 125)"
            />
            <ellipse 
              cx="135" 
              cy="125" 
              rx="12" 
              ry="35" 
              fill="#F0F0F0"
              transform="rotate(20 135 125)"
            />
            
            {/* Gloves */}
            <circle cx="60" cy="150" r="10" fill="#4A90E2" opacity="0.8" />
            <circle cx="140" cy="150" r="10" fill="#4A90E2" opacity="0.8" />
            
            {/* Legs */}
            <rect x="80" y="165" width="15" height="25" rx="7" fill="#F0F0F0" />
            <rect x="105" y="165" width="15" height="25" rx="7" fill="#F0F0F0" />
            
            {/* Boots */}
            <ellipse cx="87" cy="190" rx="12" ry="8" fill="#1E3A5F" />
            <ellipse cx="112" cy="190" rx="12" ry="8" fill="#1E3A5F" />
            
            {/* Backpack/Life support */}
            <rect x="90" y="115" width="20" height="30" rx="3" fill="#4A90E2" opacity="0.7" />
            <circle cx="95" cy="125" r="3" fill="#00D4FF" />
            <circle cx="105" cy="125" r="3" fill="#00D4FF" />
            
            {/* Antenna */}
            <line x1="100" y1="25" x2="100" y2="35" stroke="#FFD700" strokeWidth="2" />
            <circle cx="100" cy="23" r="3" fill="#FFD700" />
            
            {/* Stars around astronaut for effect */}
            <circle cx="30" cy="40" r="2" fill="#FFD700" opacity="0.8">
              <animate
                attributeName="opacity"
                values="0.8;0.3;0.8"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="170" cy="100" r="2" fill="#00D4FF" opacity="0.8">
              <animate
                attributeName="opacity"
                values="0.8;0.3;0.8"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="50" cy="150" r="1.5" fill="#FFFFFF" opacity="0.8">
              <animate
                attributeName="opacity"
                values="0.8;0.3;0.8"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingAstronaut;
