import React from 'react';

interface IconWrapperProps {
  icon: React.ComponentType<any>;
  size?: number;
  className?: string;
}

/**
 * Generic IconWrapper component
 * 
 * Can be used to wrap any icon component library
 * Currently optimized for Lucide React icons
 */
export const IconWrapper: React.FC<IconWrapperProps> = ({ 
  icon: Icon, 
  size = 24, 
  className = '' 
}) => {
  return (
    <Icon 
      size={size}
      className={className}
    />
  );
};