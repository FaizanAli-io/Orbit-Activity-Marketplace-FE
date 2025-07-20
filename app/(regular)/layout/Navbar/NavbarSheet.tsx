import { Button } from '@/components/ui/button';
import { data } from './data';
import { MenuIcon } from './MenuIcon';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Link from 'next/link';
import NavLink from './NavLink';
import React from 'react';

const NavbarSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='rounded-full md:hidden'>
          <MenuIcon className='h-5 w-5 text-gray-500 dark:text-gray-400' />
          <span className='sr-only'>Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='md:hidden'>
        <div className='flex flex-col p-4'>
          {data.map((item, i) => (
            <NavLink key={i} href={item.href}>
              {item.text}
            </NavLink>
          ))}
          <Button variant='outline'>
            <Link href='/login'>Sign in</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarSheet;
