import {
  Clock3Icon,
  HeartIcon,
  MapPin,
  StarIcon,
  Users2Icon,
} from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import Link from 'next/link';
import { Activity } from '@/lib/data/activities/types';
import { getFirstWords } from '@/lib/utils';
import ActivityBadge from './ActivityBadge';

const ActivityCard = ({
  id,
  images: { thumbnail },
  name: title,
  categoryId,
  price,
  duration,
  location,
  capacity,
  description,
}: Activity) => {
  return (
    <article className='grid grid-rows-[auto_1fr] rounded-lg border shadow-xs  max-w-lg hover:-translate-y-2 hover:shadow-md transition-transform duration-200 bg-white'>
      <figure className='relative overflow-hidden'>
        <div className='absolute flex justify-between w-full p-2'>
          <ActivityBadge categoryId={categoryId} />
          <span className='bg-white backdrop-blur-lg rounded-full p-1.5'>
            <HeartIcon
              size='22'
              className='cursor-pointer '
              stroke='black'
              strokeWidth={1.5}
              // fill='black'
            />
          </span>
        </div>
        <Link href={`/activity/${id}`}>
          <Image
            width={500}
            height={200}
            src={thumbnail}
            alt={title}
            className='object-cover aspect-video w-full rounded-t-md'
          />
        </Link>
      </figure>

      {/* Subgrid starts here */}
      <div className='grid grid-rows-[auto_auto_auto_1fr_auto] p-4 gap-3'>
        {/* Title and rating */}
        <div>
          <div className='flex justify-between items-center'>
            <h2 className='text-xl font-medium'>
              <Link href='/activity/5'>{title}</Link>
            </h2>
          </div>
        </div>

        {/* Description */}
        <p className='text-muted-foreground'>
          {getFirstWords(description, 15)}...
        </p>

        {/* Info Icons */}
        <div className='flex items-center space-x-8 text-muted-foreground'>
          <p className='flex items-center space-x-1'>
            <MapPin size='20' /> <span>{location}</span>
          </p>
          <p className='flex items-center space-x-1'>
            <Clock3Icon size='17' /> <span>{duration} Hours</span>
          </p>
          <p className='flex items-center space-x-1'>
            <Users2Icon size='17' /> <span>0/{capacity}</span>
          </p>
        </div>

        {/* Spacer for flex-grow */}
        <div />

        {/* Price + Button */}
        <div className='flex justify-between mt-2'>
          <p>
            <span className='text-2xl font-bold'>${price}</span>/person
          </p>
          <Button className='px-10 cursor-pointer'>
            <Link href={`/activity/${id}`}>Details</Link>
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ActivityCard;
