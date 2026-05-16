import { Card, CodeBlock } from "@/shared/ui";
import { useState } from "react";

type Status = "loading" | "success" | "error";

type User = {
  name: string;
  age: number;
};

export function UseState() {
  const [count, setCount] = useState<number>(0); // значение по умолчанию
  const [items, setItems] = useState<string[]>([]); // Массив
  const [user, setUser] = useState<User | null>(null); // Типизация
  const [status, setStatus] = useState<Status | null>("loading"); // Типизация

  const [countPrev, setCountPrev] = useState<number>(() => {
    return 0;
  }); // ленивая инициализация

  const [form, setForm] = useState({
    name: "",
    email: "",
  }); // Обновление объекта

  const [products] = useState<string[]>(() => {
    const raw = localStorage.getItem("products");
    return raw ? JSON.parse(raw) : [];
  }); // Локальное хранилище

  const [handler, setHandler] = useState<() => void>(() => {
    return () => {
      console.log("handler");
    };
  });

  const handleClick = () => {
    /* если использовать два setCount(count + 1) в ответ получим 1 */
    setCount(count + 1);
    setCount(count + 1);
  };
  const handleClickPrev = () => {
    /* если использовать два setCountPrev(prev => prev + 1) в ответ получим 2 */
    setCountPrev((prev) => prev + 1);
    setCountPrev((prev) => prev + 1);
  };

  const handleReset = () => {
    /* сбрасываем значения */
    setCount(0);
    setCountPrev(0);
  };

  const handleForm = () => {
    setForm((prev) => ({
      ...prev,
      name: "John",
    }));
  };

  const handleItems = () => {
    setItems((prev) => [...prev, "Item"]);
  };

  const handlerClick = () => {
    setHandler(() => {
      console.log("handler");
    });
  };

  return (
    <Card maxWidth="2xl" border="2px">
      <CodeBlock
        border="1px"
        title="Count: "
        codeL={count || "0"}
        onClick={handleClick}
      />
      <CodeBlock
        border="1px"
        title="Count: "
        codeL={countPrev || "0"}
        onClick={handleClickPrev}
      />
      <CodeBlock border="1px" title="Reset" onClick={handleReset} />
      <CodeBlock
        border="1px"
        title="Status"
        codeL={status}
        onClick={() => setStatus("success")}
      />
      <CodeBlock
        border="1px"
        title="User"
        codeL={JSON.stringify(user)}
        onClick={() => setUser({ name: "John", age: 30 })}
      />
      <CodeBlock
        border="1px"
        title="User"
        codeL={JSON.stringify(form)}
        onClick={handleForm}
      />
      <CodeBlock
        border="1px"
        title="User"
        codeL={JSON.stringify(items)}
        onClick={handleItems}
      />
      <CodeBlock
        border="1px"
        title="Products"
        codeL={JSON.stringify(products)}
      />
      <CodeBlock
        border="1px"
        title="Handler"
        codeL={JSON.stringify(handler)}
        onClick={handlerClick}
      />
    </Card>
  );
}
