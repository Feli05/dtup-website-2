import React from 'react';

export function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect y={4} width={24} height={2} rx={1} fill="currentColor" />
      <rect y={11} width={24} height={2} rx={1} fill="currentColor" />
      <rect y={18} width={24} height={2} rx={1} fill="currentColor" />
    </svg>
  );
}