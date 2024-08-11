import { useSearchParams, useNavigate } from 'react-router-dom';
import { usePaymentLink } from '../hooks/usePaymentLink';
import { FC, SyntheticEvent, useCallback, useMemo, useState } from 'react';
import Button from '../components/Button';

const ResetSection: FC<{ onClick: () => void; text: string }> = ({
  onClick,
  text,
}) => (
  <div className='flex flex-col'>
    <span>{text}</span>
    <Button onClick={onClick}>Try again</Button>
  </div>
);

const Payments = () => {
  const navigator = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [formError, setFormError] = useState<string | undefined>();
  const [form, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    amount: 0,
  });

  const paymentStatus =
    (searchParams.get('status') as 'captured' | 'failed') || '';

  const { generateLink, paymentLink, isLoading } = usePaymentLink();

  const handleClick = useCallback(() => {
    //propper form checking should be done via formik or some other lib
    for (const element of Object.values(form)) {
      console.info(element);
      if (element === '') {
        setFormError('Please, fill the form');
        return;
      }
    }
    generateLink(form);
  }, [form]);

  const handleFormChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setFormError(undefined);

    const { name, value } = e.currentTarget;
    setFormData({
      ...form,
      [name]: value,
    });
  };

  const handleReset = () => {
    setSearchParams({});
  };

  const content = useMemo(() => {
    switch (paymentStatus) {
      case 'captured':
        return (
          <ResetSection
            text={'ALL DONE! YOU ARE AWESOME!'}
            onClick={handleReset}
          />
        );
      case 'failed':
        return (
          <ResetSection
            text={'DOUH! SOMETHING WENT WRONG!'}
            onClick={handleReset}
          />
        );
      default:
        return (
          <div className='flex flex-col space-y-3 mb-5'>
            {formError && <span className='text-red-400'>{formError}</span>}
            <span className='flex flex-col'>
              <label htmlFor='name'>First Name</label>
              <input
                value={form.firstName}
                onChange={handleFormChange}
                type='text'
                name='firstName'
              />
            </span>
            <span className='flex flex-col'>
              <label htmlFor='name'>Last Name</label>
              <input
                value={form.lastName}
                onChange={handleFormChange}
                type='text'
                name='lastName'
              />
            </span>
            <span className='flex flex-col'>
              <label htmlFor='email'>Email</label>
              <input
                value={form.email}
                onChange={handleFormChange}
                type='email'
                name='email'
              />
            </span>
            <span className='flex flex-col'>
              <label htmlFor='amount'>Amount</label>
              <input
                value={form.amount}
                onChange={handleFormChange}
                type='number'
                name='amount'
              />
            </span>
            <Button busy={isLoading} onClick={handleClick}>
              Get Link
            </Button>
          </div>
        );
    }
  }, [paymentStatus, formError, form, isLoading]);

  const handleRouteChange = () => {
    navigator('/expenses');
  };

  return (
    <>
      <main className='flex h-full w-full items-center justify-center flex-col'>
        <span className='mb-5'>
          <Button onClick={handleRouteChange}>go to expenses page</Button>
        </span>
        {content}
        {paymentLink && (
          <iframe
            src={paymentLink}
            width='400px'
            title='payment portal'
            height='600px'
          />
        )}
      </main>
    </>
  );
};

export default Payments;
