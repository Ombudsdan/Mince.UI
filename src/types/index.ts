export enum ValidationRule {
  Required = "required",
  Min = "min",
  Max = "max",
}

export enum BankHolidayHandling {
  None = "none",
  Deduct = "deduct",
}

export enum LeaveStatus {
  Planned = "planned",
  Requested = "requested",
  Approved = "approved",
}

export enum LeaveType {
  Holiday = "holiday",
  Sick = "sick",
  /** @deprecated */
  Other = "other",
}

export enum LeaveDuration {
  Full = "full",
  HalfMorning = "halfMorning",
  HalfAfternoon = "halfAfternoon",
}

export interface BankHolidayEntry {
  date: string;
  title: string;
}

export type UkCountry = "england-and-wales" | "scotland" | "northern-ireland";

export interface LeaveEntry {
  id: string;
  startDate: string;
  endDate: string;
  status: LeaveStatus;
  type: LeaveType;
  notes?: string;
  duration?: LeaveDuration;
  /** @deprecated */
  halfDay?: boolean;
  /** @deprecated */
  halfDayPeriod?: "am" | "pm";
}

export interface UserAllowance {
  core: number;
  bought: number;
  carried: number;
}

export interface Company {
  id: string;
  name: string;
}

export interface YearAllowance extends UserAllowance {
  id?: string;
  startDate?: string;
  endDate?: string;
  year: number;
  company: string;
  companyId?: string;
  holidayStartMonth: number;
  active?: boolean;
  bankHolidayHandling?: BankHolidayHandling;
  useHoursDisplay?: boolean;
  coreHoursPerDay?: number;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  nonWorkingDays: number[];
  pinnedUserIds?: string[];
  pendingPinRequestsSent?: string[];
  pendingPinRequestsReceived?: string[];
  country?: UkCountry;
  revokedConnections?: Array<{ userId: string; date: string }>;
}

export interface AppUser {
  id: string;
  password: string;
  profile: UserProfile;
  yearAllowances: YearAllowance[];
  entries: LeaveEntry[];
}

export type PublicUser = Omit<AppUser, "password">;

export interface Database {
  users: AppUser[];
  companies?: Company[];
}
