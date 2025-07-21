import React from 'react';

import { Button } from '@/components/ui/button';
import { HeartIcon } from 'lucide-react';

const PriceCard = () => {
  return (
    <div className='border max-h-min p-5 space-y-4 shadow-xs  rounded-md py-8'>
      <h2 className='text-5xl font-bold text-center'>
        $55{' '}
        <span className='text-muted-foreground text-lg font-normal'>
          / person
        </span>
      </h2>

      <Button className='w-full cursor-pointer'>Sign Up Now</Button>
      <Button className='w-full cursor-pointer' variant='outline'>
        <HeartIcon /> Add to Wishlist
      </Button>
    </div>
  );
};

export default PriceCard;
