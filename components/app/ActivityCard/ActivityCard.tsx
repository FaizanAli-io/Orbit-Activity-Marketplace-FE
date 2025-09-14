import { Activity } from '@/lib/data/activities/types';
import { Button } from '../../ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import H4 from '@/components/ui/typography/H4';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { format } from 'date-fns';
import LikeButton from './LikeButton';
import SubButton from './SubButton';
import { Calendar, MapPin } from 'lucide-react';

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
  vendorId,
  price,
  liked,
  subscribed,
}: Props) => {
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
      className={cn('p-0 overflow-hidden md:gap-0 h-full', {
        'md:grid md:grid-cols-3': variant === 'list',
        'grid grid-rows-[auto_1fr_auto] h-full': variant === 'grid',
      })}
    >
      <Image
        src={images?.thumbnail || `https://picsum.photos/300`}
        alt={title}
        width={300}
        height={200}
        className={cn('object-cover aspect-video w-full rounded-t-md', {
          'md:order-1 md:h-full': variant === 'list',
          'w-full': variant === 'grid',
        })}
      />

      <div
        className={cn('flex flex-col', {
          'md:col-span-2 md:py-5 pb-5': variant === 'list' && images?.thumbnail,
          'md:col-span-2 md:py-5 py-5':
            variant === 'list' && !images?.thumbnail,
          'flex-1 flex flex-col py-5': variant === 'grid',
        })}
      >
        <CardHeader className='flex justify-between items-baseline mb-5'>
          <div>
            <H4 className='font-semibold md:font-medium md:text-3xl'>
              <Link href={viewLink}> {title}</Link>
            </H4>
            <div className='flex items-center space-x-2'>
              <div className='space-x-2 italic text-sm flex items-center'>
                <Calendar size='18' className='mr-1' />{' '}
                {format(getStartDate(), 'MMM dd, yyyy')}
              </div>

              <div className='space-x-2 italic text-sm flex items-center'>
                <MapPin size='18' /> {location}
              </div>
            </div>
          </div>
          <LikeButton liked={!!liked} activityId={id} />
        </CardHeader>

        <CardContent
          className={cn({
            'flex-1': variant === 'grid',
          })}
        >
          <p>{description.slice(0, 200)}...</p>
        </CardContent>

        <CardFooter
          className={cn('flex space-x-2 mt-5', {
            'mt-5': variant === 'grid',
          })}
        >
          <Link href={viewLink} className='block flex-1'>
            <Button className='w-full' variant={'secondary'}>
              View
            </Button>
          </Link>

          <SubButton
            activityId={id}
            subscribed={subscribed}
            activity={{
              id,
              name: title,
              price,
              vendorId,
              location,
            }}
          />
        </CardFooter>
      </div>
    </Card>
  );
};

export default ActivityCard;
