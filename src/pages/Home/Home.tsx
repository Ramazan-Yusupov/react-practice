import { Card } from "@/components/Card";
import { CodeBlock } from "@/components/CodeBlock";
import { StatusOnOffline } from "@/components/StatusOnOffline";

export default function Home() {
  const itemsArr = ["Frontend", "Backend", "Fullstack", "DevOps", "Design"];
  return (
    <div>
      <Card maxWidth="xl" title="Title">
        <StatusOnOffline isOnline text />
        {itemsArr.map((item, index) => (
          <CodeBlock key={index} codeTitle={item} code={item} isBordered />
        ))}
      </Card>
    </div>
  );
}
