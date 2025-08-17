'use client';
import React from 'react';

import { SidebarMenuButton } from '@/components/ui/sidebar';
import { LogOut } from 'lucide-react';

const LogoutButton = () => {
  return (
    <SidebarMenuButton className='cursor-pointer'>
      Logout <LogOut />
    </SidebarMenuButton>
  );
};

export default LogoutButton;
