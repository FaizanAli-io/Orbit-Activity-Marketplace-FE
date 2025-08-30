'use client';
import React from 'react';

import { DayNumberSelector } from '../schedule/DayNumberSelector';
import { Minus } from 'lucide-react';
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
        <h2 className='font-medium text-2xl pb-2'>Schedule</h2>
        <div className='divide-y divide-gray-300'>
          {dates.map(({ date, time }, i) => (
            <div className='py-2' key={i}>
              <div className='flex space-x-5'>
                {!isMobile ? (
                  <p>{formatDate(new Date(date))}</p>
                ) : (
                  <p>{format(date, 'MMM dd, yyyy')}</p>
                )}
                <p>
                  from {time?.start} - to {time?.end}
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
        {!isMobile ? (
          <div>
            <div className='flex  space-x-5'>
              <p> {formatDate(new Date(range.date.start))}</p>
              <Minus />
              <p> {formatDate(new Date(range.date.end))}</p>
            </div>
            <p>
              from {range.time?.start} - to {range.time?.end}
            </p>
          </div>
        ) : (
          <div>
            <div className='flex space-x-5'>
              <p> {format(new Date(range.date.start), 'MMM dd, yyyy')}</p>
              <Minus />
              <p> {format(new Date(range.date.end), 'MMM dd, yyyy')}</p>
            </div>
            <p>
              from {range.time?.start} - to {range.time?.end}
            </p>
          </div>
        )}
      </div>
    );

  if (weekly)
    return (
      <div>
        <h2 className='font-medium text-2xl'>Scheduled every week</h2>

        <div className='my-2'>
          <div className='flex space-x-5'>
            <p> {format(weekly.date.start, 'MMM dd, yyyy')}</p>
            <Minus />
            <p> {format(weekly.date.end, 'MMM dd, yyyy')}</p>
          </div>
          <p>
            from {weekly.time?.start} - to {weekly.time?.end}
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

        <div className='flex space-x-5'>
          <p> {format(monthly.date.start, 'MMM dd, yyyy')}</p>
          <Minus />
          <p> {format(monthly.date.end, 'MMM dd, yyyy')}</p>
        </div>
        <div className='flex space-x-5 mb-2'>
          <p>From {monthly.time?.start}</p>
          <Minus />
          <p>to {monthly.time?.end}</p>
        </div>
        <div className='max-w-sm'>
          <DayNumberSelector readonly mode='month' selected={monthly.days} />
        </div>
      </div>
    );

  return null;
};

export default ScheduleCard;

function formatDate(date: Date) {
  console.log(typeof date);

  return date.toLocaleDateString('en-US', {
    // "Monday, July 24, 2023"
    weekday: 'long', // "Monday"
    year: 'numeric', // "2023"
    month: 'long', // "July"
    day: 'numeric', // "24"
  });
}
