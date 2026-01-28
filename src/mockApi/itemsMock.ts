type ProductType = {
  id: number;
  name: string;
  price: number;
  color: string;
};

export const itemsMock: ProductType[] = [
  { id: 1, name: "Laptop", price: 899, color: "black" },
  { id: 2, name: "Smartphone", price: 899, color: "black" },
  { id: 3, name: "Headphones", price: 50, color: "white" },
  { id: 4, name: "Tablet", price: 899, color: "black" },
  { id: 5, name: "Keyboard", price: 210, color: "blue" },
];
