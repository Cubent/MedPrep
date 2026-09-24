import type { ReactNode } from 'react';

export type TableColumn = { key: string; label: string };

export type TableRow = {
  id: string;
  /** Highlighted row, used for our own product. */
  featured?: boolean;
  cells: Record<string, ReactNode>;
};

type ComparisonTableProps = {
  caption: string;
  columns: TableColumn[];
  rows: TableRow[];
  footnote?: ReactNode;
};

// Breaks out of the narrow prose column to use the full viewport width, then
// re-centers at a wider max width. `left-1/2` + negative `50vw` margins is
// the standard full-bleed technique: it works regardless of how deep this
// sits inside the narrower parent container.
export const ComparisonTable = ({ caption, columns, rows, footnote }: ComparisonTableProps) => (
  <figure className="not-prose relative left-1/2 my-8 w-screen max-w-none -translate-x-1/2 px-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-6xl">
      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
        <table className="w-full border-collapse text-left text-sm leading-relaxed">
          <caption className="caption-top border-b border-gray-200 bg-gray-50 px-4 py-3 text-left text-sm font-semibold text-[#06005A]">
            {caption}
          </caption>
          <thead className="bg-[#06005A] text-white">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="px-4 py-3 text-xs font-semibold uppercase tracking-wide"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className={row.featured ? 'bg-[#C46B10]/10' : 'border-t border-gray-200 bg-white'}
              >
                {columns.map((column, index) => {
                  const isFirst = index === 0;
                  const Cell = isFirst ? 'th' : 'td';
                  return (
                    <Cell
                      key={column.key}
                      scope={isFirst ? 'row' : undefined}
                      className={`px-4 py-4 align-top text-gray-700 ${
                        isFirst ? 'font-semibold text-[#000C3F]' : 'font-normal'
                      } ${row.featured && isFirst ? 'border-l-4 border-[#C46B10]' : ''}`}
                    >
                      {row.cells[column.key]}
                    </Cell>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {footnote && (
        <figcaption className="mt-2 text-xs leading-relaxed text-gray-500">{footnote}</figcaption>
      )}
    </div>
  </figure>
);
