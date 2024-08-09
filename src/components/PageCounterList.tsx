import React, { FC, useMemo } from 'react';

const PageCounter: FC<{ count?: number; onClick?: (page: number) => void }> = ({
  onClick,
  count,
}) => {
  const handleClick = () => {
    if (count !== undefined && onClick) {
      onClick(count);
    }
  };
  return (
    <div
      onClick={handleClick}
      className='w-[30px] h-[30px] cursor-pointer content-center text-center'
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
  console.info(currentPage);
  const MAX_PAGES_TO_SHOW = 5;
  const shift =
    currentPage >= MAX_PAGES_TO_SHOW
      ? currentPage - (MAX_PAGES_TO_SHOW - 3)
      : 0;
  const fullList = totalPages <= MAX_PAGES_TO_SHOW;

  const reachedRightEdge = totalPages - MAX_PAGES_TO_SHOW < currentPage;

  let indexes = useMemo(() => {
    const temp = [];
    for (let index = 1; index < MAX_PAGES_TO_SHOW + 1; index++) {
      if (fullList) {
        temp.push(index);
      } else {
        temp.push(index + shift);
      }
    }
    return temp;
  }, [fullList, shift]);

  console.info(shift, indexes, 'SHIFT', currentPage, fullList);
  const SHIFT = 2;
  const itemsList = useMemo(() => {
    let items = [];

    if (totalPages < MAX_PAGES_TO_SHOW) {
      for (let index = 1; index <= totalPages; index++) {
        items.push(<PageCounter onClick={onPageChange} count={index} />);
      }
    } else {
      items = indexes.map((item) => (
        <PageCounter onClick={onPageChange} count={item} />
      ));
      if (!reachedRightEdge) {
        items.push(<PageCounter />);
        items.push(<PageCounter onClick={onPageChange} count={totalPages} />);
      }
    }
    return items;
  }, [indexes, totalPages]);

  return <div className='space-x-3 flex'>{itemsList}</div>;
};

export default PageCounterList;
