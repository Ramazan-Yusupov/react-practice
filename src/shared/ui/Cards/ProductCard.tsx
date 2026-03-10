import { useState, useEffect } from "react";
import { Card } from "./Card";
import { Button } from "../Buttons/Button";
import { BiCart } from "react-icons/bi";

interface ProductProps {
  id: number;
  title: string;
  price: number;
  maxStock: number;
  isAvailable: boolean;
}

interface ProductCardProps {
  product: ProductProps;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [count, setCount] = useState<number>(() => {
    const saved = localStorage.getItem(`count-${product.id}`);
    return saved ? JSON.parse(saved) : 0;
  });

  const [isLiked, setIsLiked] = useState<boolean>(() => {
    const saved = localStorage.getItem(`liked-${product.id}`);
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem(`count-${product.id}`, JSON.stringify(count));
  }, [count, product.id]);

  useEffect(() => {
    localStorage.setItem(`liked-${product.id}`, JSON.stringify(isLiked));
  }, [isLiked, product.id]);

  const handleIncrement = () => {
    if (count >= product.maxStock) {
      alert(`Limited quantity ${product.maxStock}`);
      return; // Прерываем функцию, запись не произойдет
    }

    const newCount = count + 1;
    setCount(newCount);
  };

  const handleDecrement = () => {
    if (count <= 0) {
      alert("Count cannot be negative");
      return;
    }

    const newCount = count - 1;
    setCount(newCount);
  };

  const handleReset = () => {
    setCount(0);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const basePrice = product.price * count;
  const totalPrice = Math.max(0, count > 5 ? basePrice * 0.9 : basePrice);
  const statusText = count > 0 ? `Total: ${count}` : "0";

  const disabledIncrement = !product.isAvailable || count >= product.maxStock;
  const disabledDecrement = !product.isAvailable || count === 0;
  const disabledReset = count === 0;

  return (
    <Card border="1px">
      <div className="flex-between gap-5">
        <h2>{product.title}</h2>
        <div className="relative">
          <BiCart size={30} />
          {count > 0 && (
            <div className="absolute top-4 right-0 text-sm w-4 h-4 rounded-full bg-red-500 flex justify-center items-center">
              {count}
            </div>
          )}
        </div>
      </div>
      <div className="flex-between gap-5">
        <p>Price: ${product.price}</p>
        {!product.isAvailable && <p className="text-red-500">Out of stock</p>}
        {count >= 5 && (
          <span className="text-green-500 text-sm font-bold">
            Скидка 10% Применена
          </span>
        )}
      </div>
      <div className="flex-between">
        <div className="font-bold">${totalPrice.toFixed(2)}</div>
        <p>
          {statusText}/{product.maxStock}
        </p>
      </div>
      <div className="flex-center gap-2">
        <Button
          title="+"
          maxWidth="400px"
          onClick={handleIncrement}
          disabled={disabledIncrement}
        />
        <Button
          title="-"
          maxWidth="400px"
          onClick={handleDecrement}
          disabled={disabledDecrement}
        />
        <Button
          title="Reset"
          maxWidth="400px"
          onClick={handleReset}
          disabled={disabledReset}
        />
        <Button title={isLiked ? "Unlike" : "Like"} onClick={toggleLike} />
      </div>
    </Card>
  );
};
