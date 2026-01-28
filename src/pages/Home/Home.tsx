import { Card } from "@/components/Card";
import { FilterItems } from "@/components/FilterItems";

export default function Home() {
  return (
    <div>
      <Card
        avatar
        isOnline
        isErrorOnOff
        maxWidth="xl"
        title="Frontend"
        maxHeight={360}
      >
        <FilterItems />
      </Card>
    </div>
  );
}
