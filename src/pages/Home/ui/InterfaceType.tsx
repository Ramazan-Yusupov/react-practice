import { CodeBlock } from "@/components/CodeBlock";
import { useState } from "react";

type Props = {
  count: number;
  message: string;
  names: string[];
  disabled?: boolean;
  status: "online" | "offline";
  address?: {
    street: string;
    city: string;
  };
};

const itemsAddressPick: Pick<Props, "address">[] = [
  {
    address: {
      street: "123 Main St",
      city: "New York",
    },
  },
  {
    address: {
      street: "456 Oak Ave",
      city: "Los Angeles",
    },
  },
  {
    address: {
      street: " 789 Pine Rd",
      city: "Chicago",
    },
  },
];

export function InterfaceType({
  count,
  names,
  status,
  message,
  disabled,
}: Props) {
  const [click, setClick] = useState(count);
  return (
    <div className="space-y-4">
      <CodeBlock
        isBordered
        codeTitle="Interface Type"
        code={names.join(", ")}
      />
      <CodeBlock isBordered codeTitle="Message" code={message} />
      <CodeBlock
        isBordered
        codeTitle="Disabled"
        code={disabled ? "true" : "false"}
      />
      <CodeBlock
        isBordered
        onClick={() => setClick(click + 1)}
        codeTitle="Count"
        code={click.toString()}
      />
      <CodeBlock isBordered codeTitle="Status" code={status} />
      <CodeBlock
        isBordered
        codeTitle="Address"
        code={itemsAddressPick.map((item) => item.address?.street)}
      />
    </div>
  );
}
