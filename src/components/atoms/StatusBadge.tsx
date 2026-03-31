import { LeaveStatus } from "@/types";
import { STATUS_COLORS, SICK_LEAVE_CARD_COLORS } from "@/variables/colours";

export interface StatusBadgeProps {
  status: LeaveStatus;
  isSick?: boolean;
  className?: string;
}

export default function StatusBadge({ status, isSick, className = "" }: StatusBadgeProps) {
  const label = isSick ? "Sick" : status.charAt(0).toUpperCase() + status.slice(1);
  const colorClass = isSick ? SICK_LEAVE_CARD_COLORS : STATUS_COLORS[status];

  return (
    <span
      className={`inline-block text-xs font-medium rounded-full px-2 py-0.5 border ${colorClass} ${className}`.trim()}
    >
      {label}
    </span>
  );
}
