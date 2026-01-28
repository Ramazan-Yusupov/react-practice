import { Card } from "@/components/Card";
import { FilterSearch } from "@/components/FilterSearch";

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
        <FilterSearch />
      </Card>
    </div>
  );
}
