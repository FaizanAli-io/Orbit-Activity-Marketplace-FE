'use client';

import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
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
import { Button } from '@/components/ui/button';
import { MoveLeft, MoveRight, Plus, X } from 'lucide-react';
import { useActivityFormStore } from '../store';
import FormSkeleton from './FormSkeleton';
import { ScheduleSchema } from '../schema';
import { Combobox } from '@/components/ui/Combobox';
import { DatePicker } from '@/components/app/DatePicker';
import TimePicker from '@/components/app/TimePicker';
import { MultipleDatePicker } from '@/components/app/MultipleDatePicker';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { DayNumberSelector } from './DayNumberSelector';
import LoadingButton from '@/components/app/LoadingButton';

type Data = z.infer<typeof ScheduleSchema>;

const scheduleTypeOptions = ['dates', 'range', 'weekly', 'monthly'].map(v => ({
  label: v[0].toUpperCase().concat(v.slice(1)),
  value: v,
}));

const Page = () => {
  const [loading, setLoading] = useState(false);
  const setStep = useActivityFormStore(s => s.setCurrentStep);
  const setForm = useActivityFormStore(s => s.setFormData);

  const isForm1Valid = useActivityFormStore(s => s.isForm1Valid);
  const isForm2Valid = useActivityFormStore(s => s.isForm2Valid);
  const isForm3Valid = useActivityFormStore(s => s.isForm3Valid);

  const [hydrated, setHydrated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const unsub = useActivityFormStore.persist.onFinishHydration(() =>
      setHydrated(true)
    );

    if (useActivityFormStore.persist.hasHydrated()) setHydrated(true);

    return unsub;
  }, []);

  const tomorrow = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() + 5
  );

  const form = useForm<Data>({
    resolver: zodResolver(ScheduleSchema),
    defaultValues: {
      type: 'dates',
      dates: [
        {
          date: new Date(),
          time: { start: '', end: '' },
        },
      ],
      range: undefined,
      weekly: undefined,
      monthly: undefined,

      exclusions: [],
    },
  });

  useEffect(() => {
    if (!useActivityFormStore.persist.hasHydrated()) return;

    if (!isForm1Valid())
      return router.replace('/profile/vendor/activities/basic-details');
    if (!isForm2Valid())
      return router.replace('/profile/vendor/activities/pricing-and-capacity');
    if (!isForm3Valid())
      return router.replace('/profile/vendor/activities/location-and-duration');

    setStep(4);

    const values = useActivityFormStore.getState();

    form.reset({
      type: values.type,
      dates: values?.dates
        ? [
            ...values?.dates.map(v => ({
              ...v,
              date: new Date(v.date),
            })),
          ]
        : [],
      monthly: values.monthly
        ? {
            ...values.monthly,
            date: {
              start: new Date(values.monthly.date.start),
              end: new Date(values.monthly.date.end),
            },
          }
        : undefined,
      weekly: values.weekly
        ? {
            ...values.weekly,
            date: {
              start: new Date(values.weekly.date.start),
              end: new Date(values.weekly.date.end),
            },
          }
        : undefined,
      range: values.range
        ? {
            ...values.range,
            date: {
              start: new Date(values.range.date.start),
              end: new Date(values.range.date.end),
            },
          }
        : undefined,

      exclusions: values.exclusions
        ? values.exclusions.map(e => new Date(e))
        : [],
    });
  }, [setStep, router, form, isForm1Valid, isForm2Valid, isForm3Valid]);

  const handlePrev = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setLoading(true);
    setStep(3);
    router.push('/profile/vendor/activities/location-and-duration');
  };

  const onSubmit = (data: Data) => {
    setLoading(true);
    setForm(data);
    setStep(5);
    router.push('/profile/vendor/activities/media');
  };

  const { control } = form;

  const {
    fields: datesField,
    append: appendDates,
    remove: removeDates,
  } = useFieldArray({
    control,
    name: 'dates',
  });

  const handleTypeChange = (value: string) => {
    form.setValue('dates', undefined);
    form.setValue('range', undefined);
    form.setValue('weekly', undefined);
    form.setValue('monthly', undefined);

    if (value === 'dates') {
      const dates = [
        {
          date: new Date(),
          time: { start: '', end: '' },
        },
      ];

      form.setValue('dates', dates);
    } else if (value === 'range') {
      const range = {
        date: {
          start: new Date(),
          end: tomorrow,
        },
        time: { start: '', end: '' },
      };

      form.setValue('range', range);
    } else if (value === 'weekly') {
      const weekly = {
        days: [],
        date: { start: new Date(), end: tomorrow },
        time: { start: '', end: '' },
      };

      form.setValue('weekly', weekly);
    } else if (value === 'monthly') {
      const monthly = {
        days: [],
        date: { start: new Date(), end: tomorrow },
        time: { start: '', end: '' },
      };

      form.setValue('monthly', monthly);
    }

    const val = value as 'weekly' | 'monthly' | 'range' | 'dates';
    form.setValue('type', val);
  };

  if (!hydrated || !isForm1Valid() || !isForm2Valid() || !isForm3Valid())
    return <FormSkeleton />;

  return (
    <div>
      <h1 className='font-bold text-3xl'>Schedule</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=' my-10'>
          <div className='p-5 rounded-lg shadow-xs bg-white space-y-5'>
            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Activity Schedule Type</FormLabel>
                  <FormControl>
                    <Combobox
                      width='300px'
                      options={scheduleTypeOptions}
                      value={field.value}
                      onChange={handleTypeChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch('type') === 'dates' &&
              datesField.map((field, i) => (
                <div key={field.id} className='grid grid-cols-3 gap-2'>
                  <FormField
                    control={control}
                    name={`dates.${i}.date`}
                    render={({ field: { value, onChange } }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <DatePicker
                            buttonClass='w-full'
                            value={value ? new Date(value) : new Date()}
                            onChange={onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`dates.${i}.time.start`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Time</FormLabel>
                        <FormControl>
                          <TimePicker
                            className='w-full'
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`dates.${i}.time.end`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Time</FormLabel>
                        <FormControl>
                          <div className='flex space-x-2'>
                            <TimePicker
                              value={field.value}
                              onChange={field.onChange}
                            />

                            <Button
                              type='button'
                              variant='destructive'
                              size='icon'
                              onClick={() => removeDates(i)}
                            >
                              <X />
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}

            {form.watch('type') === 'dates' && (
              <div className='flex justify-end'>
                <Button
                  type='button'
                  onClick={() =>
                    appendDates({
                      date: new Date(),
                      time: { start: '', end: '' },
                    })
                  }
                >
                  Add Date <Plus />
                </Button>
              </div>
            )}

            {form.watch('type') === 'range' && (
              <div className='space-y-5'>
                <div>
                  <FormLabel className='mb-1'>Date Range</FormLabel>
                  <div className='grid grid-cols-2 gap-4'>
                    <Card className='min-w-max'>
                      <CardContent className='px-5 min-w-max'>
                        <Calendar
                          mode='range'
                          required
                          selected={{
                            from: form.watch('range.date.start'),
                            to: form.watch('range.date.end'),
                          }}
                          onSelect={({ from, to }) => {
                            form.setValue(
                              'range.date.start',
                              from ? new Date(from) : new Date()
                            );
                            form.setValue(
                              'range.date.end',
                              to ? new Date(to) : new Date()
                            );
                          }}
                          numberOfMonths={2}
                          className='w-full'
                        />
                      </CardContent>
                      <CardFooter>
                        <div className='flex space-x-5'>
                          <FormField
                            control={form.control}
                            name={`range.time.start`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Start Time</FormLabel>
                                <FormControl>
                                  <TimePicker
                                    value={field.value}
                                    onChange={field.onChange}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`range.time.end`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>End Time</FormLabel>
                                <FormControl>
                                  <TimePicker
                                    value={field.value}
                                    onChange={field.onChange}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {form.watch('type') === 'weekly' && (
              <div className='space-y-5'>
                <div>
                  <FormLabel className='mb-1'>Date Range</FormLabel>
                  <div className='grid grid-cols-2 gap-4'>
                    <Card className='min-w-max'>
                      <CardContent className='px-5 min-w-max'>
                        <Calendar
                          mode='range'
                          required
                          selected={{
                            from: form.watch('weekly.date.start'),
                            to: form.watch('weekly.date.end'),
                          }}
                          onSelect={({ from, to }) => {
                            form.setValue(
                              'weekly.date.start',
                              from || new Date()
                            );
                            form.setValue('weekly.date.end', to || new Date());
                          }}
                          numberOfMonths={2}
                          className='w-full'
                        />

                        <FormField
                          control={form.control}
                          name='weekly.days'
                          render={({ field: { value, onChange } }) => (
                            <FormItem className='border-y-1 py-2 my-2'>
                              <FormLabel>Select Dates</FormLabel>
                              <DayNumberSelector
                                mode='week'
                                selected={value}
                                onSelectionChange={onChange}
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                      <CardFooter>
                        <div className='flex space-x-5'>
                          <FormField
                            control={form.control}
                            name={`weekly.time.start`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Start Time</FormLabel>
                                <FormControl>
                                  <TimePicker
                                    value={field.value}
                                    onChange={field.onChange}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`weekly.time.end`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>End Time</FormLabel>
                                <FormControl>
                                  <TimePicker
                                    value={field.value}
                                    onChange={field.onChange}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {form.watch('type') === 'monthly' && (
              <div className='space-y-5'>
                <div>
                  <FormLabel className='mb-1'>Date Range</FormLabel>
                  <div className='grid grid-cols-2 gap-4'>
                    <Card className='min-w-max shadow-none'>
                      <CardContent className='relative px-5 min-w-max'>
                        <Calendar
                          mode='range'
                          required
                          selected={{
                            from: form.watch('monthly.date.start'),
                            to: form.watch('monthly.date.end'),
                          }}
                          onSelect={({ from, to }) => {
                            form.setValue(
                              'monthly.date.start',
                              from || new Date()
                            );
                            form.setValue('monthly.date.end', to || new Date());
                          }}
                          numberOfMonths={2}
                          className='w-full'
                        />

                        <FormField
                          control={form.control}
                          name='monthly.days'
                          render={({ field: { value, onChange } }) => (
                            <FormItem className='border-y-1 py-2 my-2'>
                              <FormLabel>Select Dates</FormLabel>
                              <DayNumberSelector
                                selected={value}
                                onSelectionChange={onChange}
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                      <CardFooter>
                        <div className='flex space-x-5'>
                          <FormField
                            control={form.control}
                            name={`monthly.time.start`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Start Time</FormLabel>
                                <FormControl>
                                  <TimePicker
                                    value={field.value}
                                    onChange={field.onChange}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`monthly.time.end`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>End Time</FormLabel>
                                <FormControl>
                                  <TimePicker
                                    value={field.value}
                                    onChange={field.onChange}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            <FormField
              control={form.control}
              name={`exclusions`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exclusions</FormLabel>
                  <FormControl>
                    <MultipleDatePicker
                      buttonClass='min-w-60'
                      values={field.value || []}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
              Location & Duration
            </LoadingButton>

            <LoadingButton
              loading={loading}
              disabled={loading}
              className='cursor-pointer'
              type='submit'
            >
              Media
              <MoveRight />
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Page;
