import { useLocalStorage } from "@/hooks";
import { Card, CodeBlock } from "@/shared";
import { AnimatedList } from "@/shared/shadcn/ui/animated-list";

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
      <AnimatedList>
        <p>Item 1</p>
        <p>Item 2</p>
        <p>Item 3</p>
      </AnimatedList>
    </Card>
  );
}
