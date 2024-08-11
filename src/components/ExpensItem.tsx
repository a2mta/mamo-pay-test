import { FC } from 'react';
import { Expense } from '../types';

const ExpensItem: FC<Expense> = ({ amount, date, currency, id }) => {
  return (
    <div className='flex flex-col'>
      <span>Expense: {id}</span>
      <span>Date: {date}</span>
      <span>Amount: {amount}</span>
      <span>Currency: {currency}</span>
    </div>
  );
};

export default ExpensItem;
