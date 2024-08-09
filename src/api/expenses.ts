import axios from 'axios';
import { BASE_URL } from '.';
import { ExpensesRequest } from '../types';

export const getExpenses = (page: number = 1, limit: number = 10) =>
  axios
    .get<ExpensesRequest>(BASE_URL + `/expenses?page=${page}&limit=${limit}`)
    .then((res) => res)
    .catch((e) => {
      console.error(e);
      return undefined;
    });
