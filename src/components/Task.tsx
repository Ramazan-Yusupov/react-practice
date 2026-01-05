import { CiTrash } from "react-icons/ci";

interface TaskProps {
  title: React.ReactNode;
  onDelete?: () => void;
}

export function Task({ title, onDelete }: TaskProps) {
  return (
    <div className="border p-3 rounded-xl flex items-center justify-between w-full">
      <div className="text-lg">{title}</div>
      <CiTrash
        color="red"
        onClick={onDelete}
        size={25}
        className="cursor-pointer"
      />
    </div>
  );
}
