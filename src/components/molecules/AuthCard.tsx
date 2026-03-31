import type { ReactNode } from "react";

export interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-indigo-700 mb-2">{title}</h1>
        {subtitle && <p className="text-gray-500 mb-6 text-sm">{subtitle}</p>}
        {children}
        {footer && <div className="text-sm text-center mt-4 text-gray-500">{footer}</div>}
      </div>
    </div>
  );
}
