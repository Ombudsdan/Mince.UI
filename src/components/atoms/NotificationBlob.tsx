export interface NotificationBlobProps {
  count: number;
  label?: string;
  className?: string;
}

export default function NotificationBlob({
  count,
  label = "notifications",
  className = "",
}: NotificationBlobProps) {
  if (count <= 0) return null;

  return (
    <span
      aria-label={`${count} ${label}`}
      className={`inline-flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[1.125rem] h-[1.125rem] px-1 ${className}`.trim()}
    >
      {count}
    </span>
  );
}
