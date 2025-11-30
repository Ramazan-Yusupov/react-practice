import { Button } from "@/shared/ui/Button";

interface CardProps {
  avatar?: string;
  tag?: string[];
  text?: string;
  title?: string;
  onClick?: () => void;
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-block border-2 border-gray-700 rounded-2xl px-2 py-px mr-2 text-[12px]">
      {children}
    </div>
  );
}

export function CardApp({
  tag = [],
  text,
  avatar = "/frontend.jpg",
  title,
  onClick,
}: CardProps) {
  return (
    <div className="border-2 p-3 rounded-2xl flex flex-col gap-5 max-w-xl">
      <div className="flex gap-5">
        <img
          src={avatar}
          alt={title}
          className="rounded-2xl w-24 h-24 border-2"
        />
        <div>
          <div className="text-2xl font-semibold">{title}</div>
          <div className="flex flex-wrap mt-2">
            {tag.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          <div className="mt-3">{text}</div>
        </div>
      </div>
      <Button onClick={onClick} variant="secondary">
        Click me
      </Button>
    </div>
  );
}
