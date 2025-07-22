'use client';

import React, { useEffect, useState } from 'react';
import { locationSchema } from '../schema';
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
import { DatePicker } from '@/components/app/DatePicker';
import { useActivityFormStore } from '../store';
import FormSkeleton from './FormSkeleton';

type BasicDetails = z.infer<typeof locationSchema>;

const Page = () => {
  const setStep = useActivityFormStore(s => s.setCurrentStep);
  const setForm = useActivityFormStore(s => s.setFormData);

  const location = useActivityFormStore(s => s.location);
  const time = useActivityFormStore(s => s.time);
  const date = useActivityFormStore(s => s.date);
  const members = useActivityFormStore(s => s.members);
  const duration = useActivityFormStore(s => s.duration);

  const isForm1Valid = useActivityFormStore(s => s.isForm1Valid);
  const isForm2Valid = useActivityFormStore(s => s.isForm2Valid);
  const [hydrated, setHydrated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const unsub = useActivityFormStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    // fallback for rare edge cases
    if (useActivityFormStore.persist.hasHydrated()) {
      setHydrated(true);
    }

    return unsub;
  }, []);

  const form = useForm<BasicDetails>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      location,
      date: date || new Date().toString(),
      time,
      members,
      duration,
    },
  });

  useEffect(() => {
    if (!useActivityFormStore.persist.hasHydrated()) return;

    if (!isForm1Valid()) return router.replace('/activity-form/basic-details');
    if (!isForm2Valid()) return router.replace('/activity-form/whats-included');

    setStep(3);

    form.reset({
      location: useActivityFormStore.getState().location,
      date: useActivityFormStore.getState().date,
      time: useActivityFormStore.getState().time,
      members: useActivityFormStore.getState().members,
      duration: useActivityFormStore.getState().duration,
    });
  }, [setStep, router, form, isForm1Valid, isForm2Valid]);

  const onSubmit = (data: BasicDetails) => {
    setForm(data);
    setStep(4);
    router.push('/activity-form/review');
  };

  const handlePrev = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setStep(3);
    router.push('/activity-form/whats-included');
  };

  if (!hydrated || !isForm1Valid() || !isForm2Valid()) return <FormSkeleton />;

  return (
    <div>
      <h1 className='font-bold text-3xl'>Location & Schedule</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=' my-10 space-y-5'
        >
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
            name='members'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Members Capacity</FormLabel>
                <FormControl>
                  <Input {...field} type='number' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex space-x-2'>
            <FormField
              control={form.control}
              name='date'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      onChange={field.onChange}
                      value={new Date(field.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='time'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    {/* <TimePicker onChange={field.onChange} value={field.value} /> */}
                    <Input {...field} type='time' />
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
                  <FormLabel>Duration (in minutes)</FormLabel>
                  <FormControl>
                    <Input {...field} type='number' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex justify-between my-20'>
            <Button
              className='cursor-pointer'
              variant='outline'
              onClick={handlePrev}
            >
              <MoveLeft /> Whats Included
            </Button>

            <Button className='cursor-pointer' type='submit'>
              Review
              <MoveRight />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Page;
