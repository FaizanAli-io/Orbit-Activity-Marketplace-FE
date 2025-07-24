import React from 'react';
import { PaymentForm } from '../../activity/payment-form';
import { Button } from '@/components/ui/button';

const Page = () => {
  return (
    <div className='mx-5 max-w-full md:max-w-lg'>
      <PaymentForm
        submitButton={
          <div className='flex justify-end'>
            <Button type='submit'>Save changes</Button>
          </div>
        }
      />
    </div>
  );
};

export default Page;
