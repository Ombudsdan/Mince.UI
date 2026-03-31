import { Users } from "lucide-react";

export interface ConnectionsHeaderProps {
  manageHref: string;
  pendingCount?: number;
}

export default function ConnectionsHeader({
  manageHref,
  pendingCount = 0,
}: ConnectionsHeaderProps) {
  return (
    <div className="flex items-center justify-between" data-testid="connections-header">
      <h2 className="text-sm font-semibold text-gray-700">Connections</h2>
      <div className="flex items-center gap-2">
        {pendingCount > 0 && (
          <span
            data-testid="pending-badge"
            className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium"
          >
            {pendingCount} pending
          </span>
        )}
        <a
          href={manageHref}
          className="inline-flex items-center gap-1 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 rounded-lg transition-colors"
        >
          <Users size={14} aria-hidden="true" />
          Manage
        </a>
      </div>
    </div>
  );
}
