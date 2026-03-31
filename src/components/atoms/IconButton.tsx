import type { ReactNode } from "react";

export type IconButtonVariant = "ghost" | "subtle";

const VARIANT_CLASSES: Record<IconButtonVariant, string> = {
  ghost: "text-gray-400 hover:text-gray-600 hover:bg-gray-100",
  subtle: "text-gray-600 hover:text-indigo-700 hover:bg-indigo-50",
};

export interface IconButtonProps {
  icon: ReactNode;
  ariaLabel: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: IconButtonVariant;
  disabled?: boolean;
  className?: string;
}

export default function IconButton({
  icon,
  ariaLabel,
  onClick,
  type = "button",
  variant = "ghost",
  disabled,
  className = "",
}: IconButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`p-1.5 rounded-lg transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${VARIANT_CLASSES[variant]} ${className}`.trim()}
    >
      {icon}
    </button>
  );
}
