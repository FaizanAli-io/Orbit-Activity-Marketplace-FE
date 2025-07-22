'use client';

import React, { useEffect, useState } from 'react';
import { basicDetailsSchema } from '../schema';
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight } from 'lucide-react';
import { useActivityFormStore } from '../store';
import z from 'zod';
import FormSkeleton from './FormSkeleton';

type BasicDetails = z.infer<typeof basicDetailsSchema>;

const Page = () => {
  const setStep = useActivityFormStore(s => s.setCurrentStep);
  const setForm = useActivityFormStore(s => s.setFormData);

  const [hydrated, setHydrated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const unsub = useActivityFormStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    if (useActivityFormStore.persist.hasHydrated()) setHydrated(true);

    return unsub;
  }, []);

  const form = useForm<BasicDetails>({
    resolver: zodResolver(basicDetailsSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  useEffect(() => {
    if (!useActivityFormStore.persist.hasHydrated()) return;

    setStep(1);
    form.reset({
      title: useActivityFormStore.getState().title,
      description: useActivityFormStore.getState().description,
    });
  }, [setStep, form]);

  const onSubmit = (data: BasicDetails) => {
    setForm(data);
    setStep(2);

    router.push('/activity-form/whats-included');
  };

  if (!hydrated) return <FormSkeleton />;

  return (
    <div>
      <h1 className='font-bold text-3xl'>Basic Details</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=' my-10 space-y-5'
        >
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Mountain Hiking' autoFocus />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    maxLength={500}
                    className='min-h-[200px] resize-y field-sizing-fixed'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex justify-end my-15'>
            <Button className='cursor-pointer' type='submit'>
              Whats Included <ArrowRight />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Page;
