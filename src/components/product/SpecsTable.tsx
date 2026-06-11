interface SpecsTableProps {
  specs: Record<string, string>
}

export function SpecsTable({ specs }: SpecsTableProps) {
  const entries = Object.entries(specs)

  return (
    <table className="w-full overflow-hidden rounded-xl border border-neutral-border text-sm">
      <tbody>
        {entries.map(([key, value], index) => (
          <tr key={key} className={index % 2 === 0 ? 'bg-neutral-bg' : 'bg-neutral-surface'}>
            <th scope="row" className="w-1/3 px-4 py-3 text-left font-medium text-neutral-muted">
              {key}
            </th>
            <td className="px-4 py-3 text-neutral-text">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
