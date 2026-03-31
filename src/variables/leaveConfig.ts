import { LeaveStatus, LeaveType } from "@/types";

export const LEAVE_STATUS_LABELS: Record<LeaveStatus, string> = {
  [LeaveStatus.Planned]: "Planned",
  [LeaveStatus.Requested]: "Requested",
  [LeaveStatus.Approved]: "Approved",
};

export const LEAVE_STATUS_ORDER: LeaveStatus[] = [
  LeaveStatus.Planned,
  LeaveStatus.Requested,
  LeaveStatus.Approved,
];

export const LEAVE_TYPE_LABELS: Record<LeaveType, string> = {
  [LeaveType.Holiday]: "Holiday",
  [LeaveType.Sick]: "Sick",
  [LeaveType.Other]: "Other",
};

export const LEAVE_TYPE_ORDER: LeaveType[] = [LeaveType.Holiday, LeaveType.Sick];
