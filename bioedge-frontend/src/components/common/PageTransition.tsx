import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setAnimating(true);
    const timeout = setTimeout(() => {
      setAnimating(false);
    }, 400);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <div 
      key={location.pathname} 
      className={`page-transition-container ${animating ? 'page-enter-active' : ''}`}
    >
      {/* Top micro-loading progress bar */}
      {animating && <div className="route-top-progress-bar" />}
      {children}
    </div>
  );
};
