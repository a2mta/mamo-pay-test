import { getExpenses } from '../api/expenses';
import { useEffect, useState } from 'react';
import { Expens, ExpensPagination } from '../types';

type UseExpensesParams = {
  keepPrevious?: boolean;
  page?: number;
  limit?: number;
};

/**
 * custom hook repsonsible for data fetching and formatting
 * @param {boolean} keepPrevious
 * @param {number} page
 * @param {number} limit
 * @public
 */

export const useExpenses = ({
  keepPrevious,
  page = 1,
  limit,
}: UseExpensesParams) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pagingParams, setPagingParams] = useState<
    ExpensPagination | undefined
  >();
  const [data, setData] = useState<Expens[]>([]);

  useEffect(() => {
    if (
      Number(pagingParams?.itemsPerPage) === limit &&
      Number(pagingParams?.currentPage) === page
    ) {
      return;
    }

    if (!pagingParams || page <= pagingParams.totalPages) {
      setIsLoading(true);
      getExpenses(page, limit).then((res) => {
        setPagingParams(res?.data.pagination as ExpensPagination);
        setData((prev) =>
          keepPrevious
            ? res?.data.expenses || []
            : [...prev, ...(res?.data.expenses || [])]
        );
        setIsLoading(false);
      });
    }
  }, [keepPrevious, page, pagingParams, limit]);

  return {
    data,
    page,
    isLoading,
    totalPages: pagingParams?.totalPages || 0,
  };
};
