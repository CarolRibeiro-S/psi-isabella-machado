type ButterflyIconProps = {
  className?: string;
};

const WING_PATHS = [
  "M50,20 C50,35 50,50 50,66",
  "M48.7,17 C44,11 40,7 36,5 C34.7,4.3 35.2,2.9 36.6,3.4",
  "M51.3,17 C56,11 60,7 64,5 C65.3,4.3 64.8,2.9 63.4,3.4",
  "M50,27 C36,13 16,11 9,23 C4,32 10,41 22,40 C30,39 40,37 48,39",
  "M44,29 C34,21 22,19 14,24",
  "M50,27 C64,13 84,11 91,23 C96,32 90,41 78,40 C70,39 60,37 52,39",
  "M56,29 C66,21 78,19 86,24",
  "M50,41 C40,43 26,47 21,57 C17,65 24,72 33,68 C40,65 46,55 50,47",
  "M42,47 C34,50 27,55 24,61",
  "M50,41 C60,43 74,47 79,57 C83,65 76,72 67,68 C60,65 54,55 50,47",
  "M58,47 C66,50 73,55 76,61",
];

type SingleButterflyProps = {
  cx: number;
  cy: number;
  scale: number;
  rotate: number;
};

function SingleButterfly({ cx, cy, scale, rotate }: SingleButterflyProps) {
  return (
    <g transform={`translate(${cx},${cy}) rotate(${rotate}) scale(${scale}) translate(-50,-37.5)`}>
      <circle cx="50" cy="17.5" r="1.7" fill="currentColor" stroke="none" />
      {WING_PATHS.map((d) => (
        <path key={d} d={d} />
      ))}
    </g>
  );
}

export default function ButterflyIcon({ className }: ButterflyIconProps) {
  return (
    <svg
      viewBox="0 0 100 134"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <SingleButterfly cx={56} cy={22} scale={0.4} rotate={-10} />
      <SingleButterfly cx={36} cy={55} scale={0.6} rotate={22} />
      <SingleButterfly cx={58} cy={100} scale={0.8} rotate={-4} />
    </svg>
  );
}
