import { useSearchParams } from 'react-router-dom';
import { usePaymentLink } from './hooks/usePaymentLink';
import { FC, SyntheticEvent, useCallback, useMemo, useState } from 'react';
import Button from './components/Button';

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
    let gotErrors = false;
    for (const element of Object.values(form)) {
      if (element === '') {
        gotErrors = true;
      }
    }
    if (gotErrors) {
      setFormError('Please, fill the form');
    } else {
      generateLink(form);
    }
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
            <span>
              <h1>Test payment link</h1>
            </span>
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
  }, [paymentStatus, form.firstName, handleFormChange, isLoading]);

  return (
    <>
      <main className='flex h-full w-full items-center justify-center flex-col'>
        {content}
        {paymentLink && (
          <iframe
            src={paymentLink}
            width='400px'
            title='paymeny portal'
            height='400px'
          />
        )}
      </main>
    </>
  );
};

export default Payments;
