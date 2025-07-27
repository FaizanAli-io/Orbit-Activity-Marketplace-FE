'use client';
import React from 'react';

import { SidebarMenuButton } from '@/components/ui/sidebar';
import { LogOut } from 'lucide-react';
import { logout } from './action';

const LogoutButton = () => {
  return (
    <SidebarMenuButton className='cursor-pointer' onClick={() => logout()}>
      Logout <LogOut />
    </SidebarMenuButton>
  );
};

export default LogoutButton;
