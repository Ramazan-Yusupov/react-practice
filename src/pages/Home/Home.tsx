import { useToggle } from "@/hooks";
import { Button, Card } from "@/shared/ui";

export function Home() {
  const { toggle, handleToggle } = useToggle();
  return (
    <Card title="Frontend" maxWidth="2xl" border="2px">
      <Button title="Button" onClick={handleToggle} />
      {toggle && <p>Toggle is ON</p>}
    </Card>
  );
}
