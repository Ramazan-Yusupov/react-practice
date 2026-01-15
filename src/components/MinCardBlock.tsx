import { CiEdit } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";
import { motion } from "framer-motion";

interface MinCardBlockProps {
  onEdit?: () => void;
  onDelete?: () => void;
  children?: React.ReactNode;
}

export function MinCardBlock({
  children,
  onDelete,
  onEdit,
}: MinCardBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0 }}
      className="border-2 p-2 rounded-lg mb-2 flex-between w-full"
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
    </motion.div>
  );
}
