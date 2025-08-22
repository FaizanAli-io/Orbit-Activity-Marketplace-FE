import React, { Suspense } from 'react';
import Image from 'next/image';
import { Bell } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import UserAvatar from '@/app/(regular)/layout/Navbar/UserAvatar';
import NavList from './NavList';

const Navbar = () => {
  return (
    <nav className='flex px-2 py-2 md:py-1 md:px-8 justify-between items-center w-full'>
      <Link href='/' className='hidden md:block'>
        <Image
          src='/images/logo.png'
          width={'70'}
          height={'70'}
          alt='Orbit Logo.'
          className='-translate-x-4.5 translate-y-2'
        />
      </Link>

      <NavList />

      <div className='hidden md:flex space-x-4 items-center '>
        <Bell size={22} />
        <Suspense fallback={<Skeleton className='size-10 rounded-full' />}>
          <UserAvatar />
        </Suspense>
      </div>
    </nav>
  );
};

export default Navbar;
