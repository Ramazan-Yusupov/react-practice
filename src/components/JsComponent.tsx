import { Card } from "./Card";

const developers = [
  {
    id: 1,
    user: "Frontend",
    language: "JavaScript",
  },
  {
    id: 2,
    user: "Backend",
    language: "Nest.js",
  },
  {
    id: 3,
    user: "FullStack",
    language: "Nest.js, JavaScript",
  },
];

export function JsComponent() {
  return (
    <Card className="w-150">
      <div className="flex flex-col gap-5">
        {developers.map((dev) => (
          <div
            key={dev.id}
            className="flex justify-between w-full border-b border-gray-600 last:border-none pb-5 last:pb-0"
          >
            <div>{dev.user}</div>
            <div>{dev.language}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
