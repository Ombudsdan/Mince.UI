import { NON_WORKING_BH_STRIPE_STYLE } from "@/components/atoms/LeaveKey";

export interface MonthlyLeaveBarProps {
  monthName: string;
  approved: number;
  requested: number;
  planned: number;
  bankHolidays: number;
  bankHolidaysNonWorking?: number;
  maxDays: number;
}

export default function MonthlyLeaveBar({
  monthName,
  approved,
  requested,
  planned,
  bankHolidays,
  bankHolidaysNonWorking = 0,
  maxDays,
}: MonthlyLeaveBarProps) {
  const totalCombined = approved + requested + planned + bankHolidays + bankHolidaysNonWorking;

  const chartScale = Math.max(Math.ceil(maxDays / 5) * 5, 5);

  function pct(value: number): string {
    return `${Math.min((value / chartScale) * 100, 100)}%`;
  }

  return (
    <div className="flex items-center gap-3 py-0.5" data-testid="monthly-leave-bar">
      <span className="w-24 text-sm font-medium text-gray-700 shrink-0">{monthName}</span>

      <span className="w-10 text-xs text-gray-500 text-right shrink-0 tabular-nums">
        {totalCombined > 0 ? `${totalCombined}d` : "\u2013"}
      </span>

      <div
        className="flex-1 relative h-5 rounded-sm overflow-hidden bg-gray-100"
        role="img"
        aria-label={`${monthName}: ${approved} approved, ${requested} requested, ${planned} planned, ${bankHolidays} bank holidays, ${bankHolidaysNonWorking} bank holidays on non-working days`}
      >
        <div className="absolute inset-0 flex">
          {approved > 0 && (
            <div
              className="bg-green-300 h-full"
              style={{ width: pct(approved) }}
              title={`Approved: ${approved}d`}
            />
          )}
          {requested > 0 && (
            <div
              className="bg-orange-200 h-full"
              style={{ width: pct(requested) }}
              title={`Requested: ${requested}d`}
            />
          )}
          {planned > 0 && (
            <div
              className="bg-yellow-200 h-full"
              style={{ width: pct(planned) }}
              title={`Planned: ${planned}d`}
            />
          )}
          {bankHolidays > 0 && (
            <div
              className="bg-purple-300 h-full"
              style={{ width: pct(bankHolidays) }}
              title={`Bank Holidays: ${bankHolidays}`}
            />
          )}
          {bankHolidaysNonWorking > 0 && (
            <div
              className="bg-purple-300 h-full"
              style={{ width: pct(bankHolidaysNonWorking), ...NON_WORKING_BH_STRIPE_STYLE }}
              title={`Bank Holidays (non-working day): ${bankHolidaysNonWorking}`}
            />
          )}
        </div>

        {Array.from({ length: chartScale - 1 }, (_, i) => (
          <div
            key={i + 1}
            data-testid="chart-grid-line"
            className="absolute top-0 bottom-0"
            style={{
              left: `${((i + 1) / chartScale) * 100}%`,
              width: 1,
              backgroundColor: "rgba(255, 255, 255, 0.5)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
