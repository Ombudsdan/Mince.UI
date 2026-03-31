import { useState } from "react";

const OTHER_VALUE = "__other__";

interface CompanySelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  companies?: string[];
}

export default function CompanySelect({
  id,
  label,
  value,
  onChange,
  companies = [],
}: CompanySelectProps) {
  const uniqueCompanies = [...new Set(companies.filter(Boolean))].sort();
  const isOther = value !== "" && !uniqueCompanies.includes(value);
  const [selectValue, setSelectValue] = useState(isOther ? OTHER_VALUE : value);
  const [customValue, setCustomValue] = useState(isOther ? value : "");

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const chosen = e.target.value;
    setSelectValue(chosen);
    if (chosen === OTHER_VALUE) {
      onChange(customValue);
    } else {
      setCustomValue("");
      onChange(chosen);
    }
  }

  function handleCustomChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setCustomValue(v);
    onChange(v);
  }

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-600 mb-1">
        {label} <span className="text-gray-400 font-normal">(optional)</span>
      </label>
      <select
        id={id}
        value={selectValue}
        onChange={handleSelectChange}
        className="w-full border rounded-lg px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
      >
        <option value="">— Select a company —</option>
        {uniqueCompanies.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
        <option value={OTHER_VALUE}>Other / not listed — add new</option>
      </select>
      {selectValue === OTHER_VALUE && (
        <input
          id={`${id}-custom`}
          type="text"
          value={customValue}
          onChange={handleCustomChange}
          placeholder="Type your company name"
          className="mt-2 w-full border rounded-lg px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          aria-label="Custom company name"
          autoFocus
        />
      )}
    </div>
  );
}
