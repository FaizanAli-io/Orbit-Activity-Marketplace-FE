import ActivityBadge from '@/components/app/ActivityCard/ActivityBadge';
import ConfirmationDialog from '@/components/app/confirmation-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import H4 from '@/components/ui/typography/H4';
import { Activity } from '@/lib/data/activities/types';
import { formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';
import { Eye, PenBox, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import ActivityCardFooter from './ActivityCardFooter';

const ActivityCard = (props: Activity) => {
  const {
    name: title,
    categoryId,
    timestamp,
    location,
    quota,
    price,
    availability,
    id,
  } = props;
  const getStartDate = () => {
    const { dates, range, weekly, monthly } = availability;

    if (monthly) return monthly.date.start;
    if (weekly) return weekly.date.start;
    if (range) return range.date.start;

    if (dates && dates.length) return dates[0].date;

    return new Date().toISOString();
  };

  return (
    <Card className='md:max-w-xl'>
      <CardHeader>
        <CardTitle className='overflow-hidden'>
          <H4 className='font-medium md:text-3xl truncate'>
            <Link href={`/event/${id}`} className='hover:underline'>
              {title}
            </Link>
          </H4>
          <ActivityBadge categoryId={categoryId} />
        </CardTitle>
        <CardHeader />
      </CardHeader>
      <CardContent>
        <div className='md:grid md:grid-cols-4 space-y-2'>
          <p>
            Starting Date
            <span className='block font-semibold'>
              {format(getStartDate(), 'MMM dd, yyyy')}
            </span>
          </p>
          <p>
            Registrations
            <span className='block font-semibold'>{quota}</span>
          </p>
          <p>
            Revenue
            <span className='block font-semibold'>
              {formatCurrency(quota * price)}
            </span>
          </p>
          <p>
            Location
            <span className='block font-semibold'>{location}</span>
          </p>
        </div>
      </CardContent>
      <ActivityCardFooter {...props} />
    </Card>
  );
};

export default ActivityCard;
