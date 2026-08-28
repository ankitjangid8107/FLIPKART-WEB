import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export const SearchIcon = (p: P) => (
  <svg {...base} {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
);
export const CartIcon = (p: P) => (
  <svg {...base} {...p}><circle cx="9" cy="20" r="1.4" /><circle cx="17" cy="20" r="1.4" /><path d="M2.5 3.5h2l2.4 11.2a1.6 1.6 0 0 0 1.6 1.3h8.6a1.6 1.6 0 0 0 1.6-1.2l1.8-7.3H6" /></svg>
);
export const HeartIcon = (p: P) => (
  <svg {...base} {...p}><path d="M12 20.5s-7.5-4.6-9.3-9.3C1.5 8 3.4 5 6.5 5c2 0 3.4 1 4.4 2.4h2.2C14.1 6 15.5 5 17.5 5c3.1 0 5 3 3.8 6.2-1.8 4.7-9.3 9.3-9.3 9.3Z" /></svg>
);
export const UserIcon = (p: P) => (
  <svg {...base} {...p}><circle cx="12" cy="8" r="3.6" /><path d="M4.5 20c1.2-3.4 4-5 7.5-5s6.3 1.6 7.5 5" /></svg>
);
export const HomeIcon = (p: P) => (
  <svg {...base} {...p}><path d="M3.5 10.5 12 3.5l8.5 7" /><path d="M5.5 9v11h13V9" /><path d="M10 20v-6h4v6" /></svg>
);
export const GridIcon = (p: P) => (
  <svg {...base} {...p}><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></svg>
);
export const BoxIcon = (p: P) => (
  <svg {...base} {...p}><path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z" /><path d="M4 7l8 4 8-4" /><path d="M12 11v10" /></svg>
);
export const StarIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.4L12 17.4l-5.8 3 1.1-6.4L2.6 9.4l6.5-.9L12 2.6Z" /></svg>
);
export const ChevronDown = (p: P) => (
  <svg {...base} {...p}><path d="m6 9 6 6 6-6" /></svg>
);
export const ChevronLeft = (p: P) => (
  <svg {...base} {...p}><path d="m14.5 5-7 7 7 7" /></svg>
);
export const ChevronRight = (p: P) => (
  <svg {...base} {...p}><path d="m9.5 5 7 7-7 7" /></svg>
);
export const XIcon = (p: P) => (
  <svg {...base} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const PlusIcon = (p: P) => (
  <svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>
);
export const MinusIcon = (p: P) => (
  <svg {...base} {...p}><path d="M5 12h14" /></svg>
);
export const TrashIcon = (p: P) => (
  <svg {...base} {...p}><path d="M4 7h16" /><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /><path d="M6.5 7 7.6 20a1.5 1.5 0 0 0 1.5 1.4h5.8A1.5 1.5 0 0 0 16.4 20L17.5 7" /></svg>
);
export const CheckIcon = (p: P) => (
  <svg {...base} {...p}><path d="m4.5 12.5 5 5 10-11" /></svg>
);
export const TruckIcon = (p: P) => (
  <svg {...base} {...p}><path d="M2.5 6h11v11h-11z" /><path d="M13.5 10h4.2l3.3 3.5V17h-7.5" /><circle cx="7" cy="18.6" r="1.6" /><circle cx="17" cy="18.6" r="1.6" /></svg>
);
export const ShieldIcon = (p: P) => (
  <svg {...base} {...p}><path d="M12 3 5 5.8v5.4c0 4.4 3 7.6 7 9.8 4-2.2 7-5.4 7-9.8V5.8L12 3Z" /><path d="m9 11.8 2.2 2.2 4-4.5" /></svg>
);
export const RefreshIcon = (p: P) => (
  <svg {...base} {...p}><path d="M20 11a8 8 0 1 0-2.3 6.3" /><path d="M20 5v6h-6" /></svg>
);
export const SupportIcon = (p: P) => (
  <svg {...base} {...p}><path d="M4.5 13a7.5 7.5 0 0 1 15 0" /><rect x="2.8" y="12.5" width="4" height="6.5" rx="1.8" /><rect x="17.2" y="12.5" width="4" height="6.5" rx="1.8" /><path d="M19.2 19a3.5 3.5 0 0 1-3.5 2.5h-2" /></svg>
);
export const PinIcon = (p: P) => (
  <svg {...base} {...p}><path d="M12 21s-6.5-5.4-6.5-10.5a6.5 6.5 0 1 1 13 0C18.5 15.6 12 21 12 21Z" /><circle cx="12" cy="10.5" r="2.3" /></svg>
);
export const TagIcon = (p: P) => (
  <svg {...base} {...p}><path d="M3.5 12.5v-9h9L21 12l-9 9-8.5-8.5Z" /><circle cx="8" cy="8" r="1.4" /></svg>
);
