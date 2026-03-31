import { useMemo } from "react";

export interface DonutSegment {
  value: number;
  color: string;
}

export interface DonutChartProps {
  segments: DonutSegment[];
  total: number;
  centerValue: number;
}

function buildSegmentPath(
  cx: number,
  cy: number,
  r: number,
  startFrac: number,
  endFrac: number
): string {
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const startAngleDeg = 180 - startFrac * 180;
  const startX = cx + r * Math.cos(toRad(startAngleDeg));
  const startY = cy - r * Math.sin(toRad(startAngleDeg));

  const endAngleDeg = 180 - endFrac * 180;
  const endX = cx + r * Math.cos(toRad(endAngleDeg));
  const endY = cy - r * Math.sin(toRad(endAngleDeg));

  const largeArc = 0;

  return `M ${startX} ${startY} A ${r} ${r} 0 ${largeArc} 1 ${endX} ${endY}`;
}

const TRACK_COLOR = "#f3f4f6";

export default function DonutChart({ segments, total, centerValue }: DonutChartProps) {
  const cx = 50;
  const cy = 52;
  const r = 38;
  const strokeWidth = 14;
  const capR = strokeWidth / 2;

  const trackPath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;

  const { segmentEls, leftCapColor, rightCapColor } = useMemo(() => {
    if (total <= 0) {
      return { segmentEls: [], leftCapColor: TRACK_COLOR, rightCapColor: TRACK_COLOR };
    }

    let cumFrac = 0;
    const segmentEls: React.ReactNode[] = [];
    let firstColor: string | null = null;
    let lastColor: string | null = null;

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      if (seg.value <= 0) continue;

      const rawFrac = seg.value / total;
      const available = Math.max(0, 1 - cumFrac);
      const frac = Math.min(rawFrac, available);
      if (frac <= 0) continue;

      if (firstColor === null) firstColor = seg.color;
      lastColor = seg.color;

      const startFrac = cumFrac;
      const endFrac = cumFrac + frac;
      const clampedEnd = endFrac >= 1 ? 0.9999 : endFrac;

      segmentEls.push(
        <path
          key={i}
          fill="none"
          stroke={seg.color}
          strokeWidth={strokeWidth}
          strokeLinecap="butt"
          d={buildSegmentPath(cx, cy, r, startFrac, clampedEnd)}
        />
      );

      cumFrac = endFrac;
    }

    return {
      segmentEls,
      leftCapColor: firstColor ?? TRACK_COLOR,
      rightCapColor: cumFrac >= 1 ? lastColor! : TRACK_COLOR,
    };
  }, [segments, total]);

  return (
    <svg
      viewBox="0 0 100 65"
      className="w-full h-auto"
      role="img"
      aria-label={`${centerValue} days remaining`}
    >
      <path
        fill="none"
        stroke={TRACK_COLOR}
        strokeWidth={strokeWidth}
        strokeLinecap="butt"
        d={trackPath}
      />
      {segmentEls}
      <circle cx={cx - r} cy={cy} r={capR} fill={leftCapColor} />
      <circle cx={cx + r} cy={cy} r={capR} fill={rightCapColor} />
      <text
        x={cx}
        y={cy - 10}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fontSize: 18, fontWeight: "bold", fill: "#111827" }}
      >
        {centerValue}
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
