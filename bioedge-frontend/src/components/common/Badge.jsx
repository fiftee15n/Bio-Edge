import React from 'react';

export const Badge = ({ children, variant = 'green', icon: Icon, className = '' }) => {
  const variantClass = {
    green: 'badge-green',
    amber: 'badge-amber',
    red: 'badge-red',
    info: 'badge-info',
    gray: 'badge-gray'
  }[variant] || 'badge-green';

  return (
    <span className={`badge ${variantClass} ${className}`}>
      {Icon && <Icon size={12} />}
      <span>{children}</span>
    </span>
  );
};
