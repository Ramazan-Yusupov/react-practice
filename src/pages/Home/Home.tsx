import { useToggle } from "@/hooks";
import { Badge, Button, Card } from "@/shared/ui";

export function Home() {
  const { toggle, handleToggle } = useToggle();
  return (
    <Card title="Frontend" maxWidth="2xl" border="2px">
      <Button title={toggle ? "Close" : "Open"} onClick={handleToggle} />
      {toggle && <Badge text="Is Open" color="green" />}
    </Card>
  );
}
