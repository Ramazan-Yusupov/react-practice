import { Card } from "@/components/Card";
import { FindSearch } from "@/components/FindSearch";

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
        <FindSearch />
      </Card>
    </div>
  );
}
