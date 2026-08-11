export default function WhatsAppIcon({ className }: { className?: string }) {
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
      <path d="M12,3 C6.98,3 2.9,6.9 2.9,11.7 C2.9,13.6 3.55,15.36 4.66,16.79 L3.6,20.6 L7.62,19.42 C9,20.2 10.62,20.63 12.34,20.4 C17.02,19.79 20.6,15.87 20.6,11.7 C20.6,6.9 17.02,3 12,3 Z" />
      <path d="M8.7,10 C8.5,9.1 9.3,8.35 10.15,8.55 C10.68,8.68 10.98,9.2 11.05,9.72 C11.15,10.42 11.5,11.15 12.05,11.7 C12.6,12.25 13.32,12.58 14,12.68 C14.53,12.76 15.06,13.07 15.18,13.6 C15.38,14.46 14.62,15.26 13.72,15.06 C10.85,14.42 9.32,12.85 8.7,10 Z" />
    </svg>
  );
}
