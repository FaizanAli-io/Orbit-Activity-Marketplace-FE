'use client';
import React, { ReactNode } from 'react';

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/lib/data/profile/users/get-users';
interface Props extends User {
  btn?: ReactNode;
}

const FriendCard = ({ name, avatar, email, btn }: Props) => {
  const initials = name?.match(/\b\w/g)?.join('').toUpperCase();

  return (
    <div className='p-3 border flex justify-between items-center rounded-lg'>
      <div className='flex items-center space-x-2'>
        <Avatar className='size-11 object-cover'>
          <AvatarImage
            src={avatar}
            width={'100'}
            height={'100'}
            className='object-cover aspect-square'
            alt={'Profile Picture'}
          />
          <AvatarFallback className='aspect-square'>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className='font-medium hover:underline cursor-pointer'>
            <Link href='#'>{name}</Link>
          </h2>
          <div className='flex flex-col md:flex-row space-x-2 text-sm'>
            <p className='text-muted-foreground'>{email}</p>
          </div>
        </div>
      </div>

      {btn && btn}
    </div>
  );
};

export default FriendCard;
