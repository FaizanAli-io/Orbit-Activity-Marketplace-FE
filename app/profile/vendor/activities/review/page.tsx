'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Clock3Icon,
  MapPin,
  MoveLeft,
  MoveRight,
  Users2Icon,
} from 'lucide-react';
import { useActivityFormStore } from '../store';
import ReviewSkeleton from './ReviewSkeleton';
import { useCategories } from '@/lib/data/categories/use-categories';
import { MasonryGallery, MediaItem } from '@/components/app/MasonaryGallery';
import { Body, postActivity } from './action';
import { toast } from 'sonner';
import ScheduleCard from './ScheduleCard';
import { formatCurrency } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import LoadingButton from '@/components/app/LoadingButton';
import { updateActivity } from '../actions/update';

const Page = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: categories } = useCategories();

  const clearForms = useActivityFormStore(s => s.clear);

  const activityType = useActivityFormStore(s => s.type);
  const title = useActivityFormStore(s => s.title);
  const description = useActivityFormStore(s => s.description);
  const categoryId = useActivityFormStore(s => s.categoryId);
  const location = useActivityFormStore(s => s.location);
  const duration = useActivityFormStore(s => s.duration);
  const capacity = useActivityFormStore(s => s.capacity);
  const quota = useActivityFormStore(s => s.quota);

  const price = useActivityFormStore(s => s.price);
  const discount = useActivityFormStore(s => s.discount);
  const dates = useActivityFormStore(s => s.dates);
  const range = useActivityFormStore(s => s.range);
  const weekly = useActivityFormStore(s => s.weekly);
  const monthly = useActivityFormStore(s => s.monthly);
  const exclusions = useActivityFormStore(s => s.exclusions);

  const images = useActivityFormStore(s => s.images);

  const setStep = useActivityFormStore(s => s.setCurrentStep);
  const isForm1Valid = useActivityFormStore(s => s.isForm1Valid);
  const isForm2Valid = useActivityFormStore(s => s.isForm2Valid);
  const isForm3Valid = useActivityFormStore(s => s.isForm3Valid);
  const isForm4Valid = useActivityFormStore(s => s.isForm4Valid);
  const isForm5Valid = useActivityFormStore(s => s.isForm5Valid);

  const activityId = useActivityFormStore(s => s.activityId);

  const [hydrated, setHydrated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const unsub = useActivityFormStore.persist.onFinishHydration(() =>
      setHydrated(true)
    );

    if (useActivityFormStore.persist.hasHydrated()) setHydrated(true);

    return unsub;
  }, []);

  useEffect(() => {
    if (!useActivityFormStore.persist.hasHydrated()) return;

    if (!isForm1Valid())
      return router.replace('/profile/vendor/activities/basic-details');
    if (!isForm2Valid())
      return router.replace('/profile/vendor/activities/pricing-and-capacity');
    if (!isForm3Valid())
      return router.replace('/profile/vendor/activities/schedule');
    if (!isForm4Valid())
      return router.replace('/profile/vendor/activities/pricing-and-capacity');
    if (!isForm5Valid())
      return router.replace('/profile/vendor/activities/media');

    setStep(6);
  }, [
    setStep,
    router,
    isForm1Valid,
    isForm2Valid,
    isForm3Valid,
    isForm4Valid,
    isForm5Valid,
  ]);

  const handlePrev = () => {
    setIsLoading(true);
    setStep(4);
    router.push('/profile/vendor/activities/media');
  };

  const handlePost = async (data: Body) => {
    const { success, error } = await postActivity(data);

    if (success) {
      toast.success('Activity posted!');
      clearForms();
      router.replace('/profile/vendor/events');
    } else toast.error(error, { richColors: true });

    setIsLoading(false);
  };

  const handleUpdate = async (data: Body, id: number) => {
    const { success, error } = await updateActivity(data, id);

    if (success) {
      toast.success('Activity updated!');
      clearForms();
      router.replace('/profile/vendor/events');
    } else toast.error(error, { richColors: true });

    setIsLoading(false);
  };

  const handleNext = async () => {
    setIsLoading(true);
    const data = {
      name: title,
      description,
      categoryId: +categoryId,

      price: +price,
      capacity: +capacity,
      location,
      duration,
      discount: +discount,
      quota: +quota,

      availability: {
        type: activityType,
        dates,
        range,
        weekly,
        monthly,
        exclusions: exclusions || [],
      },
      images,
    };

    if (!activityId) {
      await handlePost(data);
    } else {
      await handleUpdate(data, activityId);
    }
  };

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

  const subCategories = categories?.map(c => c.subcategories).flat();
  const category = subCategories?.find(c => c.id === +categoryId);

  if (
    !hydrated ||
    !isForm1Valid() ||
    !isForm2Valid() ||
    !isForm3Valid() ||
    !isForm4Valid() ||
    !isForm5Valid()
  )
    return <ReviewSkeleton />;

  return (
    <>
      <Card>
        <CardContent>
          <div className='flex justify-between items-center'>
            <h1 className='font-bold text-4xl'>{title}</h1>
            <h1 className='font-bold text-4xl'>
              {formatCurrency(parseFloat(price))}
            </h1>
          </div>
          <div className='flex items-center space-x-7 text-muted-foreground mb-3'>
            {category && (
              <p className='rounded-lg bg-primary text-white px-5 text-sm'>
                {category?.name}
              </p>
            )}
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
              dates={dates}
              range={range}
              weekly={weekly}
              monthly={monthly}
            />
          </div>
        </CardContent>
      </Card>
      <div className='flex justify-between my-10'>
        <LoadingButton
          loading={isLoading}
          className='cursor-pointer'
          variant='outline'
          onClick={handlePrev}
          disabled={isLoading}
        >
          <MoveLeft />
          Media
        </LoadingButton>

        <LoadingButton
          className='cursor-pointer'
          type='button'
          onClick={handleNext}
          disabled={isLoading}
          loading={isLoading}
        >
          Confirm & Post
          <MoveRight />
        </LoadingButton>
      </div>
    </>
  );
};

export default Page;
