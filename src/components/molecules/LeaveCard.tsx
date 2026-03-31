import { Pencil, Trash2 } from "lucide-react";
import type { LeaveEntry, BankHolidayEntry } from "@/types";
import { LeaveType } from "@/types";
import { STATUS_COLORS, SICK_LEAVE_CARD_COLORS } from "@/variables/colours";
import { countWorkingDays, getEntryDuration } from "@/utils/dateHelpers";
import { LeaveDuration } from "@/types";
import StatusBadge from "@/components/atoms/StatusBadge";

export interface LeaveCardProps {
  entry: LeaveEntry;
  nonWorkingDays: number[];
  bankHolidays: BankHolidayEntry[];
  isOwnProfile: boolean;
  onEdit?: (entry: LeaveEntry) => void;
  onDelete?: (id: string) => void;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export default function LeaveCard({
  entry,
  nonWorkingDays,
  bankHolidays,
  isOwnProfile,
  onEdit,
  onDelete,
}: LeaveCardProps) {
  const isSick = entry.type === LeaveType.Sick;
  const colorClass = isSick ? SICK_LEAVE_CARD_COLORS : STATUS_COLORS[entry.status];

  const duration = getEntryDuration(entry);
  const isHalfDay = duration !== LeaveDuration.Full;

  const bhdates = bankHolidays.map((b) => b.date);
  const days = isHalfDay
    ? 0.5
    : countWorkingDays(entry.startDate, entry.endDate, nonWorkingDays, bhdates);

  const dateStr =
    entry.startDate === entry.endDate
      ? formatDate(entry.startDate)
      : `${formatDate(entry.startDate)} – ${formatDate(entry.endDate)}`;

  const daysLabel = isHalfDay ? `(${duration === LeaveDuration.HalfMorning ? "AM" : "PM"})` : `(${days}d)`;

  return (
    <div
      className={`border rounded-xl p-4 flex flex-col gap-2 ${colorClass}`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <StatusBadge status={entry.status} isSick={isSick} />
          <span className="text-xs text-gray-500">{daysLabel}</span>
        </div>
        {isOwnProfile && (
          <div className="flex gap-1">
            {onEdit && (
              <button
                type="button"
                onClick={() => onEdit(entry)}
                aria-label="Edit"
                className="text-gray-400 hover:text-indigo-600 p-1 rounded cursor-pointer"
              >
                <Pencil size={14} />
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                onClick={() => onDelete(entry.id)}
                aria-label="Delete"
                className="text-gray-400 hover:text-red-600 p-1 rounded cursor-pointer"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        )}
      </div>
      <p className="text-xs font-medium">{dateStr}</p>
      <p className="text-xs text-gray-500">{entry.notes ?? "–"}</p>
    </div>
  );
}
