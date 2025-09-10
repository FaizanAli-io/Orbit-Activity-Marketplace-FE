'use client';

import { DayNumberSelector } from '../schedule/DayNumberSelector';
import { Calendar, Clock, Minus } from 'lucide-react';
import { ScheduleSchema } from '../schema';
import z from 'zod';
import { format } from 'date-fns';
import { useIsMobile } from '@/hooks/use-mobile';

type Schedule = z.infer<typeof ScheduleSchema>;

interface Props {
  dates?: Schedule['dates'];
  range?: Schedule['range'];
  weekly?: Schedule['weekly'];
  monthly?: Schedule['monthly'];
}

const ScheduleCard = ({ dates, range, weekly, monthly }: Props) => {
  const isMobile = useIsMobile();

  if (dates && dates.length)
    return (
      <div>
        <h2 className='font-medium text-2xl pb-2'>Schedule </h2>
        <div className='divide-y divide-gray-300'>
          {dates.map(({ date, time }, i) => (
            <div className='py-2' key={i}>
              <div className='flex items-center  space-x-5'>
                <p>
                  <Calendar className='mr-1' size='20' />{' '}
                  {format(date, 'MMM dd, yyyy')}
                </p>
                <p className='flex items-center'>
                  <Clock className='mr-1' size='20' />
                  {time?.start} - {time?.end}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  if (range)
    return (
      <div>
        <h2 className='font-medium text-2xl'>Schedule</h2>
        <div>
          <p className='flex items-center'>
            <Calendar className='mr-1' size='20' />{' '}
            {format(range.date.start, 'MMM dd, yyyy')}
            <Minus />
            {format(range.date.end, 'MMM dd, yyyy')}
          </p>
          <p className='flex items-center'>
            <Clock className='mr-1' size='20' />
            {range.time?.start} - {range.time?.end}
          </p>
        </div>
      </div>
    );

  if (weekly)
    return (
      <div>
        <h2 className='font-medium text-2xl'>Scheduled every week</h2>

        <div className='my-2'>
          <div className='flex space-x-5'>
            <p className='flex items-center'>
              <Calendar className='mr-1' size='20' />{' '}
              {format(weekly.date.start, 'MMM dd, yyyy')}
              <Minus />
              {format(weekly.date.end, 'MMM dd, yyyy')}
            </p>
          </div>
          <p className='flex items-center'>
            <Clock className='mr-1' size='20' />
            {weekly.time?.start} - {weekly.time?.end}
          </p>
        </div>

        <div className='max-w-sm'>
          <DayNumberSelector readonly mode='week' selected={weekly.days} />
        </div>
      </div>
    );

  if (monthly)
    return (
      <div>
        <h2 className='font-medium text-2xl'>Scheduled every month</h2>

        <p className='flex items-center'>
          <Calendar className='mr-1' size='20' />{' '}
          {format(monthly.date.start, 'MMM dd, yyyy')}
          <Minus />
          {format(monthly.date.end, 'MMM dd, yyyy')}
        </p>
        <p className='flex items-center'>
          <Clock className='mr-1' size='20' />
          {monthly.time?.start} - {monthly.time?.end}
        </p>
        <div className='max-w-sm'>
          <DayNumberSelector readonly mode='month' selected={monthly.days} />
        </div>
      </div>
    );

  return null;
};

export default ScheduleCard;

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    // "Monday, July 24, 2023"
    weekday: 'long', // "Monday"
    year: 'numeric', // "2023"
    month: 'long', // "July"
    day: 'numeric', // "24"
  });
}
