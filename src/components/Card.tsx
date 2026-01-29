import { Avatar } from "@/shared/ui/Avatar";
import { StatusOnOffline } from "./StatusOnOffline";
import { useAuth } from "@/contexts/AuthContext";

interface CardProps {
  title?: string;
  avatar?: boolean;
  maxWidth?: string;
  maxHeight?: number;
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
  const { user, isAuthenticated } = useAuth();
  const maxWidthClass: { [key: string]: string } = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
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
        }  `}
        style={{
          maxHeight: maxHeight,
        }}
      >
        <header className="flex justify-between items-center w-full">
          <div className="w-full">
            {" "}
            {avatar && isAuthenticated && user ? (
              <Avatar img={user.avatar} avatarSeed={user.avatarSeed} />
            ) : (
              <Avatar isAnonymous />
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
