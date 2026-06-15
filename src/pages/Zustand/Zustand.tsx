import { useItems } from '@/hooks/useItems';
import { Badge, Button, Card, Input } from '@/shared/ui';

export function Zustand() {
  const { items, text, setText, handleAddItem, handleDelete } = useItems();
  return (
    <Card title="Zustand" border="2px" maxWidth="2xl">
      <div className="flex gap-2">
        <Input
          value={text}
          placeholder="Add Item Badge"
          onChange={(e) => setText(e.target.value)}
        />
        <Button title="Add" onClick={handleAddItem} />
      </div>

      <div className="flex flex-wrap gap-3">
        {items.map((item) => (
          <Badge key={item.id} text={item.text} onDelete={() => handleDelete(item.id)} />
        ))}
      </div>
      {items.length === 0 && <Badge text="No Added Badge" className="mx-auto" color="white" />}
    </Card>
  );
}
