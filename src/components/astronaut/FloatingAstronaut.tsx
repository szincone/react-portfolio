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
      opacity: [0, 0.6, 0.6, 0.6, 0],
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
            width: '60px',
            height: '60px',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          {/* Simple Professional Astronaut SVG - Monochromatic */}
          <svg
            width="60"
            height="60"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Helmet */}
            <circle cx="100" cy="80" r="40" fill="#FFFFFF" opacity="0.8" />
            <circle cx="100" cy="80" r="35" fill="#E8E8E8" opacity="0.6" />
            
            {/* Visor */}
            <ellipse cx="100" cy="80" rx="25" ry="20" fill="#D0D0D0" opacity="0.5" />
            
            {/* Body */}
            <rect x="75" y="115" width="50" height="60" rx="8" fill="#FFFFFF" opacity="0.8" />
            
            {/* Chest detail */}
            <rect x="85" y="125" width="30" height="35" rx="4" fill="#E8E8E8" opacity="0.6" />
            
            {/* Arms */}
            <rect x="55" y="120" width="15" height="40" rx="7" fill="#FFFFFF" opacity="0.7" />
            <rect x="130" y="120" width="15" height="40" rx="7" fill="#FFFFFF" opacity="0.7" />
            
            {/* Legs */}
            <rect x="80" y="170" width="15" height="25" rx="7" fill="#FFFFFF" opacity="0.8" />
            <rect x="105" y="170" width="15" height="25" rx="7" fill="#FFFFFF" opacity="0.8" />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingAstronaut;
