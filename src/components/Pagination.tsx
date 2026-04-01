interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  disabled?: boolean;
  maxShown?: number;
}

function buildPageRange(current: number, total: number, maxShown = 7) {
  const half = Math.floor(maxShown / 2);
  let start = Math.max(1, current - half);
  let end = Math.min(total, start + maxShown - 1);
  if (end - start + 1 < maxShown) {
    start = Math.max(1, end - maxShown + 1);
  }
  const pages: number[] = [];
  for (let i = start; i <= end; i++) pages.push(i);
  return pages;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
  disabled = false,
  maxShown = 6,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = buildPageRange(page, totalPages, maxShown);

  return (
    <nav aria-label="Pagination" className="flex justify-center gap-2">
      <button
        onClick={() => onPageChange && onPageChange(Math.max(1, page - 1))}
        disabled={disabled || page <= 1}
        className={`glass-panel px-3 py-1 ${page <= 1 || disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
      >
        Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange && onPageChange(p)}
          aria-current={p === page ? 'page' : undefined}
          className={`glass-panel px-3 py-1 ${p === page ? 'font-semibold' : 'font-normal'} ${disabled ? 'opacity-50' : ''} ${p === page ? 'cursor-default' : 'cursor-pointer'}`}
          disabled={disabled}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange && onPageChange(Math.min(totalPages, page + 1))}
        disabled={disabled || page >= totalPages}
        className={`glass-panel px-3 py-1 ${page >= totalPages || disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
      >
        Next
      </button>
    </nav>
  );
}
