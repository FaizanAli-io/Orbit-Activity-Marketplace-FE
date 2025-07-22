import React from 'react';

import { data } from './data';
import { Equal } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import NavLink from './NavLink';

const NavbarSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Equal
          size='35'
          className='text-gray-500 dark:text-gray-400 md:hidden'
        />
      </SheetTrigger>
      <SheetContent side='left' className='md:hidden'>
        <div className='flex flex-col px-5 py-10'>
          <p className='text-muted-foreground font-semibold  mx-3 mt-5 -mb-2'>
            Menu
          </p>
          {data.map((item, i) => (
            <NavLink key={i} href={item.href} className='text-3xl text-black'>
              {item.text}
            </NavLink>
          ))}

          <p className='text-muted-foreground font-semibold mx-3 mt-5 -mb-2'>
            Auth
          </p>
          <NavLink href='/login' className='text-3xl text-black'>
            Sign in
          </NavLink>
          <NavLink href='/signup' className='text-3xl text-black'>
            Sign up
          </NavLink>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarSheet;
