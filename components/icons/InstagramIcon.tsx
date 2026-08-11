export default function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.5" />
      <circle cx="12" cy="12" r="4.3" />
      <circle cx="17.35" cy="6.65" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
