import { StatusOnOffline } from "./StatusOnOffline";

interface CardProps {
  title?: string;
  avatar?: boolean;
  maxWidth?: string;
  isOnline?: boolean;
  className?: string;
  isErrorOnOff?: boolean;
  children: React.ReactNode;
}

export function Card({
  title,
  avatar,
  children,
  maxWidth,
  isOnline,
  className,
  isErrorOnOff,
}: CardProps) {
  const maxWidthClass: { [key: string]: string } = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  };

  return (
    <div className={maxWidth ? `${maxWidthClass[maxWidth]}` : ""}>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div
        className={`border-2 rounded-2xl p-5 flex flex-col gap-4 overflow-hidden overflow-y-auto scrollHidden ${
          className || ""
        } `}
      >
        <header className="flex justify-between items-center w-full">
          <div className="w-full">
            {avatar && (
              <img
                src="/frontend.jpg"
                className="w-10 h-10 rounded-full border-2 border-gray-300"
              />
            )}
          </div>
          {isErrorOnOff && <StatusOnOffline isOnline={isOnline} text />}
        </header>

        {children}
      </div>
    </div>
  );
}
