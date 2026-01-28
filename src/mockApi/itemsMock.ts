type Types = {
  id: number;
  dev: string;
  lang: string;
  name: string;
  price: number;
  color: string;
};

export const itemsMock: Omit<Types, "dev" | "lang">[] = [
  { id: 1, name: "Laptop", price: 2033, color: "black" },
  { id: 2, name: "Smartphone", price: 422, color: "black" },
  { id: 3, name: "Headphones", price: 514, color: "white" },
  { id: 4, name: "Tablet", price: 89, color: "black" },
  { id: 5, name: "Keyboard", price: 10, color: "blue" },
  { id: 6, name: "Monitor", price: 150, color: "black" },
  { id: 7, name: "Mouse", price: 25, color: "white" },
  { id: 8, name: "Charger", price: 15, color: "black" },
  { id: 9, name: "Speaker", price: 75, color: "gray" },
  { id: 10, name: "Webcam", price: 40, color: "black" },
];

export const devsMock: Omit<Types, "name" | "price" | "color">[] = [
  { id: 1, dev: "Frontend", lang: "React.js" },
  { id: 2, dev: "Backend", lang: "Node.js" },
  { id: 3, dev: "FullStack", lang: "React.js + Node.js" },
  { id: 4, dev: "DevOps", lang: "Docker" },
  { id: 5, dev: "QU Engineer", lang: "Jest" },
  { id: 6, dev: "Web Design", lang: "Figma" },
  { id: 7, dev: "FullStack", lang: "Next.js + Express" },
  { id: 8, dev: "Frontend", lang: "Angular" },
  { id: 9, dev: "FullStack", lang: "React.js + Python" },
  { id: 10, dev: "Frontend", lang: "Svelte" },
];
