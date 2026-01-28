import { Card } from "@/components/Card";
import { CounterCard } from "@/components/CounterCard";

export default function Home() {
  return (
    <div>
      <Card
        avatar
        isOnline
        isErrorOnOff
        maxWidth="xl"
        title="Frontend"
        maxHeight={630}
      >
        <CounterCard />
      </Card>
    </div>
  );
}
