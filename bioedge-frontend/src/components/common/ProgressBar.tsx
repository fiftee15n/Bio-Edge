import React from 'react';

export interface ProgressBarProps {
  progress?: number;
  variant?: 'primary' | 'dark';
  showLabel?: boolean;
  height?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress = 0, 
  variant = 'primary', 
  showLabel = false, 
  height = 8 
}) => {
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <div className="progress-bar-wrapper">
      {showLabel && (
        <div className="progress-bar-label-row">
          <span className="progress-label-text">Progress</span>
          <span className="progress-percentage-text">{clamped}%</span>
        </div>
      )}
      <div className="progress-track" style={{ height: `${height}px` }}>
        <div
          className={`progress-fill ${variant === 'dark' ? 'progress-fill-dark' : ''}`}
          style={{ width: `${clamped}%` }}
        />
      </div>

      <style>{`
        .progress-bar-wrapper {
          width: 100%;
        }
        .progress-bar-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-dark);
          margin-bottom: 0.35rem;
        }
        .progress-percentage-text {
          color: var(--dark-green);
        }
      `}</style>
    </div>
  );
};
