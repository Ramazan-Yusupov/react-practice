type Types = {
  id: number;
  age: number;
  dev: string;
  lang: string;
  name: string;
  price: number;
  color: string;
};

export const countMock: Pick<Types, "id" | "name">[] = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Smartphone" },
  { id: 3, name: "Headphones" },
  { id: 4, name: "Tablet" },
  { id: 5, name: "Keyboard" },
  { id: 6, name: "Monitor" },
  { id: 7, name: "Mouse" },
  { id: 8, name: "Charger" },
  { id: 9, name: "Speaker" },
  { id: 10, name: "Webcam" },
];

export const itemsMock: Omit<Types, "dev" | "lang" | "age">[] = [
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
  { id: 1, dev: "Frontend", lang: "React.js", age: 23 },
  { id: 2, dev: "Backend", lang: "Node.js", age: 24 },
  { id: 3, dev: "FullStack", lang: "React.js + Node.js", age: 23 },
  { id: 4, dev: "DevOps", lang: "Docker", age: 26 },
  { id: 5, dev: "QU Engineer", lang: "Jest", age: 30 },
  { id: 6, dev: "Web Design", lang: "Figma", age: 25 },
  { id: 7, dev: "FullStack", lang: "Next.js + Express", age: 27 },
  { id: 8, dev: "Frontend", lang: "Angular", age: 21 },
  { id: 9, dev: "FullStack", lang: "React.js + Python", age: 26 },
  { id: 10, dev: "Frontend", lang: "Svelte", age: 22 },
];
