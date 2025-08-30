'use client';

import React from 'react';
import NavItem from './NavItem';
import { LayoutDashboard, TentTree, CalendarDays, Users } from 'lucide-react';

const NavListVendor = () => {
  return (
    <ul className='flex justify-center w-full md md:space-x-5 '>
      <NavItem
        link='/profile/vendor/dashboard'
        text='Dashboard'
        icon={LayoutDashboard}
      />
      <NavItem link='/profile/vendor/events' text='Events' icon={TentTree} />
      {/* <NavItem link='/profile/calendar' text='Calendar' icon={CalendarDays} />
      <NavItem link='/profile/friends' text='Friends' icon={Users} /> */}
    </ul>
  );
};

export default NavListVendor;
