import UserAvatar from '@/app/(regular)/layout/Navbar/UserAvatar';
import { Skeleton } from '@/components/ui/skeleton';
import React, { Suspense } from 'react';
import Username from './Username';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';

const HeaderCard = () => {
  return (
    <div className='p-5 bg-secondary rounded-lg shadow-theme'>
      <div className='flex items-center space-x-2'>
        <UserAvatar />{' '}
        <p className='text-lg font-medium'>
          <Suspense
            fallback={
              <Skeleton className='w-25 h-10 rounded-md bg-primary-100' />
            }
          >
            <Username />
          </Suspense>
        </p>
      </div>
      <ul className='space-y-1 text-primary-600 text-[0.9rem] font-medium mt-2'>
        <li>
          <Link href='#' className='flex items-center'>
            Registered Events <ArrowRight className='size-4 ml-2' />
          </Link>
        </li>
        <li>
          <Link href='#' className='flex items-center'>
            Edit Preferences <ArrowRight className='size-4 ml-2' />
          </Link>
        </li>

        <li>
          <Link href='#' className='flex items-center'>
            Invite Friend <ArrowRight className='size-4 ml-2' />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default HeaderCard;
