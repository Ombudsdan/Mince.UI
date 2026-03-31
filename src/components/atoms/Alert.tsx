import type { ReactNode } from "react";

export type AlertVariant = "warning" | "info" | "danger" | "success";

const VARIANT_CLASSES: Record<AlertVariant, string> = {
  warning: "bg-amber-50 border-amber-300 text-amber-800",
  info: "bg-blue-50 border-blue-300 text-blue-800",
  danger: "bg-red-50 border-red-300 text-red-800",
  success: "bg-green-50 border-green-300 text-green-800",
};

export interface AlertProps {
  variant?: AlertVariant;
  icon?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function Alert({
  variant = "warning",
  icon,
  action,
  children,
  className = "",
}: AlertProps) {
  return (
    <div
      role="alert"
      className={`border rounded-xl px-4 py-3 text-sm flex items-start gap-2 ${VARIANT_CLASSES[variant]} ${className}`.trim()}
    >
      {icon && (
        <span className="shrink-0 mt-0.5" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="flex-1">{children}</span>
      {action && <span className="shrink-0">{action}</span>}
    </div>
  );
}
