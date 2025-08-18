import { Clock3Icon, Heart, MapPin, Users2Icon } from 'lucide-react';

import { Activity } from '@/lib/data/activities/types';
import { Button } from '../../ui/button';
import { cn, getFirstWords } from '@/lib/utils';
import ActivityBadge from './ActivityBadge';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import H4 from '@/components/ui/typography/H4';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { format } from 'date-fns';

interface Props extends Activity {
  variant?: 'list' | 'grid';
}

const ActivityCard = ({
  images,
  name: title,
  location,
  description,
  timestamp,
  variant = 'list',
}: Props) => {
  return (
    <Card
      className={cn('p-0 overflow-hidden', {
        'md:grid md:grid-cols-3': variant === 'list',
      })}
    >
      {images?.thumbnail && (
        <Image
          src={images.thumbnail}
          alt={title}
          width={300}
          height={200}
          className={cn(
            'object-cover aspect-video w-full h-full rounded-t-md ',
            {
              'md:order-1': variant === 'list',
            }
          )}
        />
      )}
      <div
        className={cn('md:col-span-2  md:py-5 ', {
          'pb-5': images?.thumbnail,
          'py-5': !images?.thumbnail,
        })}
      >
        <CardHeader className='flex justify-between items-baseline mb-5'>
          <div>
            <H4 className='font-semibold md:font-medium md:text-3xl'>
              {title}
            </H4>
            <div className='space-x-1 italic text-sm'>
              <span>Date: {format(timestamp, 'MMM dd, yyyy')}</span>
              <span>•</span>
              <span>Location: {location}</span>
            </div>
          </div>
          <Heart className=' md:size-5 translate-y-1 md:translate-0' />
        </CardHeader>

        <CardContent>
          <p>{description.slice(0, 200)}...</p>
        </CardContent>

        <CardFooter className='flex space-x-2 mt-5'>
          <Button className='flex-1' variant={'secondary'}>
            <Link href='#'>View</Link>
          </Button>

          <Button className='flex-1'>
            <Link href='#'>Register</Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ActivityCard;
