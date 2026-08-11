type ButterflyIconProps = {
  className?: string;
  /** Slightly thickens the linework for contexts where the icon needs more visual presence. */
  bold?: boolean;
};

const BOLD_FILTER =
  "drop-shadow(0.5px 0 0 currentColor) drop-shadow(-0.5px 0 0 currentColor) drop-shadow(0 0.5px 0 currentColor) drop-shadow(0 -0.5px 0 currentColor)";

export default function ButterflyIcon({ className, bold }: ButterflyIconProps) {
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        display: "inline-block",
        backgroundColor: "currentColor",
        WebkitMaskImage: "url(/icons/borboleta.svg)",
        maskImage: "url(/icons/borboleta.svg)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        filter: bold ? BOLD_FILTER : undefined,
      }}
    />
  );
}
