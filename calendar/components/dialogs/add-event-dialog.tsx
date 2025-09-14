'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useDisclosure } from '@/hooks/use-disclosure';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import {
  Dialog,
  DialogHeader,
  DialogClose,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

import { eventSchema } from '@/calendar/schemas';

import type { TEventFormData } from '@/calendar/schemas';
import { Calendar } from '@/components/ui/calendar';
import { cn, getFormatedTime, mergeDateAndTime, timeToDate } from '@/lib/utils';
import { Combobox } from '@/components/ui/Combobox';
import { useActivities } from '@/lib/data/activities/use-activities';
import { Skeleton } from '@/components/ui/skeleton';
import TimePicker from '@/components/app/TimePicker';
import { postEvent } from './action';
import { toast } from 'sonner';
import { format } from 'date-fns';
import LoadingButton from '@/components/app/LoadingButton';

interface IProps {
  children: React.ReactNode;
  startDate?: Date;
  startTime?: { hour: number; minute: number };
}

export function AddEventDialog({ children, startDate, startTime }: IProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const [validDateRange, setValidDateRange] = useState<{
    start: Date;
    end: Date;
  }>({ start: new Date(), end: new Date() });

  const [validTimeRange, setValidTimeRange] = useState<{
    start: Date;
    end: Date;
  }>({ start: new Date(), end: new Date() });

  const { data, isFetched } = useActivities();
  const activities = data?.data;

  const { isOpen, onClose, onToggle } = useDisclosure();

  const form = useForm<TEventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      // activityId: 0,
      // startTime: undefined,
      // endTime: undefined,
    },
  });

  const onSubmit = async (_values: TEventFormData) => {
    setLoading(true);

    const startDate = mergeDateAndTime(_values.startDate, _values.startTime);
    const endDate = mergeDateAndTime(_values.endDate, _values.endTime);

    const data = {
      activityId: _values.activityId,
      startTime: `${format(startDate, "yyyy-MM-dd'T'HH:mm:00")}.000Z`,
      endTime: `${format(endDate, "yyyy-MM-dd'T'HH:mm:00")}.000Z`,
    };

    const { success, error } = await postEvent({ ...data });

    if (!success) toast.error(error, { richColors: true });
    else {
      toast.success('Event added');
      form.reset();
    }
    setLoading(false);
  };

  const validateDate = (id: number) => {
    const activity = data?.data?.find(a => a.id === id);

    if (!activity) return;

    const { type, weekly, monthly, range } = activity.availability;

    if (type === 'range' && range) {
      const startDate = range.date.start;
      const endDate = range.date.end;

      const startTime = range.time.start;
      const endTime = range.time.end;

      console.log(new Date(startTime), new Date(endTime), 'time');

      setValidDateRange({ start: new Date(startDate), end: new Date(endDate) });
      setValidTimeRange({
        start: timeToDate(startTime),
        end: timeToDate(endTime),
      });
    }

    if (type === 'weekly' && weekly) {
      const startDate = weekly.date.start;
      const endDate = weekly.date.end;

      const startTime = weekly.time.start;
      const endTime = weekly.time.end;

      setValidDateRange({ start: new Date(startDate), end: new Date(endDate) });
      setValidTimeRange({
        start: timeToDate(startTime),
        end: timeToDate(endTime),
      });
    }

    if (type === 'monthly' && monthly) {
      const startDate = monthly.date.start;
      const endDate = monthly.date.end;

      const startTime = monthly.time.start;
      const endTime = monthly.time.end;

      setValidDateRange({ start: new Date(startDate), end: new Date(endDate) });
      setValidTimeRange({
        start: timeToDate(startTime),
        end: timeToDate(endTime),
      });
    }
  };

  const handleStartTimeChange = (time: string) => {
    const parsedTime = timeToDate(time);
    form.setValue('startTime', parsedTime);
  };

  const handleEndTimeChange = (time: string) => {
    const parsedTime = timeToDate(time);
    form.setValue('endTime', parsedTime);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onToggle}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className='sm:max-w-min bg-white max-h-[90vh] overflow-y-auto'>
        <DialogHeader className='text-left'>
          <DialogTitle>Add New Event</DialogTitle>
          <DialogDescription>
            Add events to set the reminders for yourself.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form id='event-form' onSubmit={form.handleSubmit(onSubmit)}>
            {!isFetched || !activities ? (
              <Skeleton className='w-full h-5' />
            ) : (
              <FormField
                control={form.control}
                name='activityId'
                render={({ field }) => (
                  <FormItem className='mb-5 max-w-xs '>
                    <FormLabel>Activity</FormLabel>
                    <FormControl>
                      <Combobox
                        value={String(field.value)}
                        onChange={val => {
                          validateDate(+val);
                          field.onChange(+val);
                        }}
                        options={activities.map(a => ({
                          label: a.name,
                          value: String(a.id),
                        }))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className='md:flex space-y-5 md:space-y-0 md:space-x-5 my-10'>
              <FormField
                control={form.control}
                name='startDate'
                render={({ field, fieldState }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        className={cn('rounded-md border', {
                          'border-red-500': fieldState.error,
                        })}
                        disabled={{
                          before: validDateRange.start,
                          after: validDateRange.end,
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='endDate'
                render={({ field, fieldState }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        className={cn('rounded-md border', {
                          'border-red-500': fieldState.error,
                        })}
                        disabled={{
                          before: validDateRange.start,
                          after: validDateRange.end,
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {validTimeRange && (
              <p className='text-primary text-sm font-semibold my-2 uppercase'>
                The time must be between{' '}
                {validTimeRange.start.toLocaleTimeString()} and{' '}
                {validTimeRange.end.toLocaleTimeString()}
              </p>
            )}
            <div className='flex space-x-5'>
              <FormField
                control={form.control}
                name='startTime'
                render={({ field: { value } }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <TimePicker
                        value={getFormatedTime(value)}
                        onChange={handleStartTimeChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='endTime'
                render={({ field: { value } }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <TimePicker
                        value={getFormatedTime(value)}
                        onChange={handleEndTimeChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild disabled={loading}>
            <Button type='button' variant='outline' disabled={loading}>
              Cancel
            </Button>
          </DialogClose>

          <LoadingButton
            form='event-form'
            type='submit'
            disabled={loading}
            loading={loading}
          >
            Create Event
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
