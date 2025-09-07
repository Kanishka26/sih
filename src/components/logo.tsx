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
        <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" strokeWidth="1.5" />
        <path d="M7 12H17" strokeWidth="1.5" />
        <path d="M12 7V17" strokeWidth="1.5" />
        <path d="M9.5 9.5L14.5 14.5" strokeWidth="1.5" />
        <path d="M14.5 9.5L9.5 14.5" strokeWidth="1.5" />
    </svg>
  );
}
