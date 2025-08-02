import React from 'react';

import { Button } from '@/components/ui/button';
import { HeartIcon } from 'lucide-react';
import { DrawerDialog } from '@/components/app/DrawerDialog';
import { PaymentForm } from './payment-form';
import { formatCurrency } from '@/lib/utils';

interface Props {
  price: number;
}

const PriceCard = ({ price }: Props) => {
  return (
    <div className='borded max-h-min p-5 space-y-4 shadow-xs  rounded-lg py-8 bg-white'>
      <h2 className='text-5xl font-bold text-center'>
        {formatCurrency(price)}
      </h2>

      <DrawerDialog
        trigger={<Button className='w-full cursor-pointer'>Book Now</Button>}
      >
        <PaymentForm />
      </DrawerDialog>
      <Button className='w-full cursor-pointer' variant='outline'>
        <HeartIcon /> Add to Wishlist
      </Button>
    </div>
  );
};

export default PriceCard;
