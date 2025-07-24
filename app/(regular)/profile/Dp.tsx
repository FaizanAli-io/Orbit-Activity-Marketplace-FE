import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const Dp = () => {
  return (
    <div className='flex items-center space-x-5'>
      <div className='-translate-y-2.5'>
        <p className='text-muted-foreground font-bold mb-1 text-sm'>
          Profile Picture
        </p>
        <Avatar className='h-24 w-25'>
          <AvatarImage className='object-cover' src='/images/dp.jpg' />
          <AvatarFallback>DP</AvatarFallback>
        </Avatar>
      </div>

      <div className='flex space-x-2'>
        <Button className='cursor-pointer'>Change picture</Button>
        <Button variant='outline' className='cursor-pointer'>
          Delete picture
        </Button>
      </div>
    </div>
  );
};

export default Dp;
