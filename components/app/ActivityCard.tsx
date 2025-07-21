import {
  Clock3Icon,
  HeartIcon,
  MapPin,
  StarIcon,
  Users2Icon,
} from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import Link from 'next/link';

interface Props {
  image: string;
  category: string;
  title: string;
  text: string;
  vendor: string;
  price: number;
}

const ActivityCard = ({
  category,
  image,
  title,
  text,
  price,
  vendor,
}: Props) => {
  return (
    <article className='grid grid-rows-[auto_1fr] rounded-md border shadow-xs  max-w-lg'>
      <figure className='relative overflow-hidden'>
        <div className='absolute flex justify-between w-full p-2'>
          <Badge>{category}</Badge>
          {/* <span className='bg-white/70 backdrop-blur-lg rounded-full p-1'> */}
          <HeartIcon
            size='25'
            className='cursor-pointer '
            stroke='white'
            strokeWidth={2}
            fill='black'
          />
          {/* </span> */}
        </div>
        <Link href='/activity/5'>
          <Image
            width={500}
            height={200}
            src={image}
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
            <p className='flex text-muted-foreground items-center space-x-1'>
              <StarIcon size='17' fill='#eab308' stroke='#eab308' />
              <span>4/5</span>
            </p>
          </div>
          <p className='flex text-muted-foreground items-center space-x-1'>
            <span>by</span> <span className='font-semibold'>{vendor}</span>
          </p>
        </div>

        {/* Description */}
        <p className='text-muted-foreground'>{text}</p>

        {/* Info Icons */}
        <div className='flex items-center space-x-8 text-muted-foreground'>
          <p className='flex items-center space-x-1'>
            <MapPin size='20' /> <span>Downtown</span>
          </p>
          <p className='flex items-center space-x-1'>
            <Clock3Icon size='17' /> <span>2 Hours</span>
          </p>
          <p className='flex items-center space-x-1'>
            <Users2Icon size='17' /> <span>8/15</span>
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
            <Link href='/activity/5'>Details</Link>
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ActivityCard;
