import React, { Suspense } from 'react';
import Image from 'next/image';
import H4 from '@/components/ui/typography/H4';
import SearchInput from '@/components/app/SearchInput';
import HeaderCard from './HeaderCard';
import Username from './Username';
import { Skeleton } from '@/components/ui/skeleton';

const Header = async () => {
  return (
    <div>
      <div className='space-y-5'>
        <div className='bg-secondary rounded-lg shadow-theme p-5  flex justify-between items-center'>
          <div>
            <H4 className='text-3xl font-semibold md:font-medium mb-2'>
              Welcome back{' '}
              <Suspense
                fallback={
                  <Skeleton className='w-25 h-10 rounded-md bg-primary-100' />
                }
              >
                <Username />
              </Suspense>
              !
            </H4>
            <p>Today seems like a good day to attend an event.</p>
          </div>
          <Image
            className='hidden md:block'
            src='/illustrations/event.svg'
            width='150'
            height='150'
            alt='Event illustration.'
          />
        </div>
        <SearchInput />
      </div>
      {/* <HeaderCard /> */}
    </div>
  );
};

export default Header;
