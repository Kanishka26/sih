import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c-5 0-9-4.5-9-10 0-5.5 3.5-10 9-10 5.5 0 9 4.5 9 10" />
      <path d="M12 2a7.5 7.5 0 0 1 0 15" />
      <path d="M2 12h10" />
    </svg>
  );
}
