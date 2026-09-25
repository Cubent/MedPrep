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
      <div className="overflow-x-auto overscroll-x-contain rounded-2xl border border-gray-200 bg-white [-webkit-overflow-scrolling:touch]">
        {/* min-w keeps columns readable on phones: the card scrolls sideways instead of squeezing them. */}
        <table className="w-full min-w-[44rem] border-collapse text-left text-sm leading-relaxed">
          <caption className="caption-top border-b border-gray-200 bg-gray-50 px-4 py-3 text-left text-sm font-semibold text-[#06005A]">
            {caption}
          </caption>
          <thead className="bg-[#06005A] text-white">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={column.key}
                  scope="col"
                  className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide ${
                    index === 0 ? 'sticky left-0 z-10 bg-[#06005A]' : ''
                  }`}
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
                className={row.featured ? 'bg-[#F9F0E7]' : 'border-t border-gray-200 bg-white'}
              >
                {columns.map((column, index) => {
                  const isFirst = index === 0;
                  const Cell = isFirst ? 'th' : 'td';
                  return (
                    <Cell
                      key={column.key}
                      scope={isFirst ? 'row' : undefined}
                      className={`px-4 py-4 align-top text-gray-700 ${
                        isFirst
                          ? `sticky left-0 z-10 font-semibold text-[#000C3F] shadow-[1px_0_0_0_rgba(0,0,0,0.06)] ${
                              row.featured ? 'bg-[#F9F0E7]' : 'bg-white'
                            }`
                          : 'font-normal'
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
      <p className="mt-2 text-xs text-gray-500 sm:hidden" aria-hidden="true">
        Swipe sideways to see all columns.
      </p>
      {footnote && (
        <figcaption className="mt-2 text-xs leading-relaxed text-gray-500">{footnote}</figcaption>
      )}
    </div>
  </figure>
);
