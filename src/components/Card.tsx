import { StatusOnOffline } from "./StatusOnOffline";

interface CardProps {
  title?: string;
  avatar?: boolean;
  maxWidth?: string;
  maxHeight?: string;
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
  maxHeight,
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
  const maxHeightClass: { [key: string]: string } = {
    sm: "max-h-40",
    md: "max-h-60",
    lg: "max-h-80",
    xl: "max-h-100",
    "2xl": "max-h-120",
  };

  return (
    <div
      className={`
      ${maxWidth ? `${maxWidthClass[maxWidth]}` : ""}
      `}
    >
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div
        className={`border-2 rounded-2xl p-5 flex flex-col gap-4 ${
          className || ""
        } ${maxHeight ? `${maxHeightClass[maxHeight]}` : ""} `}
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
          {isOnline && <StatusOnOffline isOnline={isErrorOnOff} />}
        </header>
        <div className="flex flex-col gap-4 overflow-hidden overflow-y-auto scrollHidden">
          {children}
        </div>
      </div>
    </div>
  );
}
