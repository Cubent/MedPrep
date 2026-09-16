import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * Renders question stems/explanations as Markdown, with GFM tables enabled
 * (for lab-value tables, etc.). Content comes from our own seeded/authored
 * data, not user input.
 */
export const RichText = ({ content, className }: { content: string; className?: string }) => (
  <div
    className={`prose prose-sm max-w-none dark:prose-invert prose-table:mx-auto prose-table:text-sm prose-th:bg-gray-50 dark:prose-th:bg-white/5 prose-td:border prose-th:border prose-td:border-gray-200 dark:prose-td:border-white/10 dark:prose-th:border-white/10 prose-td:px-3 prose-th:px-3 prose-td:py-1.5 prose-th:py-1.5 prose-td:text-center prose-th:text-center ${className ?? ''}`}
  >
    <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
  </div>
);
