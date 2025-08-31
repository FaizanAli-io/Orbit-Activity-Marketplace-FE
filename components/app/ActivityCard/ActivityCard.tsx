import { Activity } from '@/lib/data/activities/types';
import { Button } from '../../ui/button';
import { cn } from '@/lib/utils';
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
import LikeButton from './LikeButton';
import { getLikedActivities } from '@/lib/data/activities/get-liked-activities';
import SubButton from './SubButton';
import { getUserSubs } from '@/lib/data/activities/get-user-subs';

interface Props extends Activity {
  variant?: 'list' | 'grid';
  viewLink?: string;
}

const ActivityCard = async ({
  id,
  images,
  name: title,
  location,
  description,
  availability,
  variant = 'list',
  viewLink = '#',
}: Props) => {
  const { success, data } = await getLikedActivities();
  const { data: subData } = await getUserSubs();

  const subscribed = !!subData?.data?.find(e => e.id === id);

  const likedActivities = data?.data;

  const liked =
    success && likedActivities && likedActivities.find(a => a.id === id);

  const getStartDate = () => {
    const { dates, range, weekly, monthly } = availability;

    if (monthly) return monthly.date.start;
    if (weekly) return weekly.date.start;
    if (range) return range.date.start;

    if (dates && dates.length) return dates[0].date;

    return new Date().toISOString();
  };

  return (
    <Card
      className={cn('p-0 overflow-hidden md:gap-0', {
        'md:grid md:grid-cols-3': variant === 'list',
      })}
    >
      <Image
        src={images?.thumbnail || `https://picsum.photos/300`}
        alt={title}
        width={300}
        height={200}
        className={cn('object-cover aspect-video w-full h-full rounded-t-md ', {
          'md:order-1': variant === 'list',
        })}
      />

      <div
        className={cn('md:col-span-2  md:py-5 ', {
          'pb-5': images?.thumbnail,
          'py-5': !images?.thumbnail,
        })}
      >
        <CardHeader className='flex justify-between items-baseline mb-5'>
          <div>
            <H4 className='font-semibold md:font-medium md:text-3xl'>
              <Link href={viewLink}> {title}</Link>
            </H4>
            <div className='space-x-1 italic text-sm'>
              <span>Date: {format(getStartDate(), 'MMM dd, yyyy')}</span>
              <span>•</span>
              <span>Location: {location}</span>
            </div>
          </div>
          <LikeButton liked={!!liked} activityId={id} />
        </CardHeader>

        <CardContent>
          <p>{description.slice(0, 200)}...</p>
        </CardContent>

        <CardFooter className='flex space-x-2 mt-5'>
          <Button className='flex-1' variant={'secondary'}>
            <Link href={viewLink}>View</Link>
          </Button>

          <SubButton activityId={id} subscribed={subscribed} />
        </CardFooter>
      </div>
    </Card>
  );
};

export default ActivityCard;
