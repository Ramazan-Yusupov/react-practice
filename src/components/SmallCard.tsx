import { AiFillCode, AiFillOpenAI, AiOutlineCode } from "react-icons/ai";

const card = [
  {
    id: 1,
    title: "Claude Code",
    icon: <AiOutlineCode />,
  },
  {
    id: 2,
    title: "OpenAl Codex",
    icon: <AiFillOpenAI />,
  },
  {
    id: 3,
    title: "Gemini CLI",
    icon: <AiFillCode />,
  },
];

export function SmallCard() {
  return (
    <div className="flex gap-10">
      {card.map((item) => (
        <div
          key={item.id}
          className="border border-gray-300 rounded-3xl p-6 w-50 flex flex-col items-center gap-4 hover:shadow-lg hover:scale-105 transition-transform cursor-pointer"
        >
          <div className="text-4xl mb-2 text-blue-500">{item.icon}</div>
          <h3 className="text-sm font-semibold">{item.title}</h3>
        </div>
      ))}
    </div>
  );
}
