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
      className={cn(' p-2 rounded-md tracking-wider font-semibold', className)}
      prefetch={false}
      {...props}
    >
      {children}
    </Link>
  );
};

export default NavLink;
