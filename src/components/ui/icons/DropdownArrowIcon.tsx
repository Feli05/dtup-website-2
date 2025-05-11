import { SVGProps } from 'react';

interface DropdownArrowIconProps extends SVGProps<SVGSVGElement> {}

export default function DropdownArrowIcon({ className, ...props }: DropdownArrowIconProps) {
  return (
    <svg 
      className={className}
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
      width="16"
      height="16"
      {...props}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth="2" 
        d="M19 9l-7 7-7-7" 
      />
    </svg>
  );
} 