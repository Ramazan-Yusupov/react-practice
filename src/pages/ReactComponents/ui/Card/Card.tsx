interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: number;
  inStock?: boolean;
  className?: string;
  originalPrice?: number; // for a discount
}

export function Card({ ...props }: ProductCardProps) {
  return (
    <div
      className={`border-2 p-4 rounded-2xl flex flex-col gap-5 ${props.className}`}
    >
      <div className="border-b-2">
        <img src={props.image} className="w-100 rounded-2xl" />
      </div>
      <div className="flex-between">
        <div className="text-2xl font-semibold">{props.title}</div>
      </div>
    </div>
  );
}
