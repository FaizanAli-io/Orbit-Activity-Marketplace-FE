'use client';

import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PricingNCapacitySchema } from '../schema';
import { useActivityFormStore } from '../store';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import FormSkeleton from './FormSkeleton';
import z from 'zod';

type Data = z.infer<typeof PricingNCapacitySchema>;

const Page = () => {
  const setStep = useActivityFormStore(s => s.setCurrentStep);
  const setForm = useActivityFormStore(s => s.setFormData);
  const isPrevFormValid = useActivityFormStore(s => s.isForm1Valid);

  const [hydrated, setHydrated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const unsub = useActivityFormStore.persist.onFinishHydration(() =>
      setHydrated(true)
    );

    if (useActivityFormStore.persist.hasHydrated()) setHydrated(true);

    return unsub;
  }, []);

  const form = useForm<Data>({
    resolver: zodResolver(PricingNCapacitySchema),
    defaultValues: {
      price: '',
      discount: '',
      capacity: '',
      quota: '',
    },
  });

  useEffect(() => {
    if (!useActivityFormStore.persist.hasHydrated()) return;

    if (!isPrevFormValid())
      return router.replace('/activity-form/basic-details');

    setStep(2);

    form.reset({
      price: useActivityFormStore.getState().price,
      discount: useActivityFormStore.getState().discount,
      capacity: useActivityFormStore.getState().capacity,
      quota: useActivityFormStore.getState().quota,
    });
<<<<<<< HEAD
  }, [setStep, router, isPrevFormValid, form]);
=======
  }, [setStep, router, isPrevFormValid]);
>>>>>>> 8487054194f5ec70b0e77ce50ae5f5aa13d143e7

  const onSubmit = (data: Data) => {
    setForm(data);
    setStep(3);
    router.push('/activity-form/location-and-duration');
  };

  const handlePrev = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    setStep(1);
    router.push('/activity-form/basic-details');
  };

  if (!hydrated || !isPrevFormValid()) return <FormSkeleton />;

  return (
    <div>
      <h1 className='font-bold text-3xl'>Pricing & Capacity</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className=' my-10 space-y-5 bg-white p-5 rounded-lg shadow-xs'>
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input {...field} autoFocus min={0} type='number' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='discount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount</FormLabel>
                  <FormControl>
                    <Input {...field} min={0} max={100} type='number' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='capacity'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                    <Input {...field} min={0} type='number' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='quota'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quota</FormLabel>
                  <FormControl>
                    <Input {...field} min={0} type='number' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex justify-between'>
            <Button
              variant='outline'
              className='cursor-pointer'
              type='button'
              onClick={handlePrev}
            >
              <ArrowLeft /> Basic Details
            </Button>

            <Button className='cursor-pointer' type='submit'>
              Location <ArrowRight />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Page;
