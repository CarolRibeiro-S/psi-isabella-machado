import { forwardRef } from "react";

type ButterflyIconProps = {
  className?: string;
  /** Slightly thickens the linework for contexts where the icon needs more visual presence. */
  bold?: boolean;
  style?: React.CSSProperties;
};

const ButterflyIcon = forwardRef<HTMLSpanElement, ButterflyIconProps>(function ButterflyIcon(
  { className, bold, style },
  ref
) {
  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`butterfly-mask${bold ? " butterfly-mask-bold" : ""}${className ? ` ${className}` : ""}`}
      style={style}
    />
  );
});

export default ButterflyIcon;
