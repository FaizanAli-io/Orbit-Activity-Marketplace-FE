'use client';
import { ReactNode } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/lib/data/profile/users/get-users';
interface Props extends User {
  btn?: ReactNode;
}

const FriendCard = ({ name, avatar, email, btn }: Props) => {
  const initials = name?.match(/\b\w/g)?.join('').toUpperCase();

  return (
    <div className='p-3 border md:flex md:justify-between items-center rounded-lg grid grid-cols-2 '>
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
        <div className='w-full'>
          <h2 className='font-medium'>{name}</h2>
          <div className='flex flex-col md:flex-row space-x-2 text-sm truncate'>
            <p className='text-muted-foreground truncate'>{email}</p>
          </div>
        </div>
      </div>

      {btn && <div className='flex justify-end'>{btn}</div>}
    </div>
  );
};

export default FriendCard;
