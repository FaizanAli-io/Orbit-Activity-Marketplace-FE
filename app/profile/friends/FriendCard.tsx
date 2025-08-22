import React from 'react';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// interface Props {
//   buttonText?: React.ReactNode;
//   secondaryBtnText?: React.ReactNode;
//   onButtonClick?: () => void;
//   onSecondaryClick?: () => void;
// }

const FriendCard = () => {
  return (
    <div className='p-3 border flex justify-between items-center rounded-lg'>
      <div className='flex items-center space-x-2'>
        <Avatar className='size-11'>
          <AvatarImage
            width={'100'}
            height={'100'}
            src={'/images/dp.jpg'}
            className='object-cover'
            alt={'Profile Picture'}
          />
          <AvatarFallback>SA</AvatarFallback>
        </Avatar>
        <div>
          <h2 className='font-semibold hover:underline cursor-pointer'>
            <Link href='#'>Irene Brooks</Link>
          </h2>
          <div className='flex flex-col md:flex-row space-x-2 text-sm'>
            <p className='text-muted-foreground'>12 mutual friends</p>
            <p className='text-muted-foreground'>24 events attended</p>
          </div>
        </div>
      </div>

      <Button variant={'outline'} size='sm' className='bg-transparent'>
        <Link href={'#'} className='text-sm'>
          View Profile
        </Link>
      </Button>
    </div>
  );
};

export default FriendCard;
