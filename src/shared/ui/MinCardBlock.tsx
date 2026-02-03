import { CiEdit } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";

interface MinCardBlockProps {
  onEdit?: () => void;
  onDelete?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export function MinCardBlock({
  onEdit,
  onDelete,
  children,
  className,
}: MinCardBlockProps) {
  return (
    <div
      className={`border-2 p-2 rounded-lg gap-10 mb-2 flex-between w-full ${className || ""}`}
    >
      <div>{children}</div>
      <div className="flex gap-3">
        {onEdit && (
          <button onClick={onEdit}>
            <CiEdit />
          </button>
        )}
        {onDelete && (
          <button onClick={onDelete}>
            <FaRegTrashCan color="red" />
          </button>
        )}
      </div>
    </div>
  );
}
