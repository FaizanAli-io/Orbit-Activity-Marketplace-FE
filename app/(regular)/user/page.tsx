import Block from '@/app/layout/Block';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React from 'react';
import Stats from './Stats';
import UserTabs from './UserTabs';

const Page = () => {
  return (
    <Block>
      <Avatar className='h-42 w-42 translate-y-2'>
        <AvatarImage src='/images/dp.jpg' alt='User' className='object-cover' />
        <AvatarFallback>User</AvatarFallback>
      </Avatar>

      <div className='flex flex-col md:flex-row space-y-5 md:space-x-20 items-end my-10 md:my-0 '>
        <div className='mt-5'>
          <h1 className='text-3xl font-bold'>Irene Brooks</h1>
          <p className='font-semibold mb-2 mt-1 text-lg'>
            irene.brooks@orbit.com
          </p>
          <p className='text-muted-foreground max-w-full md:max-w-1/2'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam
            sapiente pariatur velit cum sed ipsum perspiciatis quod autem sunt?
            Sunt.
          </p>

          <Button size='lg' className='mt-5 w-38'>
            Add Friend
            <Plus />
          </Button>
        </div>
        <Stats />
      </div>

      <div className='my-10'>
        <UserTabs />
      </div>
    </Block>
  );
};

export default Page;
