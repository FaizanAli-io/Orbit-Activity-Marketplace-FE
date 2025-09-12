import UserAvatar from '@/app/(regular)/layout/Navbar/UserAvatar';
import { Skeleton } from '@/components/ui/skeleton';
import React, { Suspense } from 'react';
import Username from './Username';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const HeaderCard = () => {
  return (
    <div className='p-5 bg-secondary rounded-lg shadow-theme'>
      <div className='flex items-center space-x-2'>
        <UserAvatar dropdown={false} />{' '}
        <Suspense
          fallback={<Skeleton className='w-15 h-7 rounded-md bg-primary-100' />}
        >
          <p className='text-lg font-medium truncate'>
            <Username />
          </p>
        </Suspense>
      </div>
      <ul className='space-y-1 text-primary-600 text-[0.9rem] font-medium mt-2'>
        <li>
          <Link href='/profile/events' className='flex items-center'>
            Registered Events <ArrowRight className='size-4 ml-2' />
          </Link>
        </li>
        <li>
          <Link href='/profile' className='flex items-center'>
            Edit Preferences <ArrowRight className='size-4 ml-2' />
          </Link>
        </li>

        <li>
          <Link href='/profile/friends' className='flex items-center'>
            Discover Friends
            <ArrowRight className='size-4 ml-2' />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default HeaderCard;
