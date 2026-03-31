import { useMemo } from "react";
import { LeaveStatus } from "@/types";
import { STATUS_HEX_COLORS } from "@/variables/colours";

export interface HalfDonutChartProps {
  total: number;
  used: number;
  status: LeaveStatus;
}

function buildUsedArcPath(cx: number, cy: number, r: number, fraction: number): string {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const startX = cx - r;
  const startY = cy;
  const endAngleDeg = 180 - fraction * 180;
  const endX = cx + r * Math.cos(toRad(endAngleDeg));
  const endY = cy - r * Math.sin(toRad(endAngleDeg));
  const largeArc = 0;
  return `M ${startX} ${startY} A ${r} ${r} 0 ${largeArc} 1 ${endX} ${endY}`;
}

export default function HalfDonutChart({ total, used, status }: HalfDonutChartProps) {
  const cx = 50;
  const cy = 52;
  const r = 38;
  const strokeWidth = 14;
  const capR = strokeWidth / 2;

  const trackColor = "#f3f4f6";
  const remaining = total - used;
  const color = STATUS_HEX_COLORS[status];

  const fraction = useMemo(() => {
    if (total <= 0) return 0;
    return Math.min(Math.max(used / total, 0), 1);
  }, [used, total]);

  const trackPath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;
  const showUsedArc = fraction > 0;
  const usedPath = buildUsedArcPath(cx, cy, r, fraction >= 1 ? 0.9999 : fraction);

  const leftCapColor = fraction > 0 ? color : trackColor;
  const rightCapColor = fraction >= 1 ? color : trackColor;

  return (
    <svg
      viewBox="0 0 100 65"
      className="w-full h-auto"
      role="img"
      aria-label={`${remaining} days remaining`}
    >
      <path
        fill="none"
        stroke={trackColor}
        strokeWidth={strokeWidth}
        strokeLinecap="butt"
        d={trackPath}
      />
      {showUsedArc && (
        <path
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="butt"
          d={usedPath}
        />
      )}
      <circle cx={cx - r} cy={cy} r={capR} fill={leftCapColor} />
      <circle cx={cx + r} cy={cy} r={capR} fill={rightCapColor} />
      <text
        x={cx}
        y={cy - 10}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fontSize: 18, fontWeight: "bold", fill: "#111827" }}
      >
        {remaining}
      </text>
      <text
        x={cx}
        y={cy + 6}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fontSize: 9, fill: "#6b7280" }}
      >
        Remaining
      </text>
    </svg>
  );
}
