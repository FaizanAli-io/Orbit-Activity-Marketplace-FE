'use client';

import { useEffect, useState } from 'react';
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
import { useCategories } from '@/lib/data/categories/use-categories';
import { Skeleton } from '@/components/ui/skeleton';
import LoadingButton from '@/components/app/LoadingButton';
import CategoriesCombobox from '@/app/profile/vendor/activities/basic-details/categoriesCombobox';

type BasicDetails = z.infer<typeof BasicDetailsSchema>;

const Page = () => {
  const [loading, setLoading] = useState(false);
  const { data: categories, isFetched } = useCategories();

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
                  <FormItem className='max-w-[250px]'>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      {categories && (
                        <CategoriesCombobox
                          value={field.value}
                          onChange={field.onChange}
                          options={categories?.map(c => ({
                            group: c.name || '',
                            categories: c.subcategories.map(c => ({
                              value: String(c.id),
                              label: c.name,
                            })),
                          }))}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <div className='space-y-2'>
                <Skeleton className='w-15 h-5' />
                <Skeleton className='w-72 h-10' />
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
