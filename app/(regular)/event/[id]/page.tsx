import React from 'react';

import Block from '@/app/layout/Block';
import { getActivity } from '@/lib/data/activities/get-activities';
import ActivityBadge from '@/components/app/ActivityCard/ActivityBadge';
import ScheduleCard from '../../../profile/vendor/activities/review/ScheduleCard';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import H1 from '@/components/ui/typography/H1';
import H2 from '@/components/ui/typography/H2';
import { Button } from '@/components/ui/button';
import Tagline from '@/components/ui/typography/Tagline';
import { formatCurrency } from '@/lib/utils';
import Carousel from '@/components/app/MasonaryGallery';

interface Props {
  params: Promise<{ id: number }>;
}

const Page = async ({ params }: Props) => {
  const { id } = await params;

  const activity = await getActivity(id);

  if (!activity || !activity.success)
    return (
      <Block>
        <div className='space-y-5 h-screen flex justify-center items-center'>
          <h2 className='text-5xl -translate-y-[150%] md:text-7xl font-bold'>
            Event Not Found
          </h2>
        </div>
      </Block>
    );

  const {
    name: title,
    price,
    description,
    location,
    categoryId,
    availability: { dates, range, weekly, monthly },
    images,
    vendor,
  } = activity.data;

  const cardRange = range
    ? {
        ...range,
        date: {
          start: new Date(range.date.start),
          end: new Date(range.date.end),
        },
      }
    : undefined;

  const cardWeekly = weekly
    ? {
        ...weekly,
        date: {
          start: new Date(weekly.date.start),
          end: new Date(weekly.date.end),
        },
      }
    : undefined;

  const cardMonthly = monthly
    ? {
        ...monthly,
        date: {
          start: new Date(monthly.date.start),
          end: new Date(monthly.date.end),
        },
      }
    : undefined;

  return (
    <Block
      space={false}
      className='md:grid md:grid-cols-6 md:gap-x-5 my-5 md:my-10 space-y-5'
    >
      <div className='space-y-5 md:col-span-4'>
        <Card>
          <CardHeader>
            <ActivityBadge categoryId={categoryId} className='max-w-fit px-4' />
            <H1 className='font-semibold text-2xl md:text-4xl'>{title}</H1>
            <p className='font-semibold'>{location}</p>
          </CardHeader>
          <CardContent>
            {images?.images && (
              <Carousel
                images={[
                  ...images.images.map(url => ({
                    url,
                    type: 'image' as const,
                  })),
                  { url: images.video, type: 'video' },
                ]}
              />
            )}

            <p className='mt-10 mb-5'>{description}</p>
          </CardContent>
        </Card>
      </div>
      <div className='md:col-span-2 space-y-5'>
        <Card>
          <CardHeader>
            <H2 className='font-semibold text-3xl md:text-3xl text-center'>
              {formatCurrency(price)}
            </H2>
          </CardHeader>
          <CardContent>
            <div className='space-y-3 mb-5'>
              <Button className='w-full'>Register</Button>
            </div>

            <Tagline>About the Vendor</Tagline>
            <p>Hosted by: {vendor.name}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <ScheduleCard
              dates={dates?.map(date => ({
                ...date,
                date: new Date(date.date),
              }))}
              range={cardRange}
              weekly={cardWeekly}
              monthly={cardMonthly}
            />
          </CardContent>
        </Card>
      </div>
    </Block>
  );
};

export default Page;
