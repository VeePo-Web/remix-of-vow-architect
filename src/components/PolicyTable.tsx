interface PolicyTableProps {
  data: Array<{ label: string; value: string }>;
}

export function PolicyTable({ data }: PolicyTableProps) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse border border-border">
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-b border-border">
              <td className="px-4 py-3 font-medium bg-muted/30 w-1/3">
                {row.label}
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
