import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getProfile } from '@/lib/data/profile/get-profile';
import { AvatarImage } from '@radix-ui/react-avatar';
import Link from 'next/link';
import React from 'react';
import LogoutButton from './LogoutButton';

const UserAvatar = async () => {
  const profile = await getProfile();

  if (profile.error || !profile.data) return null;

  const {
    user: { avatar, name },
    email,
  } = profile.data;

  const getFallback = () => {
    if (name)
      return name
        .split(' ')
        .map(word => word[0])
        .join()
        .toUpperCase();

    return email[0].toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='cursor-pointer'>
        <Avatar className='size-9'>
          <AvatarImage
            src={avatar}
            className='object-cover'
            alt={getFallback()}
          />
          <AvatarFallback>{getFallback()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href='/me/profile'>My Account</Link>
        </DropdownMenuItem>
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
