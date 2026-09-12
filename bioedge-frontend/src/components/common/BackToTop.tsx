import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      // Calculate scroll progress percentage (0 - 100)
      if (scrollHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
        setScrollProgress(progress);
      }

      // Show button when scrolled past 280px
      if (scrollTop > 280) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // SVG Circular progress math
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      type="button"
      className={`back-to-top-btn ${visible ? 'is-visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      title="Back to Top (Upper Arrow)"
    >
      {/* Circular Progress Ring */}
      <svg className="scroll-progress-ring" width="48" height="48" viewBox="0 0 48 48">
        <circle
          className="progress-ring-bg"
          stroke="rgba(255, 255, 255, 0.28)"
          strokeWidth="3"
          fill="transparent"
          r={radius}
          cx="24"
          cy="24"
        />
        <circle
          className="progress-ring-circle"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx="24"
          cy="24"
        />
      </svg>

      <div className="back-to-top-icon">
        <ArrowUp size={22} className="arrow-icon-svg" strokeWidth={2.4} />
      </div>
    </button>
  );
};

