'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  link: string;
  icon: LucideIcon;
  text: string;
}

const NavItem = ({ link, icon: Icon, text }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <li
      className={cn('rounded-md p-2 md:px-4', {
        'bg-secondary text-primary-600': isActive,
      })}
    >
      <Link href={link} prefetch={true} className='block'>
        <span className='flex items-center gap-x-1 font-medium text-md md:text-[1rem]'>
          <Icon
            className={cn('size-3 md:size-5 text-black', {
              'text-primary-600': isActive,
            })}
            strokeWidth={2.5}
          />
          {text}
        </span>
      </Link>
    </li>
  );
};

export default NavItem;
