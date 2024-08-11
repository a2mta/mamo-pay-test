import { useCallback, useState } from 'react';
import axiosInstance from '../api';
import { CreatePaymentLinkResponse } from '../types';
import { AxiosResponse } from 'axios';

type UsePaymentLinkParams = {
  email: string;
  amount: number;
  firstName: string;
  lastName: string;
};

export const usePaymentLink = () => {
  const [isLoading, toggleLoading] = useState(false);
  const [paymentLink, setPaymentLink] = useState('');

  const generateLink = useCallback(
    ({
      email,
      amount,
      firstName,
      lastName,
    }: UsePaymentLinkParams): Promise<
      AxiosResponse<CreatePaymentLinkResponse>
    > => {
      toggleLoading(true);
      return axiosInstance
        .post<CreatePaymentLinkResponse>('/links', {
          title: 'Test payment',
          email,
          first_name: firstName,
          last_name: lastName,
          failure_return_url: 'http://localhost:3000',
          return_url: 'http://localhost:3000',
          amount,
          amount_currency: 'EUR',
          link_type: 'inline',
        })
        .then((res) => {
          toggleLoading(false);
          setPaymentLink(res.data.payment_url);
          return res;
        })
        .catch((e) => {
          console.error(e);
          return e;
        });
    },
    []
  );
  return { generateLink, isLoading, paymentLink };
};
