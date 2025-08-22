'use client';
import React from 'react';

import { SidebarMenuButton } from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  url: string;
  title: string;
}

const MenuLink = ({ url, title }: Props) => {
  const pathname = usePathname();

  return (
    <SidebarMenuButton isActive={url === pathname}>
      <Link href={url}>{title}</Link>
    </SidebarMenuButton>
  );
};

export default MenuLink;
