export interface SmallSelectOption {
  value: string;
  label: string;
}

export interface SmallSelectProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: SmallSelectOption[];
  ariaLabel: string;
  className?: string;
}

export default function SmallSelect({
  id,
  value,
  onChange,
  options,
  ariaLabel,
  className = "",
}: SmallSelectProps) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={ariaLabel}
      className={`border border-gray-300 rounded-lg px-2 py-1 text-xs text-gray-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-white ${className}`.trim()}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
