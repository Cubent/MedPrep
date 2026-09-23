import Link from 'next/link';
import type { ReactNode } from 'react';

export type TableColumn = { key: string; label: string };

export type TableRow = {
  id: string;
  /** Ad-style highlighted row, used for our own product. */
  featured?: boolean;
  /** Small label above the first cell, e.g. "Our product". */
  badge?: string;
  /** Button rendered under the first cell of a featured row. */
  cta?: { label: string; href: string };
  cells: Record<string, ReactNode>;
};

type ComparisonTableProps = {
  caption: string;
  columns: TableColumn[];
  rows: TableRow[];
  footnote?: ReactNode;
};

export const ComparisonTable = ({ caption, columns, rows, footnote }: ComparisonTableProps) => (
  <figure className="not-prose my-8">
    <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
      <table className="w-full min-w-[760px] border-collapse text-left text-sm leading-relaxed">
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
                    {isFirst && row.badge && (
                      <span className="mb-2 block w-fit rounded-full bg-[#C46B10] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                        {row.badge}
                      </span>
                    )}
                    {row.cells[column.key]}
                    {isFirst && row.cta && (
                      <Link
                        href={row.cta.href}
                        className="mt-3 inline-block rounded-full bg-[#C46B10] px-4 py-2 text-xs font-semibold text-white no-underline transition-colors hover:bg-[#a95a0d]"
                      >
                        {row.cta.label}
                      </Link>
                    )}
                  </Cell>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {footnote && <figcaption className="mt-2 text-xs leading-relaxed text-gray-500">{footnote}</figcaption>}
  </figure>
);
