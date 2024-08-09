import { MutableRefObject, useEffect, useRef, useState } from 'react';
import ExpensItem from './components/ExpensItem';
import { useExpenses } from './hooks/useExpenses';
import PageCounterList from './components/PageCounterList';
import { useSearchParams } from 'react-router-dom';

const Expensess = () => {
    const [isPaginatedMode, toggleMode] = useState(true);
    const { data, setPage, isLoading, pagingParams, page } = useExpenses(isPaginatedMode);
  const observer: MutableRefObject<IntersectionObserver | null> = useRef(null);
  const totalPages = pagingParams?.totalPages || 0;
  const lastItemRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = isPaginatedMode ? +(searchParams.get('page') || 0) : 0;

  useEffect(() => {
    if (isPaginatedMode) return;
    if (isLoading) {
      if (observer.current) observer.current.disconnect();
      return;
    }
    console.info('IS LOADING', isLoading);
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
    toggleMode((prev) => !prev);
  };

  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='flex flex-col h-[300px] w-[450px]'>
        <div className='flex space-x-5 mb-5'>
          <input
            onClick={handleToggleMode}
            type='checkbox'
            id='viewMode'
            name='viewMode'
            defaultChecked={true}
          />
          <label htmlFor='viewMode'>Page mode</label>
        </div>
        <div className='flex flex-col overflow-y-auto mb-5 h-full w-full space-y-5'>
          {data?.map((item, index) => (
            <span ref={index === data.length - 1 ? lastItemRef : null}>
              <ExpensItem key={item.id + index} {...item} />
            </span>
          ))}
        </div>
        <PageCounterList
          currentPage={page}
          onPageChange={(page) => {
            setPage(page);
          }}
          totalPages={totalPages}
        />
        {isLoading && <span className='w-full text-center'>Loading...</span>}
      </div>
    </div>
  );
};

export default Expensess;
