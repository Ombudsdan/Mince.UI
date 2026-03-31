import { useEffect, useRef } from "react";
import { useFormValidation } from "@/contexts/FormValidationContext";

interface LeaveOptionPickerOption {
  value: string;
  label: string;
}

interface LeaveOptionPickerProps {
  id: string;
  label: string;
  options: LeaveOptionPickerOption[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean | string;
}

export default function LeaveOptionPicker({
  id,
  label,
  options,
  value,
  onChange,
  required,
}: LeaveOptionPickerProps) {
  const { getError, setError, clearError, registerValidator } = useFormValidation();
  const error = getError(id);

  const validateRef = useRef<() => boolean>(() => true);
  validateRef.current = () => validate(value);

  useEffect(() => {
    return registerValidator(id, () => validateRef.current());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function validate(v: string): boolean {
    if (required && !v) {
      const message = typeof required === "string" ? required : `${label} is required`;
      setError(id, message);
      return false;
    }
    clearError(id);
    return true;
  }

  function handleClick(v: string) {
    onChange(v);
    if (required) {
      validate(v);
    } else {
      clearError(id);
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-2">{label}</label>
      <div className="flex gap-2 flex-wrap">
        {options.map((opt) => {
          const isActive = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => handleClick(opt.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition cursor-pointer ${
                isActive
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
