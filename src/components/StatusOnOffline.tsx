interface CardProps {
  isOnline?: boolean;
  text?: React.ReactNode;
}

export function StatusOnOffline({ isOnline, text }: CardProps) {
  return (
    <div className="flex gap-2 items-center">
      <div
        className={`w-2.5 h-2.5 rounded-full outline-2 outline-offset-1 
          ${
            isOnline
              ? "bg-green-500 outline-green-500"
              : "bg-red-500 outline-red-500"
          }`}
      />
      {text || (isOnline ? "Online" : "Offline")}
    </div>
  );
}
