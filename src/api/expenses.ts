import { axiosMockInstance } from '.';
import { ExpensesRequest } from '../types';

export const getExpenses = (page: number = 1, limit: number = 10) =>
  axiosMockInstance
    .get<ExpensesRequest>(`/expenses?page=${page}&limit=${limit}`)
    .then((res) => res)
    .catch((e) => {
      console.error(e);
      return undefined;
    });
