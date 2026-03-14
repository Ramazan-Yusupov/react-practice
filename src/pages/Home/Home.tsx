import { useLocalStorage } from "@/hooks";
import { Card, CodeBlock } from "@/shared";

export function Home() {
  const [click, setClick] = useLocalStorage<number>("count", 0);

  const handleClick = () => {
    setClick((prev) => prev + 1);
  };
  return (
    <Card border="2px" maxWidth="xl">
      <CodeBlock
        border="2px"
        title="Frontend"
        codeL={`${click}`}
        onClick={handleClick}
      />
    </Card>
  );
}
