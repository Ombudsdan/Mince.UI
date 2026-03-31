import { LeaveStatus, LeaveType } from "@/types";

export const STATUS_HEX_COLORS: Record<LeaveStatus, string> = {
  [LeaveStatus.Approved]: "#86efac",
  [LeaveStatus.Requested]: "#fed7aa",
  [LeaveStatus.Planned]: "#fde047",
};

export const STATUS_DOT_HEX: Record<LeaveStatus, string> = {
  [LeaveStatus.Approved]: "#86efac",
  [LeaveStatus.Requested]: "#fed7aa",
  [LeaveStatus.Planned]: "#facc15",
};

export const STATUS_COLORS: Record<LeaveStatus, string> = {
  [LeaveStatus.Planned]: "bg-yellow-100 text-yellow-800 border-yellow-300",
  [LeaveStatus.Requested]: "bg-orange-100 text-orange-800 border-orange-200",
  [LeaveStatus.Approved]: "bg-green-100 text-green-800 border-green-300",
};

export const STATUS_DOT: Record<LeaveStatus, string> = {
  [LeaveStatus.Planned]: "bg-yellow-400",
  [LeaveStatus.Requested]: "bg-orange-200",
  [LeaveStatus.Approved]: "bg-green-300",
};

export const CALENDAR_COLORS: Record<LeaveStatus, string> = {
  [LeaveStatus.Planned]: "bg-yellow-200 text-yellow-800",
  [LeaveStatus.Requested]: "bg-orange-200 text-orange-900",
  [LeaveStatus.Approved]: "bg-green-300 text-green-900",
};

export const SICK_LEAVE_CARD_COLORS = "bg-red-100 text-red-800 border-red-300";
export const CALENDAR_CELL_SICK_LEAVE = "bg-red-200 text-red-800";
export const CALENDAR_CELL_BANK_HOLIDAY = "bg-purple-300 text-purple-900";
export const CALENDAR_CELL_NON_WORKING = "bg-gray-100 text-gray-400";
export const CALENDAR_CELL_DEFAULT = "hover:bg-gray-50 text-gray-700";

export function getCalendarEntryClass(entry: { status: LeaveStatus; type: LeaveType }): string {
  if (entry.type === LeaveType.Sick) return CALENDAR_CELL_SICK_LEAVE;
  return CALENDAR_COLORS[entry.status];
}
