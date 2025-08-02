import Image from 'next/image';
import React from 'react';

import Block from '@/app/layout/Block';
import PriceCard from '../PriceCard';
import HostCard from '../HostCard';
import Overview from '../Overview';
import AboutIntinery from '../AboutIntinery';
import WhatsIncluded from '../WhatsIncluded';
import Schedule from '../Schedule';
import FeatureReview from '../FeatureReview';
import { getActivity } from '@/lib/data/activities/get-activities';
import { formatCurrency } from '@/lib/utils';
import { Clock3Icon, MapPin, Users2Icon } from 'lucide-react';
import ActivityBadge from '@/components/app/ActivityCard/ActivityBadge';
import { MasonryGallery, MediaItem } from '@/components/app/MasonaryGallery';
import ScheduleCard from '../../activity-form/review/ScheduleCard';

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
            404 NOT FOUND
          </h2>
        </div>
      </Block>
    );

  const {
    name: title,
    price,
    description,
    location,
    duration,
    capacity,
    categoryId,
    availability: { dates, range, weekly, monthly },
    images,
  } = activity.data;

  const galleryItems: MediaItem[] = images.images.map((img, key) => ({
    id: String(key),
    type: 'image' as const,
    src: img,
    alt: 'Activity picture',
    width: 100,
    height: 100,
  }));

  if (images.video) {
    galleryItems.push({
      id: 'video',
      type: 'video',
      src: images.video,
      alt: 'Activity video',
      width: 100,
      height: 100,
    });
  }

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
    <Block className='my-10 md:grid md:grid-cols-4 gap-x-5'>
      <div className='order-1'>
        <PriceCard price={price} />
      </div>
      <div className='col-span-3'>
        <h1 className='font-bold text-4xl'>{title}</h1>

        <div className='flex items-center space-x-7 text-muted-foreground mb-3'>
          <ActivityBadge categoryId={categoryId} />
          <p className='flex items-center space-x-1'>
            <MapPin size='20' /> <span>{location}</span>
          </p>
          <p className='flex items-center space-x-1'>
            <Clock3Icon size='17' /> <span>{duration} Hrs</span>
          </p>
          <p className='flex items-center space-x-1'>
            <Users2Icon size='17' /> <span>0/{capacity}</span>
          </p>
        </div>

        <MasonryGallery items={galleryItems} showMoreCount={3} />
        <p className='text-muted-foreground'>{description}</p>
        <div className='my-10'>
          <ScheduleCard
            dates={dates?.map(date => ({ ...date, date: new Date(date.date) }))}
            range={cardRange}
            weekly={cardWeekly}
            monthly={cardMonthly}
          />
        </div>
      </div>
    </Block>
    //  <div>
    //       <Image
    //         width='1500'
    //         height='1500'
    //         objectFit='cover'
    //         alt='Cover image'
    //         src='/images/hiking.jpg'
    //         className='w-full max-h-[50vh] object-cover'
    //       />

    //       <Block space={false} className='my-10 md:grid md:grid-cols-3 gap-x-5'>
    //         <div className='order-1'>
    //           <PriceCard />
    //           <HostCard />
    //         </div>

    //         <div className='col-span-2'>
    //           <Overview />
    //           <AboutIntinery />
    //           <WhatsIncluded />
    //           <Schedule />
    //           <FeatureReview />
    //         </div>
    //       </Block>
    //     </div>
  );
};

export default Page;
