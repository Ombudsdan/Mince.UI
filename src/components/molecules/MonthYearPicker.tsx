import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MONTH_NAMES_LONG, MONTH_NAMES_SHORT } from "@/variables/calendar";

export interface MonthYearPickerProps {
  year: number;
  month: number;
  onChange: (year: number, month: number) => void;
  minYear: number;
  minMonth: number;
  maxYear: number;
  maxMonth: number;
}

export default function MonthYearPicker({
  year,
  month,
  onChange,
  minYear,
  minMonth,
  maxYear,
  maxMonth,
}: MonthYearPickerProps) {
  const [open, setOpen] = useState(false);
  const [pickerYear, setPickerYear] = useState(year);
  const containerRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();

  function handleToggle() {
    if (!open) setPickerYear(year);
    setOpen((o) => !o);
  }

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  function isMonthDisabled(m: number): boolean {
    if (pickerYear < minYear || (pickerYear === minYear && m < minMonth)) return true;
    if (pickerYear > maxYear || (pickerYear === maxYear && m > maxMonth)) return true;
    return false;
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={handleToggle}
        className="font-bold text-gray-800 hover:text-indigo-600 px-2 py-1 rounded-lg hover:bg-indigo-50 transition-colors cursor-pointer"
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={`${MONTH_NAMES_LONG[month]} ${year}, open month-year picker`}
      >
        {MONTH_NAMES_LONG[month]} {year}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Month-year picker"
          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 bg-white rounded-xl shadow-xl border border-gray-200 p-3 w-56"
        >
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => setPickerYear((y) => y - 1)}
              disabled={pickerYear <= minYear}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-gray-600"
              aria-label="Previous year"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="font-semibold text-gray-700 text-sm">{pickerYear}</span>
            <button
              onClick={() => setPickerYear((y) => y + 1)}
              disabled={pickerYear >= maxYear}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-gray-600"
              aria-label="Next year"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-1">
            {MONTH_NAMES_SHORT.map((name, m) => {
              const isSelected = pickerYear === year && m === month;
              const isCurrentMonth = pickerYear === todayYear && m === todayMonth;
              const disabled = isMonthDisabled(m);

              let btnClass =
                "text-xs py-1.5 px-1 rounded-lg font-medium transition-colors text-center";
              if (disabled) {
                btnClass += " text-gray-300 cursor-not-allowed";
              } else if (isSelected) {
                btnClass += " bg-indigo-600 text-white cursor-pointer";
              } else if (isCurrentMonth) {
                btnClass +=
                  " bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-300 cursor-pointer";
              } else {
                btnClass += " text-gray-700 hover:bg-gray-100 cursor-pointer";
              }

              return (
                <button
                  key={name}
                  onClick={() => {
                    if (!disabled) {
                      onChange(pickerYear, m);
                      setOpen(false);
                    }
                  }}
                  disabled={disabled}
                  aria-label={`${MONTH_NAMES_LONG[m]} ${pickerYear}`}
                  aria-pressed={isSelected}
                  className={btnClass}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
