import { Card, CodeBlock, Typography } from '@/shared/ui';

type Categories = 'Fruit' | 'vegetable' | 'All';

interface IProduct {
  id: bigint;
  uniqueId: symbol;
  name: string;
  price: string;
  isAvailable: boolean;
  description: null;
  discount: number;
  categories: Categories;
}

const product: IProduct[] = [
  {
    id: 1n,
    uniqueId: Symbol('product-unique-id'),
    price: '10',
    name: 'Apple',
    isAvailable: true,
    description: null,
    discount: 10,
    categories: 'Fruit',
  },
  {
    id: 2n,
    uniqueId: Symbol('product-unique-id'),
    price: '5',
    name: 'Carrot',
    isAvailable: true,
    description: null,
    discount: 20,
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

const check = {
  isArray: Array.isArray(product),
  isNull: product[0].description === null,
  priceType: typeof product[0].price,
  priceString: String(product[0].price),
  idType: typeof product[0].id,
};

const parse = parseInt('25px');

export function JSPage() {
  return (
    <Card title="JavaScript Data Types" maxWidth="2xl" border="2px">
      {product.map((product) => (
        <CodeBlock
          key={product.id}
          title={product.name}
          codeL={Number(product.price)}
          codeR={product.categories}
          badge={product.isAvailable ? 'Available' : 'Not Available'}
        />
      ))}

      <CodeBlock title="Data Types" codeL={types.join(', ')} />
      <CodeBlock
        title="Check Data Types"
        codeL={`isArray: ${check.isArray}, isNull: ${check.isNull}, priceType: ${check.priceType}, priceString: ${check.priceString}, idType: ${check.idType}`}
      />

      <Typography as="h5" text={parse} align="start" />
    </Card>
  );
}
