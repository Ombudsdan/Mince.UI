import { useEffect, useRef, useState } from "react";
import { useFormValidation } from "@/contexts/FormValidationContext";

interface FormFieldProps {
  id: string;
  label: string;
  type?: "text" | "email" | "number" | "password" | "date";
  value: string | number;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number | "any";
  maxLength?: number;
  required?: boolean | string;
}

export default function FormField({
  id,
  label,
  type = "text",
  value,
  onChange,
  readOnly,
  placeholder,
  min,
  max,
  step,
  maxLength,
  required,
}: FormFieldProps) {
  const { getError, setError, clearError, registerValidator } = useFormValidation();
  const error = getError(id);

  const [hasBlurred, setHasBlurred] = useState(false);

  const validateRef = useRef<() => boolean>(() => true);
  validateRef.current = () => validate(String(value ?? ""), true);

  useEffect(() => {
    return registerValidator(id, () => validateRef.current());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange ? (e) => handleChange(e.target.value) : undefined}
        onBlur={(e) => {
          setHasBlurred(true);
          validate(e.target.value, true);
        }}
        readOnly={readOnly}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        maxLength={maxLength}
        className={`w-full border rounded-lg px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:outline-none
          ${readOnly ? "bg-gray-50 text-gray-400" : ""}
          ${error ? "border-red-400" : "border-gray-300"}`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );

  function handleChange(rawValue: string) {
    onChange?.(rawValue);
    validate(rawValue, hasBlurred);
  }

  function validate(rawValue: string, full: boolean): boolean {
    const trimmed = rawValue.trim();

    if (required && trimmed === "") {
      const message = typeof required === "string" ? required : `${label} is required`;
      setError(id, message);
      return false;
    }

    if (full && type === "email" && trimmed !== "") {
      const emailRegex = /^[^@\s]{1,64}@[^@\s]{1,255}\.[^@\s]{1,63}$/;
      if (!emailRegex.test(trimmed)) {
        setError(id, `${label} must be a valid email address`);
        return false;
      }
    }

    if (type === "number" && trimmed !== "") {
      const num = Number(rawValue);
      if (isNaN(num)) {
        setError(id, `${label} must be a valid number`);
        return false;
      }
      if (min !== undefined && num < min) {
        setError(id, `${label} must be at least ${min}`);
        return false;
      }
      if (max !== undefined && num > max) {
        setError(id, `${label} must be no more than ${max}`);
        return false;
      }
    }

    clearError(id);
    return true;
  }
}
