import React from 'react';

interface IconWrapperProps {
  icon: React.ComponentType<any>;
  size?: number;
  variant?: 'stroke' | 'solid' | 'bulk' | 'duotone' | 'twotone';
  className?: string;
}

/**
 * IconWrapper component for HugeIcons Pro
 * 
 * Usage with Pro Twotone style:
 * import { Home01Icon } from '@hugeicons/react';
 * <IconWrapper icon={Home01Icon} variant="twotone" size={24} />
 * 
 * The Pro styles (including twotone) require proper npm authentication
 * as documented in the README.md file.
 */
export const IconWrapper: React.FC<IconWrapperProps> = ({ 
  icon: Icon, 
  size = 24, 
  variant = 'twotone',
  className = '' 
}) => {
  return (
    <Icon 
      size={size}
      variant={variant}
      className={className}
    />
  );
};

// Example usage with Pro Twotone style
// Uncomment and import the desired icon from @hugeicons/react
// import { Home01Icon } from '@hugeicons/react';
// 
// export const HomeIconExample = () => (
//   <IconWrapper 
//     icon={Home01Icon} 
//     variant="twotone" 
//     size={24}
//     className="text-primary"
//   />
// );