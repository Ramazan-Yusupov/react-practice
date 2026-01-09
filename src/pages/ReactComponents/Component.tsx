import { cn } from "@/lib/utils";
import type { CSSProperties, SVGProps } from "react";

export interface GaugeProps extends Omit<SVGProps<SVGSVGElement>, "className"> {
  value: number;
  size?: number | string;
  gapPercent?: number;
  strokeWidth?: number;
  equal?: boolean;
  showValue?: boolean;
  primary?:
    | "danger"
    | "warning"
    | "success"
    | "info"
    | string
    | Record<number, string>;
  secondary?:
    | "danger"
    | "warning"
    | "success"
    | "info"
    | string
    | Record<number, string>;
  transition?: {
    length?: number;
    delay?: number;
  };
  className?:
    | string
    | {
        svgClassName?: string;
        primaryClassName?: string;
        secondaryClassName?: string;
        textClassName?: string;
      };
}

const COLOR_MAP = {
  danger: { primary: "#dc2626", secondary: "#fecaca" },
  warning: { primary: "#f59e0b", secondary: "#fde68a" },
  info: { primary: "#3b82f6", secondary: "#bfdbfe" },
  success: { primary: "#22c55e", secondary: "#bbf7d0" },
};

const DEFAULT_PRIMARY_COLORS: Record<number, string> = {
  0: "#dc2626",
  25: "#f59e0b",
  50: "#3b82f6",
  75: "#22c55e",
};

function Gauge({
  value,
  size = "100%",
  gapPercent = 2,
  strokeWidth = 10,
  equal = false,
  showValue = true,
  primary,
  secondary,
  transition = { length: 1000, delay: 0 },
  className,
  ...props
}: GaugeProps) {
  const circleSize = 100;
  const radius = circleSize / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const percentToPx = circumference / 100;
  const percentToDegree = 3.6;

  const offsetFactor = equal ? 0.5 : 0;
  const offsetFactorSecondary = 1 - offsetFactor;

  const getColor = (
    colorProp: typeof primary | typeof secondary,
    percent: number,
    type: "primary" | "secondary"
  ): string => {
    if (!colorProp) {
      return type === "primary"
        ? getColorFromThresholds(DEFAULT_PRIMARY_COLORS, percent)
        : "#9ca3af";
    }

    if (typeof colorProp === "string") {
      const mapped = COLOR_MAP[colorProp as keyof typeof COLOR_MAP];
      return mapped ? mapped[type] : colorProp;
    }

    return getColorFromThresholds(colorProp, percent);
  };

  const getColorFromThresholds = (
    thresholds: Record<number, string>,
    percent: number
  ): string => {
    const keys = Object.keys(thresholds)
      .map(Number)
      .sort((a, b) => a - b);

    for (let i = 0; i < keys.length; i++) {
      const current = keys[i];
      const next = keys[i + 1];

      if (percent >= current && (!next || percent < next)) {
        const color = thresholds[current];
        const mapped = COLOR_MAP[color as keyof typeof COLOR_MAP];
        return mapped
          ? mapped[percent === value ? "primary" : "secondary"]
          : color;
      }
    }

    return thresholds[keys[0]] || "";
  };

  const getDasharray = (percent: number, offset: number): string => {
    const gap = gapPercent * 2 * offset;
    const length = Math.max(percent * percentToPx - gap * percentToPx, 0);
    return `${length} ${circumference}`;
  };

  const getTransform = (isSecondary: boolean): string => {
    const offset = isSecondary ? offsetFactorSecondary : offsetFactor;
    const angle = -90 + gapPercent * offset * percentToDegree;
    return isSecondary
      ? `rotate(${360 + angle}deg) scaleY(-1)`
      : `rotate(${angle}deg)`;
  };

  const getOpacity = (isSecondary: boolean): number => {
    if (isSecondary) {
      return (offsetFactor === 0 && value > 100 - gapPercent * 2) ||
        (offsetFactor > 0 && value > 100 - gapPercent * 2 * offsetFactor)
        ? 0
        : 1;
    }
    return offsetFactor > 0 && value < gapPercent * 2 * offsetFactor ? 0 : 1;
  };

  const circleStyles: CSSProperties = {
    strokeLinecap: "round",
    strokeWidth,
    transition: `all ${transition.length}ms ease ${transition.delay}ms`,
    transformOrigin: "50% 50%",
  };

  const svgClass =
    typeof className === "string" ? className : className?.svgClassName;
  const primaryClass =
    typeof className === "object" ? className?.primaryClassName : "";
  const secondaryClass =
    typeof className === "object" ? className?.secondaryClassName : "";
  const textClass =
    typeof className === "object" ? className?.textClassName : "";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${circleSize} ${circleSize}`}
      width={size}
      height={size}
      fill="none"
      className={cn("select-none", svgClass)}
      {...props}
    >
      <circle
        cx={circleSize / 2}
        cy={circleSize / 2}
        r={radius}
        style={{
          ...circleStyles,
          strokeDasharray: getDasharray(100 - value, offsetFactorSecondary),
          transform: getTransform(true),
          stroke: getColor(secondary, 100 - value, "secondary"),
          opacity: getOpacity(true),
        }}
        className={cn(secondaryClass)}
      />

      <circle
        cx={circleSize / 2}
        cy={circleSize / 2}
        r={radius}
        style={{
          ...circleStyles,
          strokeDasharray: getDasharray(value, offsetFactor),
          transform: getTransform(false),
          stroke: getColor(primary, value, "primary"),
          opacity: getOpacity(false),
        }}
        className={cn(primaryClass)}
      />

      {showValue && (
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="currentColor"
          fontSize={36}
          className={cn("font-semibold", textClass)}
        >
          {Math.round(value)}
        </text>
      )}
    </svg>
  );
}

export { Gauge };
export default Gauge;
