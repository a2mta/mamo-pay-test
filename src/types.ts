export type Expens = {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  status: string;
  receiptAttached: boolean;
};

//ideally it should be a generic which will be able to acept any kind of request type
export type ExpensPagination = {
  currentPage: string;
  totalPages: number;
  totalItems: number;
  itemsPerPage: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type ExpensesRequest = {
  expenses: Expens[];
  pagination: ExpensPagination;
};
