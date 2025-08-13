import { NavigationMenuItem } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLAnchorElement> {
  href?: string;
}

const NavLink = ({ href = '#', className, children, ...props }: Props) => {
  return (
    <NavigationMenuItem className={cn('list-none', className)}>
      <Link
        href={href}
        className={cn('p-2 font-medium')}
        prefetch={false}
        {...props}
      >
        {children}
      </Link>
    </NavigationMenuItem>
  );
};

export default NavLink;
