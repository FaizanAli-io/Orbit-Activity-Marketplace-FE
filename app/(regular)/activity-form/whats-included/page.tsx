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
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Item from './Item';
import { useActivityFormStore } from '../store';
import FormSkeleton from './FormSkeleton';

const schema = z.object({
  item: z
    .string()
    .min(3, 'mute be atleast 3 characters long')
    .max(255, 'cannot exceed 255 characters'),
});

type Data = z.infer<typeof schema>;

const Page = () => {
  const setStep = useActivityFormStore(s => s.setCurrentStep);
  const setForm = useActivityFormStore(s => s.setFormData);
  const isPrevFormValid = useActivityFormStore(s => s.isForm1Valid);

  const [items, setItems] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const unsub = useActivityFormStore.persist.onFinishHydration(() => {
      setItems(useActivityFormStore.getState().included); // ✅ set after hydration
      setHydrated(true);
    });

    if (useActivityFormStore.persist.hasHydrated()) {
      setItems(useActivityFormStore.getState().included); // ✅ fallback
      setHydrated(true);
    }

    return unsub;
  }, []);

  useEffect(() => {
    if (!useActivityFormStore.persist.hasHydrated()) return;

    // console.log(included, 'whats included form!');

    if (!isPrevFormValid())
      return router.replace('/activity-form/basic-details');

    setStep(2);
  }, [setStep, router, isPrevFormValid]);

  const form = useForm<Data>({
    resolver: zodResolver(schema),
    defaultValues: {
      item: '',
    },
  });

  const onSubmit = ({ item }: Data) => {
    if (!item) return;
    setItems(prev => [...prev, item]);
    form.reset();
  };

  const handleNext = () => {
    if (!items.length)
      return toast.error('Atleast 1 item is required', {
        position: 'bottom-center',
        dismissible: true,
      });

    setStep(3);
    setForm({ included: items });
    router.push('/activity-form/location');
  };

  const handlePrev = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    setStep(2);
    router.push('/activity-form/basic-details');
  };

  const handleDelete = (n: number) => {
    const copy = [...items];
    copy.splice(n, 1);
    setItems(copy);
  };

  if (!hydrated || !isPrevFormValid()) return <FormSkeleton />;

  return (
    <div>
      <h1 className='font-bold text-3xl'>Whats Included</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=' my-10 space-y-5'
        >
          <FormField
            control={form.control}
            name='item'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item</FormLabel>
                <FormControl>
                  <Input {...field} autoFocus />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className='cursor-pointer' type='submit'>
            Add Item
          </Button>
        </form>
      </Form>

      <div className='mb-15 space-y-1'>
        {items.map((value, i) => (
          <Item key={i} onClick={() => handleDelete(i)}>
            {value}
          </Item>
        ))}
      </div>

      <div className='flex justify-between'>
        <Button
          variant='outline'
          className='cursor-pointer'
          onClick={handlePrev}
        >
          <ArrowLeft /> Basic Details
        </Button>

        <Button className='cursor-pointer' onClick={handleNext}>
          Location <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default Page;
