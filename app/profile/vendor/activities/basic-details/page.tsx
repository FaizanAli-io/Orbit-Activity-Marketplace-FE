'use client';

import React, { useEffect, useState } from 'react';
import { BasicDetailsSchema } from '../schema';
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
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight } from 'lucide-react';
import { useActivityFormStore } from '../store';
import z from 'zod';
import FormSkeleton from './FormSkeleton';
import { Combobox } from '@/components/ui/Combobox';
import { useCategories } from '@/lib/data/categories/use-categories';
import { Skeleton } from '@/components/ui/skeleton';
import LoadingButton from '@/components/app/LoadingButton';

type BasicDetails = z.infer<typeof BasicDetailsSchema>;

type CategoryOption = { label: string; value: string };

const Page = () => {
  const [loading, setLoading] = useState(false);
  const { data: categories, isFetched } = useCategories();

  const [subCategories, setSubCategories] = useState<CategoryOption[]>([]);
  const [supCategories, setSupCategories] = useState<CategoryOption[]>([]);

  const supCategory = useActivityFormStore(s => s.supCategory);
  const setSupCategory = useActivityFormStore(s => s.setSupCategory);

  const setStep = useActivityFormStore(s => s.setCurrentStep);
  const setForm = useActivityFormStore(s => s.setFormData);

  const [hydrated, setHydrated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!categories || !categories.length || supCategories.length) return;

    const data = categories.map(c => ({ value: String(c.id), label: c.name }));

    setSupCategories(data);
  }, [categories, supCategories.length]);

  useEffect(() => {
    const unsub = useActivityFormStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    if (useActivityFormStore.persist.hasHydrated()) setHydrated(true);

    return unsub;
  }, []);

  const form = useForm<BasicDetails>({
    resolver: zodResolver(BasicDetailsSchema),
    defaultValues: {
      title: '',
      description: '',
      categoryId: '',
    },
  });

  useEffect(() => {
    if (!useActivityFormStore.persist.hasHydrated() || !categories) return;

    const { title, description, categoryId, supCategory } =
      useActivityFormStore.getState();

    const sub = categories?.find(c => c.id === +supCategory)?.subcategories;
    if (sub && sub.length)
      setSubCategories(sub.map(c => ({ label: c.name, value: String(c.id) })));

    setStep(1);

    form.reset({
      title,
      description,
      categoryId,
    });
  }, [setStep, form, categories]);

  const onSubmit = (data: BasicDetails) => {
    setLoading(true);
    setForm(data);
    setStep(2);

    router.push('/profile/vendor/activities/pricing-and-capacity');
  };

  const handleSupCatChange = (val: string) => {
    setSupCategory(val);
    const sub = categories?.find(c => c.id === +val)?.subcategories;

    if (sub && sub.length)
      setSubCategories(sub.map(c => ({ label: c.name, value: String(c.id) })));
  };

  if (!hydrated) return <FormSkeleton />;

  return (
    <div>
      <h1 className='font-bold text-3xl'>Basic Details</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=' my-10'>
          <div className='bg-white p-5 rounded-lg shadow-xs space-y-5'>
            {isFetched ? (
              <FormField
                control={form.control}
                name='categoryId'
                render={({ field }) => (
                  <FormItem>
                    <div className='space-y-1'>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Combobox
                          width='300px'
                          options={supCategories}
                          value={supCategory}
                          onChange={handleSupCatChange}
                        />
                      </FormControl>
                    </div>
                    <div className='space-y-1 ml-10'>
                      <FormControl>
                        <Combobox
                          width='300px'
                          options={subCategories}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <div className='space-y-2'>
                <Skeleton className='w-15 h-5' />
                <Skeleton className='w-72 h-10' />
                <Skeleton className='w-72 h-10 mt-1 ml-20' />
              </div>
            )}

            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Mountain Hiking'
                      autoFocus
                      disabled={loading}
                    />
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
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex justify-end my-15'>
            <LoadingButton
              className='cursor-pointer'
              type='submit'
              loading={loading}
              disabled={loading}
            >
              Pricing & Capacity <ArrowRight />
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Page;
