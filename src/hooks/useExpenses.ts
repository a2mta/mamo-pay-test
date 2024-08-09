import { getExpenses } from '../api/expenses';
import { useEffect, useState } from 'react';
import { Expens, ExpensPagination } from '../types';

export const useExpenses = (isPageMode?: boolean) => {
  //   const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pagingParams, setPagingParams] = useState<
    ExpensPagination | undefined
  >();

  const [data, setData] = useState<Expens[]>([]);
  // first i thought that
  // "Ensure the state is saved and can be shared between multiple screens"
  // means that page param should be accessible via get param to be able to share the link with necessary params that's why i tried to implement get params functionality
  useEffect(() => {
    setIsLoading(true);
    let limit = 5;
    // if (data.length === 0) {
    //   limit = pageFromGetParam * limit;
    // }
    getExpenses(page, limit).then((res) => {
      //   const nextPage =
      //     pageFromGetParam > page ? pageFromGetParam.toString() : page.toString();
      //   if (pageFromGetParam > page) {
      //     setPage(+nextPage);
      //   }
      //   setSearchParams({
      //     page: nextPage,
      //   });
      if (!pagingParams)
        setPagingParams(res?.data.pagination as ExpensPagination);
      setData((prev) =>
        isPageMode
          ? res?.data.expenses || []
          : [...prev, ...(res?.data.expenses || [])]
      );
      setIsLoading(false);
    });
  }, [page]);

  return { data, page, isLoading, setPage, pagingParams };
};
