import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
      <path d="M12 5v2.5" />
      <path d="M12 16.5V19" />
      <path d="M16.5 7.5L14.75 9.25" />
      <path d="M9.25 14.75L7.5 16.5" />
      <path d="M19 12h-2.5" />
      <path d="M7.5 12H5" />
      <path d="M16.5 16.5L14.75 14.75" />
      <path d="M9.25 9.25L7.5 7.5" />
    </svg>
  );
}
