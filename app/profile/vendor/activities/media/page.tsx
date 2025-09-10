'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MediaSchema } from '../schema';
import { MoveLeft, MoveRight } from 'lucide-react';
import { toast } from 'sonner';
import { useActivityFormStore } from '../store';
import { useRouter } from 'next/navigation';
import FormSkeleton from './FormSkeleton';
import LoadingButton from '@/components/app/LoadingButton';
import UnifiedMediaUploader from '@/components/app/UnifiedMediaUploader';

const Page = () => {
  const [loading, setLoading] = useState(false);
  const setStep = useActivityFormStore(s => s.setCurrentStep);
  const setForm = useActivityFormStore(s => s.setFormData);

  const images = useActivityFormStore(s => s.images.images);
  const setImages = useActivityFormStore(s => s.setImages);
  const addImage = useActivityFormStore(s => s.addImage);
  const removeImage = useActivityFormStore(s => s.removeImage);

  const thumbnail = useActivityFormStore(s => s.images.thumbnail);
  const setThumbnail = useActivityFormStore(s => s.setThumbnail);

  const video = useActivityFormStore(s => s.images.video);
  const setVideo = useActivityFormStore(s => s.setVideo);
  const removeVideo = useActivityFormStore(s => s.removeVideo);

  const isForm1Valid = useActivityFormStore(s => s.isForm1Valid);
  const isForm2Valid = useActivityFormStore(s => s.isForm2Valid);
  const isForm3Valid = useActivityFormStore(s => s.isForm3Valid);
  const isForm4Valid = useActivityFormStore(s => s.isForm4Valid);

  const [hydrated, setHydrated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const unsub = useActivityFormStore.persist.onFinishHydration(() =>
      setHydrated(true)
    );

    // fallback for rare edge cases
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
      return router.replace('/profile/vendor/activities/location-and-duration');
    if (!isForm4Valid())
      return router.replace('/profile/vendor/activities/schedule');

    setStep(5);
  }, [setStep, router, isForm1Valid, isForm2Valid, isForm3Valid, isForm4Valid]);

  const handlePrev = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    setLoading(true);

    setStep(3);
    router.push('/profile/vendor/activities/schedule');
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    setLoading(true);

    // Ensure thumbnail is set if images exist
    let finalThumbnail = thumbnail;
    if (images.length > 0 && !thumbnail) {
      finalThumbnail = images[0]; // Use first image as thumbnail if none selected
      setThumbnail(finalThumbnail);
    }

    const data = {
      images: {
        video: video || '',
        images,
        thumbnail: finalThumbnail || '',
      },
    };

    const { success, error } = MediaSchema.safeParse(data);

    if (!success) {
      console.log('Validation error:', error.format());
      const errorMessages = error.flatten();
      const imageErrors = errorMessages.fieldErrors.images;
      const thumbnailErrors = errorMessages.formErrors;

      let errorMessage = 'Validation error';

      // Check for video errors in the nested structure
      if (error.issues.some(issue => issue.path.includes('video'))) {
        errorMessage = 'Video is required';
      } else if (imageErrors && imageErrors.length > 0) {
        errorMessage = imageErrors[0];
      } else if (thumbnailErrors && thumbnailErrors.length > 0) {
        errorMessage = thumbnailErrors[0];
      }

      toast.error(errorMessage, { richColors: true });
      setLoading(false);
      return;
    }

    setForm(data);
    setStep(5);
    router.push('/profile/vendor/activities/review');
  };

  if (
    !hydrated ||
    !isForm1Valid() ||
    !isForm2Valid() ||
    !isForm3Valid() ||
    !isForm4Valid()
  )
    return <FormSkeleton />;

  return (
    <div>
      <h1 className='font-bold text-3xl'>Media</h1>
      <div className='p-5 rounded-lg shadow-xs bg-white space-y-5'>
        <UnifiedMediaUploader
          images={images}
          thumbnail={thumbnail}
          video={video}
          onImagesChange={setImages}
          onThumbnailChange={setThumbnail}
          onVideoChange={setVideo}
          onImageAdd={addImage}
          onImageRemove={removeImage}
          onVideoRemove={removeVideo}
        />
      </div>

      <div className='flex justify-between my-10'>
        <LoadingButton
          loading={loading}
          disabled={loading}
          className='cursor-pointer'
          variant='outline'
          onClick={handlePrev}
        >
          <MoveLeft />
          Schedule
        </LoadingButton>

        <LoadingButton
          loading={loading}
          disabled={loading}
          className='cursor-pointer'
          onClick={onSubmit}
        >
          Review & Post
          <MoveRight />
        </LoadingButton>
      </div>
    </div>
  );
};

export default Page;
