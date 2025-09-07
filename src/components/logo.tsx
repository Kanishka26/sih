import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
        {...props}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" strokeWidth="1.5" />
      <path d="M7 13.023A3.5 3.5 0 0 0 10.5 16H12" strokeWidth="1.5" />
      <path d="M17 11a3.5 3.5 0 0 0-3.5-3.5H12" strokeWidth="1.5" />
      <path d="M10.5 8H12v8" strokeWidth="1.5" />
    </svg>
  );
}
