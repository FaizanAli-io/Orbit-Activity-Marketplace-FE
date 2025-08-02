import React from 'react';

import { DayNumberSelector } from '../schedule/DayNumberSelector';
import { Minus } from 'lucide-react';
import { ScheduleSchema } from '../schema';
import z from 'zod';

type Schedule = z.infer<typeof ScheduleSchema>;

interface Props {
  dates?: Schedule['dates'];
  range?: Schedule['range'];
  weekly?: Schedule['weekly'];
  monthly?: Schedule['monthly'];
}

const ScheduleCard = ({ dates, range, weekly, monthly }: Props) => {
  if (dates && dates.length)
    return (
      <div className='divide-y divide-gray-300'>
        <h2 className='font-semibold text-2xl pb-5'>Schedule</h2>
        {dates.map(({ date, time }, i) => (
          <div
            className='p-5 flex justify-between items-center text-muted-foreground'
            key={i}
          >
            <div>
              <p>{formatDate(new Date(date))}</p>
              <p>
                {time?.start} - {time?.end}
              </p>
            </div>

            <p className='text-emerald-600 font-semibold'>Available</p>
          </div>
        ))}
      </div>
    );

  if (range)
    return (
      <div>
        <h2 className='font-semibold text-2xl'>Schedule</h2>
        <div className='flex justify-between items-center text-muted-foreground'>
          <div className='flex space-x-5'>
            <p> {formatDate(new Date(range.date.start))}</p>
            <Minus />
            <p> {formatDate(new Date(range.date.end))}</p>
          </div>
          <p>
            {range.time?.start} - {range.time?.end}
          </p>
        </div>
      </div>
    );

  if (weekly)
    return (
      <div>
        <h2 className='font-semibold text-2xl'>Scheduled every week</h2>

        <div className='flex justify-between items-center text-muted-foreground my-2'>
          <div className='flex space-x-5'>
            <p> {formatDate(new Date(weekly.date.start))}</p>
            <Minus />
            <p> {formatDate(new Date(weekly.date.end))}</p>
          </div>
          <p>
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
        <h2 className='font-semibold text-2xl'>Scheduled every month</h2>
        <div className='flex justify-between items-center text-muted-foreground my-2'>
          <div className='flex space-x-5'>
            <p> {formatDate(new Date(monthly.date.start))}</p>
            <Minus />
            <p> {formatDate(new Date(monthly.date.end))}</p>
          </div>
          <p>
            {monthly.time?.start} - {monthly.time?.end}
          </p>
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
