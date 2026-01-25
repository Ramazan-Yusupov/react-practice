import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function ModalAdminRequest({ isOpen, setIsOpen }: ModalProps) {
  const { user, submitAdminRequest } = useAuth();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    const result = await submitAdminRequest(message);
    setLoading(false);

    if (result) {
      setSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
        setMessage("");
      }, 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={() => setIsOpen(false)}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-800 border-2 border-gray-700 rounded-xl p-8 w-full max-w-md relative animate-in fade-in zoom-in duration-200"
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl transition-colors"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-6 text-white">
          Запрос прав администратора
        </h2>

        {success ? (
          <div className="text-center py-8">
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <p className="text-gray-300 text-lg">Запрос успешно отправлен!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Ваш Email
              </label>
              <Input
                type="email"
                value={user?.email || ""}
                disabled
                className="bg-gray-700 border-gray-600 text-gray-300 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Сопроводительное письмо
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Расскажите, почему вам нужны права администратора..."
                className="w-full h-32 bg-gray-900 border-2 border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading || !message.trim()}
              variant="primary"
              className="w-full"
            >
              {loading ? "Отправка..." : "Отправить запрос"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
