'use client';

import { format, parseISO } from 'date-fns';
import { Calendar, Clock, Text, User } from 'lucide-react';

import { EditEventDialog } from '@/calendar/components/dialogs/edit-event-dialog';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import type { IEvent } from '@/calendar/interfaces';
import { deleteEvent } from './action';
import { toast } from 'sonner';
import { useState } from 'react';
import LoadingButton from '@/components/app/LoadingButton';

interface IProps {
  event: IEvent;
  children: React.ReactNode;
}

export function EventDetailsDialog({ event, children }: IProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const startDate = parseISO(event.startDate);
  const endDate = parseISO(event.endDate);

  const handleDelete = async () => {
    setLoading(true);
    const { success, error } = await deleteEvent(event.id);

    if (success) return toast.success('Event deleted');
    if (!success) return toast.error(error, { richColors: true });

    setLoading(false);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>{event.title}</DialogTitle>
          </DialogHeader>

          <div className='space-y-4'>
            <div className='flex items-start gap-2'>
              <Calendar className='mt-1 size-4 shrink-0' />
              <div>
                <p className='text-sm font-medium'>Start Date</p>
                <p className='text-sm text-muted-foreground'>
                  {format(startDate, 'MMM d, yyyy h:mm a')}
                </p>
              </div>
            </div>

            <div className='flex items-start gap-2'>
              <Clock className='mt-1 size-4 shrink-0' />
              <div>
                <p className='text-sm font-medium'>End Date</p>
                <p className='text-sm text-muted-foreground'>
                  {format(endDate, 'MMM d, yyyy h:mm a')}
                </p>
              </div>
            </div>

            <div className='flex items-start gap-2'>
              <Text className='mt-1 size-4 shrink-0' />
              <div>
                <p className='text-sm font-medium'>Description</p>
                <p className='text-sm text-muted-foreground'>
                  {event.description}
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <LoadingButton
              type='button'
              variant='destructive'
              onClick={handleDelete}
              loading={loading}
              disabled={loading}
            >
              Delete
            </LoadingButton>
            {/* <EditEventDialog event={event}>
              <Button type='button' variant='outline'>
                Edit
              </Button>
            </EditEventDialog> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
