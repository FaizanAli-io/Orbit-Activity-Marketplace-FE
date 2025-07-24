import React from 'react';

import { Activity, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  buttonText: React.ReactNode;
  secondaryBtnText?: React.ReactNode;
  onButtonClick?: () => void;
  onSecondaryClick?: () => void;
}

const FriendCard = ({ buttonText, secondaryBtnText }: Props) => {
  return (
    <div className='p-3 border rounded-md shadow-xs'>
      <Image
        src='/images/dp.jpg'
        alt='Profile picture'
        width='500'
        height='500'
        className='w-full object-cover rounded-md'
        objectFit='cover'
      />
      <h2 className='font-bold text-2xl mt-5 hover:underline cursor-pointer'>
        <Link href='#'>Irene Brooks</Link>
      </h2>

      <p className='text-muted-foreground'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
        accusantium.
      </p>
      <div className='flex justify-between mt-3'>
        <div className='flex space-x-5'>
          <div className='flex text-lg items-center space-x-1 font-semibold'>
            <Activity size='20' strokeWidth={2} color='#555' /> <span>20</span>
          </div>
          <div className='flex text-lg items-center space-x-1 font-semibold'>
            <UserRound size='20' strokeWidth={2} color='#555' />{' '}
            <span>254</span>
          </div>
        </div>
        <div className='flex space-x-2'>
          <Button className='cursor-pointer'>{buttonText}</Button>
          {secondaryBtnText && (
            <Button variant='outline' className='cursor-pointer'>
              {secondaryBtnText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
