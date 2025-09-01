'use client';
import ConfirmationDialog from '@/components/app/confirmation-dialog';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import { Activity } from '@/lib/data/activities/types';
import { format } from 'date-fns';
import { Eye, PenBox, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { deleteActivity } from '../../activities/actions/delete';
import Link from 'next/link';
import { toast } from 'sonner';
import LoadingButton from '@/components/app/LoadingButton';
import { useRouter } from 'next/navigation';
import { useActivityFormStore } from '../../activities/store';

const ActivityCardFooter = ({
  timestamp,
  id,
  categoryId,
  name: title,
  description,
  price,
  discount,
  capacity,
  quota,
  location,
  duration,
  availability: { exclusions, dates, monthly, range, weekly, type },
  images,
}: Activity) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const loading = deleteLoading || editLoading;

  const setActivityId = useActivityFormStore(s => s.setActivityId);
  const setImages = useActivityFormStore(s => s.setImages);
  const setThumbnail = useActivityFormStore(s => s.setThumbnail);
  const setVideo = useActivityFormStore(s => s.setVideo);
  const setForm = useActivityFormStore(s => s.setFormData);

  const router = useRouter();

  const handleDelete = async () => {
    setDeleteLoading(true);

    const { success, error } = await deleteActivity(id);
    if (success) toast.success('Event Deleted!');
    else toast.error(error || 'Event was not deleted! Try again.');

    setDeleteLoading(false);
  };

  const handleEdit = () => {
    setEditLoading(true);
    setActivityId(id);

    setForm({
      categoryId: String(categoryId),
      title,
      description,
      price: String(price),
      discount: String(discount),
      capacity: String(capacity),
      quota: String(quota),
      location,
      duration: String(duration),
      exclusions: exclusions?.map(e => new Date(e)),
      type,
      dates: dates?.map(d => ({
        date: new Date(d.date),
        time: d.time,
      })),
      range: range && {
        date: {
          start: new Date(range.date.start),
          end: new Date(range.date.end),
        },
        time: { start: range.time.start, end: range.time.end },
      },
      monthly: monthly && {
        days: monthly.days || [],
        date: {
          start: new Date(monthly.date.start),
          end: new Date(monthly.date.end),
        },
        time: { start: monthly.time.start, end: monthly.time.end },
      },
      weekly: weekly && {
        days: weekly.days,
        date: {
          start: new Date(weekly.date.start),
          end: new Date(weekly.date.end),
        },
        time: { start: weekly.time.start, end: weekly.time.end },
      },
    });

    if (images?.images) setImages(images.images);
    if (images?.thumbnail) setThumbnail(images.thumbnail);
    if (images?.video) setVideo(images.video);

    router.push('/profile/vendor/activities/basic-details');
  };

  return (
    <CardFooter className='flex flex-col items-start space-y-2 md:flex-row md:space-y-0 md:justify-between md:items-center'>
      <p>Created on {format(timestamp, 'MMM dd, yyyy')}</p>
      <div className='flex space-x-2'>
        <Link href={`/event/${id}`}>
          <Button disabled={loading} size='sm' variant={'outline'}>
            <Eye />
            View
          </Button>
        </Link>
        <LoadingButton
          onClick={handleEdit}
          loading={editLoading}
          disabled={loading}
          size='sm'
          variant={'outline'}
        >
          <PenBox />
          Edit
        </LoadingButton>
        <ConfirmationDialog
          title={'Delete event?'}
          description='Are you sure you want to delete this event? This action cannot be reversed.'
          onAction={handleDelete}
        >
          <LoadingButton
            disabled={loading}
            loading={deleteLoading}
            size='sm'
            variant={'outline'}
          >
            <Trash2 />
            Delete
          </LoadingButton>
        </ConfirmationDialog>
      </div>
    </CardFooter>
  );
};

export default ActivityCardFooter;
