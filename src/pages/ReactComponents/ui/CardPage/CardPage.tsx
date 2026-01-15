import { MinCardBlock } from "@/components/MinCardBlock";
import { FormInput } from "@/shared/ui/FormInput";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image?: string;
  rating: number;
  inStock?: boolean;
  className?: string;
  originalPrice?: number;
}

const arrDevStr = [
  { id: 1, title: "Frontend" },
  { id: 2, title: "Backend" },
  { id: 3, title: "FullStack" },
];

export function CardPage({ ...props }: ProductCardProps) {
  const { isAuthenticated } = useAuth();
  const [arrDev, setArrDev] = useState(arrDevStr);
  const [inputValue, setInputValue] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleClickPush = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      if (editingId !== null) {
        handleSaveEdit(e);
      } else {
        setArrDev([...arrDev, { id: arrDev.length + 1, title: inputValue }]);
        setInputValue("");
      }
    }
  };

  const handleDelete = (id: number) => {
    setArrDev(arrDev.filter((dev) => dev.id !== id));
  };

  const handleEdit = (id: number) => {
    const devToEdit = arrDev.find((dev) => dev.id === id);
    if (devToEdit) {
      setInputValue(devToEdit.title);
      setEditingId(id);
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const editedDev = arrDev.find((dev) => dev.id === editingId);
      if (editedDev) {
        setArrDev(
          arrDev.map((dev) =>
            dev.id === editingId ? { ...dev, title: inputValue } : dev
          )
        );
        setInputValue("");
        setEditingId(null);
      }
    }
  };

  return (
    <div
      className={`border-2 p-4 rounded-2xl flex flex-col gap-5 ${props.className}`}
    >
      <div className="border-b-2 flex items-center justify-center">
        {props.image && (
          <img
            src={props.image}
            alt={props.title}
            className="w-70 rounded-2xl"
          />
        )}
      </div>
      <div className="flex-between">
        <div className="text-2xl font-semibold">{props.title}</div>
      </div>
      <FormInput
        value={inputValue}
        titleButton="Add"
        onSubmit={handleClickPush}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {arrDev.length > 0 ? (
        <div className="max-h-39 overflow-y-scroll scrollHidden">
          {arrDev.map((dev) => (
            <MinCardBlock
              key={dev.id}
              onDelete={
                isAuthenticated ? () => handleDelete(dev.id) : undefined
              }
              onEdit={isAuthenticated ? () => handleEdit(dev.id) : undefined}
            >
              {dev.title}
            </MinCardBlock>
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-400">List Empty</p>
      )}
    </div>
  );
}
