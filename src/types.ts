export type Expense = {
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

export type ExpensePagination = {
  currentPage: string;
  totalPages: number;
  totalItems: number;
  itemsPerPage: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

//ideally it should be a generic which will be able to acept any kind of request type
export type ExpensesRequest = {
  expenses: Expense[];
  pagination: ExpensePagination;
};

//payment API

type Customdata = {};

type Prefilledcustomer = {
  email: string;
};

type Rules = {
  allowed: any[];
};

export type CreatePaymentLinkResponse = {
  description: string;
  capacity?: any;
  active: boolean;
  return_url: string;
  failure_return_url: string;
  send_customer_receipt: boolean;
  custom_data: Customdata;
  amount_currency: string;
  platform: string;
  prefilled_customer: Prefilledcustomer;
  title: string;
  external_id?: any;
  hold_and_charge_later: boolean;
  name: string;
  enable_tabby: boolean;
  is_widget: boolean;
  link_type: string;
  id: string;
  amount: number;
  max_amount?: any;
  processing_fee_percentage: number;
  processing_fee_amount?: any;
  enable_message: boolean;
  enable_tips: boolean;
  enable_quantity: boolean;
  payment_methods: string[];
  rules: Rules;
  enable_customer_details: boolean;
  payment_url: string;
  save_card: string;
  subscription?: any;
  payouts_share?: any;
};

//
