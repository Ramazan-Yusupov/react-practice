import { Card, CodeBlock } from '@/shared/ui';

type Categories = 'Fruit' | 'vegetable' | 'All';

interface IProduct {
  id: bigint;
  uniqueId: symbol;
  name: string;
  price: number;
  isAvailable: boolean;
  description: null;
  discount: undefined;
  categories: Categories;
}

const product: IProduct[] = [
  {
    id: 1n,
    uniqueId: Symbol('product-unique-id'),
    price: 10,
    name: 'Apple',
    isAvailable: true,
    description: null,
    discount: undefined,
    categories: 'Fruit',
  },
  {
    id: 2n,
    uniqueId: Symbol('product-unique-id'),
    price: 5,
    name: 'Carrot',
    isAvailable: true,
    description: null,
    discount: undefined,
    categories: 'vegetable',
  },
];

const types = [
  typeof product[0].id,
  typeof product[0].uniqueId,
  typeof product[0].name,
  typeof product[0].price,
  typeof product[0].isAvailable,
  typeof product[0].description,
  typeof product[0].discount,
  typeof product[0].categories,
];

export function JSPage() {
  return (
    <Card title="JavaScript Data Types" maxWidth="2xl" border="2px">
      {product.map((product) => (
        <CodeBlock
          key={product.id}
          title={product.name}
          codeL={product.price.toString()}
          codeR={product.categories}
          badge={product.isAvailable ? 'Available' : 'Not Available'}
        />
      ))}

      <CodeBlock title="Data Types" codeL={types.join(', ')} />
    </Card>
  );
}
