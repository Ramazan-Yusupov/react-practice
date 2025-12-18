import { Input } from "@/shared/ui/Input";
import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function ModalAuth({ isOpen, setIsOpen }: ModalProps) {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0  flex items-center justify-center z-50">
          <div className="border-2 rounded-lg p-6 w-96">
            <button
              onClick={() => setIsOpen(false)}
              className="float-right text-white hover:text-gray-400 text-3xl"
            >
              ×
            </button>

            {!isLogin ? (
              <>
                <h2 className="text-2xl font-bold mb-6">Register</h2>
                <div className="flex flex-col gap-3 mb-3">
                  <Input type="text" placeholder="Name" />
                  <Input type="email" placeholder="Email" />
                  <Input type="password" placeholder="Password" />
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mb-4">
                  Register
                </button>
                <p className="text-center text-gray-600">
                  Have account?{" "}
                  <button
                    onClick={() => setIsLogin(true)}
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Login
                  </button>
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-6 ">Login</h2>
                <div className="flex flex-col gap-3 mb-3">
                  <Input type="email" placeholder="Email" />
                  <Input type="password" placeholder="Password" />
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mb-4">
                  Login
                </button>
                <p className="text-center text-gray-600">
                  No account?{" "}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Register
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
