'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { MediaSchema } from '../schema';
import { MoveLeft, MoveRight } from 'lucide-react';
import { toast } from 'sonner';
import { useActivityFormStore } from '../store';
import { useRouter } from 'next/navigation';
import FormSkeleton from './FormSkeleton';
import Uploader from '@/components/app/Uploader';

const Page = () => {
  const setStep = useActivityFormStore(s => s.setCurrentStep);
  const setForm = useActivityFormStore(s => s.setFormData);

  const images = useActivityFormStore(s => s.images.images);
  const addImage = useActivityFormStore(s => s.addImage);
  const removeImage = useActivityFormStore(s => s.removeImage);

  const thumbnail = useActivityFormStore(s => s.images.thumbnail);
  const setThumbnail = useActivityFormStore(s => s.setThumbnail);

  const video = useActivityFormStore(s => s.images.video);
  const setVideo = useActivityFormStore(s => s.setVideo);

  // const [images, setImages] = useState<string[]>([]);
  // const [video, setVideo] = useState<string[]>([]);
  // const [thumbnail, setThumbnail] = useState<string[]>([]);

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

    if (!isForm1Valid()) return router.replace('/activity-form/basic-details');
    if (!isForm2Valid())
      return router.replace('/activity-form/pricing-and-capacity');
    if (!isForm3Valid())
      return router.replace('/activity-form/location-and-duration');
    if (!isForm4Valid()) return router.replace('/activity-form/schedule');

    setStep(5);
  }, [setStep, router, isForm1Valid, isForm2Valid, isForm3Valid, isForm4Valid]);

  const handlePrev = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setStep(3);
    router.push('/activity-form/schedule');
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const data = {
      images: {
        video: video || '',
        images,
        thumbnail: thumbnail || '',
      },
    };

    const { success, error } = MediaSchema.safeParse(data);

    if (!success) {
      const messages = error.flatten().fieldErrors.images;
      toast.error(messages ? messages[0] : 'Error', { richColors: true });
      return;
    }

    setForm(data);
    setStep(5);
    router.push('/activity-form/review');
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
        <div className='space-y-1.5'>
          <Label>Thumbnail</Label>
          <Uploader
            maxFiles={1}
            maxSizeInMbs={5}
            setUrl={setThumbnail}
            imageUrl={thumbnail}
          />
        </div>
        <div className='space-y-1.5'>
          <Label>Images</Label>
          <Uploader
            maxFiles={50}
            maxSizeInMbs={20}
            setUrl={addImage}
            imageUrls={images}
            removeUrl={removeImage}
          />
        </div>
        <div className='space-y-1.5'>
          <Label>Video</Label>
          <Uploader
            maxFiles={1}
            maxSizeInMbs={50}
            allowVideoUpload
            allowImageUpload={false}
            setUrl={setVideo}
            videoUrl={video}
          />
        </div>
      </div>

      <div className='flex justify-between my-10'>
        <Button
          className='cursor-pointer'
          variant='outline'
          onClick={handlePrev}
        >
          <MoveLeft />
          Schedule
        </Button>

        <Button className='cursor-pointer' onClick={onSubmit}>
          Review & Post
          <MoveRight />
        </Button>
      </div>
    </div>
  );
};

export default Page;
