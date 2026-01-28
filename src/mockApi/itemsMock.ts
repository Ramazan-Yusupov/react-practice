type Types = {
  id: number;
  dev: string;
  lang: string;
  name: string;
  price: number;
  color: string;
};

export const itemsMock: Omit<Types, "dev" | "lang">[] = [
  { id: 1, name: "Laptop", price: 899, color: "black" },
  { id: 2, name: "Smartphone", price: 899, color: "black" },
  { id: 3, name: "Headphones", price: 50, color: "white" },
  { id: 4, name: "Tablet", price: 899, color: "black" },
  { id: 5, name: "Keyboard", price: 210, color: "blue" },
];

export const devsMock: Omit<Types, "name" | "price" | "color">[] = [
  { id: 1, dev: "Frontend", lang: "React.js" },
  { id: 2, dev: "Backend", lang: "Node.js" },
  { id: 3, dev: "FullStack", lang: "React.js + Node.js" },
];
