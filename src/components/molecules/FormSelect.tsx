import { useEffect, useRef } from "react";
import { useFormValidation } from "@/contexts/FormValidationContext";

interface FormSelectOption<T extends string = string> {
  value: T;
  label: string;
}

interface FormSelectProps<T extends string = string> {
  id: string;
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: FormSelectOption<T>[];
  required?: boolean | string;
  readOnly?: boolean;
}

export default function FormSelect<T extends string = string>({
  id,
  label,
  value,
  onChange,
  options,
  required,
  readOnly,
}: FormSelectProps<T>) {
  const { getError, setError, clearError, registerValidator } = useFormValidation();
  const error = getError(id);

  const validateRef = useRef<() => boolean>(() => true);
  validateRef.current = () => validate(value, true);

  useEffect(() => {
    return registerValidator(id, () => validateRef.current());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function validate(v: T, _full: boolean): boolean {
    if (required && !v) {
      const message = typeof required === "string" ? required : `${label} is required`;
      setError(id, message);
      return false;
    }
    clearError(id);
    return true;
  }

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => {
          const v = e.target.value as T;
          onChange(v);
          validate(v, true);
        }}
        disabled={readOnly}
        className={`w-full border rounded-lg px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:outline-none ${
          error ? "border-red-400" : "border-gray-300"
        }`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
