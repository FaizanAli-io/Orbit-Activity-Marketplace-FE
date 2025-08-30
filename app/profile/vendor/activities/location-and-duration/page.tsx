'use client';

import React, { useEffect, useState } from 'react';
import { LocationNDurationSchema } from '../schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MoveLeft, MoveRight } from 'lucide-react';
import { useActivityFormStore } from '../store';
import FormSkeleton from './FormSkeleton';

type Data = z.infer<typeof LocationNDurationSchema>;

const Page = () => {
  const setStep = useActivityFormStore(s => s.setCurrentStep);
  const setForm = useActivityFormStore(s => s.setFormData);

  const location = useActivityFormStore(s => s.location);
  const duration = useActivityFormStore(s => s.duration);

  const isForm1Valid = useActivityFormStore(s => s.isForm1Valid);
  const isForm2Valid = useActivityFormStore(s => s.isForm2Valid);
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

  const form = useForm<Data>({
    resolver: zodResolver(LocationNDurationSchema),
    defaultValues: {
      location,
      duration,
    },
  });

  useEffect(() => {
    if (!useActivityFormStore.persist.hasHydrated()) return;

    if (!isForm1Valid())
      return router.replace('/profile/vendor/activities/basic-details');
    if (!isForm2Valid())
      return router.replace('/profile/vendor/activities/pricing-and-capacity');

    setStep(3);

    form.reset({
      location: useActivityFormStore.getState().location,
      duration: useActivityFormStore.getState().duration,
    });
  }, [setStep, router, form, isForm1Valid, isForm2Valid]);

  const handlePrev = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setStep(3);
    router.push('/profile/vendor/activities/pricing-and-capacity');
  };

  const onSubmit = (data: Data) => {
    setForm(data);
    setStep(4);
    router.push('/profile/vendor/activities/schedule');
  };

  if (!hydrated || !isForm1Valid() || !isForm2Valid()) return <FormSkeleton />;

  return (
    <div>
      <h1 className='font-bold text-3xl'>Location & Duration</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=' my-10'>
          <div className='p-5 rounded-lg shadow-xs bg-white space-y-5'>
            <FormField
              control={form.control}
              name='location'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='London' autoFocus />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='duration'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration </FormLabel>
                  <FormControl>
                    <Input {...field} type='number' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex justify-between my-10'>
            <Button
              className='cursor-pointer'
              variant='outline'
              onClick={handlePrev}
            >
              <MoveLeft />
              Pricing & Capacity
            </Button>

            <Button className='cursor-pointer' type='submit'>
              Schedule
              <MoveRight />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Page;
