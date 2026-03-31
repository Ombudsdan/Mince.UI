import type { CSSProperties } from "react";

export interface LeaveKeyItem {
  label: string;
  colorClass: string;
  style?: CSSProperties;
}

export interface LeaveKeyProps {
  items: LeaveKeyItem[];
  className?: string;
}

export const NON_WORKING_BH_STRIPE_STYLE: CSSProperties = {
  backgroundImage:
    "repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,0.5) 3px, rgba(255,255,255,0.5) 6px)",
};

export const LEAVE_KEY_APPROVED: LeaveKeyItem = { label: "Approved", colorClass: "bg-green-300" };
export const LEAVE_KEY_REQUESTED: LeaveKeyItem = { label: "Requested", colorClass: "bg-orange-200" };
export const LEAVE_KEY_PLANNED: LeaveKeyItem = { label: "Planned", colorClass: "bg-yellow-200" };
export const LEAVE_KEY_SICK: LeaveKeyItem = { label: "Sick", colorClass: "bg-red-200" };
export const LEAVE_KEY_BANK_HOLIDAY: LeaveKeyItem = { label: "Bank Holiday", colorClass: "bg-purple-300" };
export const LEAVE_KEY_NON_WORKING: LeaveKeyItem = { label: "Non-Working", colorClass: "bg-gray-100" };

export const LEAVE_KEY_ITEMS_BASE: LeaveKeyItem[] = [
  LEAVE_KEY_APPROVED,
  LEAVE_KEY_REQUESTED,
  LEAVE_KEY_PLANNED,
  LEAVE_KEY_BANK_HOLIDAY,
];

export const LEAVE_KEY_ITEMS_OVERVIEW: LeaveKeyItem[] = [
  LEAVE_KEY_APPROVED,
  LEAVE_KEY_REQUESTED,
  LEAVE_KEY_PLANNED,
  LEAVE_KEY_SICK,
  LEAVE_KEY_BANK_HOLIDAY,
  LEAVE_KEY_NON_WORKING,
];

export function LeaveKey({ items, className = "" }: LeaveKeyProps) {
  return (
    <div
      data-testid="leave-key"
      className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 ${className}`.trim()}
    >
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-1.5">
          <span
            data-testid={`leave-key-swatch-${item.label.toLowerCase().replace(/ /g, "-")}`}
            className={`w-3 h-3 rounded shrink-0 ${item.colorClass}`}
            style={item.style}
          />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default LeaveKey;
