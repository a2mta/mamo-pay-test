import { MutableRefObject, useEffect, useRef, useState } from 'react';
import ExpensItem from '../components/ExpensItem';
import { useExpenses } from '../hooks/useExpenses';
import PageCounterList from '../components/PageCounterList';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageSizeSelect from '../components/PageSizeSelect';
import Button from '../components/Button';

const Expensess = () => {
  const navigator = useNavigate();
  const [isPaginatedMode, toggleMode] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNumberGetParam = +(searchParams.get('page') || 1);
  const pageLimitGetParam = +(searchParams.get('limit') || 5);
  //inner copy of page param for infinite scroll
  const [page, setPage] = useState(pageNumberGetParam || 1);
  //

  const { data, isLoading, totalPages } = useExpenses({
    keepPrevious: isPaginatedMode,
    page,
    limit: pageLimitGetParam,
  });

  const observer: MutableRefObject<IntersectionObserver | null> = useRef(null);

  const lastItemRef = useRef(null);
  const currentPage = isPaginatedMode ? pageNumberGetParam : 1;

  useEffect(() => {
    if (isPaginatedMode) return;
    if (isLoading) {
      if (observer.current) observer.current.disconnect();
      return;
    }

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (!isLoading) {
          setPage((prevPage) => +prevPage + 1);
        }
      }
    });

    if (lastItemRef.current) observer?.current.observe(lastItemRef.current);
  }, [isLoading, isPaginatedMode, setPage]);

  const handleToggleMode = () => {
    toggleMode((prev) => {
      const isNewModePaginated = !prev;
      setSearchParams((params) => {
        if (isNewModePaginated) {
          params.set('page', '1');
        } else {
          params.delete('page');
          setPage(1);
        }
        return params;
      });
      return isNewModePaginated;
    });
  };

  const handlePageChange = (pageIndex: number) => {
    setSearchParams((params) => {
      params.set('page', pageIndex.toString());
      return params;
    });
    setPage(pageIndex);
  };

  const handleRouteChange = () => {
    navigator('/');
  };

  return (
    <div className='flex items-center justify-center w-full h-full flex-col'>
      <span className='mb-5'>
        <Button onClick={handleRouteChange}>go to main page</Button>
      </span>
      <div
        //NOTE: Classnames should be handled properly via classname lib or something similar
        className={`flex flex-col h-full max-h-[300px] relative  w-[450px] ${
          isLoading ? 'cursor-wait' : ''
        }`}
      >
        <div className='flex justify-between mb-5  '>
          <div className='flex space-x-5'>
            <input
              onClick={handleToggleMode}
              type='checkbox'
              id='viewMode'
              name='viewMode'
              defaultChecked={true}
              className='cursor-pointer'
            />
            <label htmlFor='viewMode' className='cursor-pointer'>
              Page mode
            </label>
          </div>
          <PageSizeSelect />
        </div>
        {isLoading && (
          <div className='flex h-full absolute w-full top-0 left-0 justify-center items-center bg-slate-300 opacity-60'>
            Loading...
          </div>
        )}
        {data && (
          <div className='flex flex-col overflow-y-auto mb-5 h-full w-full space-y-5'>
            {data.map((item, index) => (
              <span
                key={item.id + index}
                ref={index === data.length - 1 ? lastItemRef : null}
              >
                <ExpensItem {...item} />
              </span>
            ))}
          </div>
        )}

        {isPaginatedMode && (
          <PageCounterList
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
        )}
      </div>
    </div>
  );
};

export default Expensess;
