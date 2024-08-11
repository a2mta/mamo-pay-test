import { FC, useMemo } from 'react';

type PageCounterProps = {
  active?: boolean;
  count?: number | string;
  onClick?: () => void;
};

const MAX_PAGES_TO_SHOW = 5;

const PageCounter: FC<PageCounterProps> = ({ onClick, count, active }) => {
  return (
    <div
      onClick={onClick}
      className={`w-[30px] h-[30px] cursor-pointer content-center text-center ${
        active ? 'bg-slate-300' : ''
      }`}
    >
      <span>{count}</span>
    </div>
  );
};

type PageCounterListProps = {
  totalPages: number;
  onPageChange?: (page: number) => void;
  currentPage: number;
};

//NOTE: The component is generated via CHAT GPT, at first I was planning to make a custom implementation, but that would have taken too long
const PageCounterList: FC<PageCounterListProps> = ({
  totalPages,
  onPageChange,
  currentPage,
}) => {
  const pageCounter = useMemo(() => {
    let pages = [];
    if (totalPages <= MAX_PAGES_TO_SHOW) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, '...', totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [
          1,
          '...',
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        pages = [
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages,
        ];
      }
    }
    return pages;
  }, [currentPage, totalPages]);

  const handlePageClick = (page: string | number) => {
    //dumb solution, it should be hanlded via implementing proper page counter types
    if (page !== '...') {
      if (onPageChange) {
        onPageChange(+page);
      }
    }
  };

  return (
    <div className='space-x-3 flex'>
      {pageCounter.map((page, index) => (
        <PageCounter
          key={page + index.toString()}
          active={page === currentPage}
          onClick={() => handlePageClick(page)}
          count={page}
        />
      ))}
    </div>
  );
};

export default PageCounterList;
