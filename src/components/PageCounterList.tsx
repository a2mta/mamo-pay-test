import { FC, useMemo } from 'react';

type PageCounterProps = {
  active?: boolean;
  count?: number;
  onClick?: (page: number) => void;
};

const MAX_PAGES_TO_SHOW = 5;
const SHIFT = 3;

const PageCounter: FC<PageCounterProps> = ({ onClick, count, active }) => {
  const handleClick = () => {
    if (count !== undefined && onClick) {
      onClick(count);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`w-[30px] h-[30px] cursor-pointer content-center text-center ${
        active ? 'bg-slate-300' : ''
      }`}
    >
      <span>{count !== undefined ? count : '...'}</span>
    </div>
  );
};

type PageCounterListProps = {
  totalPages: number;
  onPageChange?: (page: number) => void;
  currentPage: number;
};

const PageCounterList: FC<PageCounterListProps> = ({
  totalPages,
  onPageChange,
  currentPage,
}) => {
  const fullList = totalPages <= MAX_PAGES_TO_SHOW;
  const reachedLeftEdge = currentPage >= totalPages - MAX_PAGES_TO_SHOW;

  const calculatedShift = useMemo(() => {
    if (totalPages - currentPage < MAX_PAGES_TO_SHOW) {
      return totalPages - MAX_PAGES_TO_SHOW;
    }
    if (currentPage >= MAX_PAGES_TO_SHOW)
      return currentPage - (MAX_PAGES_TO_SHOW - SHIFT);
    return 0;
  }, [currentPage, totalPages]);

  const reachedRightEdge = totalPages - MAX_PAGES_TO_SHOW < currentPage;

  let indexes = useMemo(() => {
    const temp = [];
    //edge case
    if (reachedLeftEdge) {
      temp.push(totalPages - MAX_PAGES_TO_SHOW - 1);
    }
    //
    for (let index = 1; index < MAX_PAGES_TO_SHOW + 1; index++) {
      if (fullList) {
        temp.push(index);
      } else {
        temp.push(index + calculatedShift);
      }
    }
    return temp;
  }, [fullList, calculatedShift]);

  const itemsList = useMemo(() => {
    let items = [];

    if (totalPages < MAX_PAGES_TO_SHOW) {
      for (let index = 1; index <= totalPages; index++) {
        items.push(
          <PageCounter
            key={index}
            active={index === currentPage}
            onClick={onPageChange}
            count={index}
          />
        );
      }
    } else {
      items = indexes.map((item, index) => (
        <>
          <PageCounter
            key={item + index}
            active={item === currentPage}
            onClick={onPageChange}
            count={item}
          />
        </>
      ));
      if (!reachedRightEdge) {
        items.push(<PageCounter key='empty' />);
        items.push(
          <PageCounter
            key={totalPages}
            onClick={onPageChange}
            count={totalPages}
          />
        );
      }
    }
    return items;
  }, [currentPage, indexes, reachedRightEdge, totalPages]);

  return <div className='space-x-3 flex'>{itemsList}</div>;
};

export default PageCounterList;
