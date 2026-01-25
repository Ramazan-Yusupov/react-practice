import { type ReactNode } from "react";

interface AdminTableProps {
  headers: string[];
  children: ReactNode;
}

export function AdminTable({ headers, children }: AdminTableProps) {
  return (
    <div className="bg-gray-900/50 border-2 border-gray-800 rounded-3xl backdrop-blur-md">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-800 bg-gray-800/20">
            {headers.map((header) => (
              <th
                key={header}
                className="py-5 px-6 text-gray-400 font-bold uppercase text-[10px] sm:text-xs tracking-widest whitespace-nowrap"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
