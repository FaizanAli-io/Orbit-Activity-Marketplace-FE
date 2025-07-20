import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLAnchorElement> {
  href?: string;
}

const NavLink = ({ href = '#', className, children, ...props }: Props) => {
  return (
    <Link
      href={href}
      className={cn(
        'text-gray-500 hover:bg-gray-100 p-2 rounded-md  dark:text-gray-400 dark:hover:text-gray-50',
        className
      )}
      prefetch={false}
      {...props}
    >
      {children}
    </Link>
  );
};

export default NavLink;
