import Image from 'next/image';
import React, { HTMLAttributes } from 'react';
import Ratings from './Ratings';
import { cn } from '@/lib/utils';

const ReviewCard = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} className={cn('bg-white border rounded-lg p-5', className)}>
      <div className='flex items-center space-x-2'>
        <Image
          width='300'
          height='300'
          objectFit='cover'
          src='/images/dp.jpg'
          alt='Man in suit wearing glasses.'
          className='rounded-full object-cover w-15 h-15'
        />

        <div className='text-muted-foreground'>
          <p className='font-bold text-lg text-black'>John Smith</p>
          <p>78 activities</p>
          <p>11 reviews</p>
        </div>
      </div>
      <Ratings ratings={5} className='my-2' iconSize={20} />

      <p className='text-muted-foreground'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis
        dignissimos officiis tempora esse repudiandae nesciunt nam laboriosam
        facilis a obcaecati laudantium omnis non, nemo fugiat commodi est
        quisquam vitae temporibus sed vero, debitis expedita at necessitatibus?
        Iure ea officiis, molestiae laborum natus numquam libero tempore ipsum
        voluptatibus debitis obcaecati suscipit!
      </p>
    </div>
  );
};

export default ReviewCard;
