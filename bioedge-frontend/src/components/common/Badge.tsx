import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'amber' | 'red' | 'info' | 'gray';
  icon?: LucideIcon;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'green', 
  icon: Icon, 
  className = '' 
}) => {
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
