import React, { FC } from 'react';
import { Expens } from '../types';

const ExpensItem: FC<Expens> = ({ amount, date, currency, id }) => {
  return (
    <div className='flex flex-col'>
      <span>Expens: {id}</span>
      <span>Date: {date}</span>
      <span>Amount: {amount}</span>
      <span>Currency: {currency}</span>
    </div>
  );
};

export default ExpensItem;
