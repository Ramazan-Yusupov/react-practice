import { useState } from "react";
import { Card } from "./Card";
import { Button } from "../Buttons/Button";

interface ProductProps {
  id: number;
  title: string;
  price: number;
  isAvailable: boolean;
}

interface ProductCardProps {
  product: ProductProps;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [count, setCount] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    } else {
      alert("Count cannot be negative");
    }
  };

  const togglelike = () => {
    setIsLiked(!isLiked);
  };

  const totalPrice = product.price * count;

  const statusText = count > 0 ? `Total: ${count}` : "Select quantity";

  return (
    <Card border="1px">
      <div className="flex-between gap-5">
        <h2>{product.title}</h2>
        <Button title={isLiked ? "Unlike" : "Like"} onClick={togglelike} />
      </div>
      <div className="flex-between gap-5">
        <p>Price: ${product.price}</p>
        {!product.isAvailable && <p className="text-red-500">Out of stock</p>}
      </div>
      <div className="flex-between">
        <div className="font-bold">${totalPrice.toFixed(2)}</div>
        <p>{statusText}</p>
      </div>
      <div className="flex-center gap-2">
        <Button
          maxWidth="400px"
          title="+"
          onClick={handleIncrement}
          disabled={!product.isAvailable}
        />
        <Button
          maxWidth="400px"
          title="-"
          onClick={handleDecrement}
          disabled={!product.isAvailable || count === 0}
        />
      </div>
    </Card>
  );
};
