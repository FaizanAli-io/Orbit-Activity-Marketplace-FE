'use client';
import React, { useEffect, useState } from 'react';
import LoadingButton from '../LoadingButton';
import ConfirmationDialog from '../confirmation-dialog';
import { subscribeActivity } from './action-subscribe';
import { toast } from 'sonner';

interface Props {
  activityId: number;
  subscribed?: boolean;
}

const SubButton = ({ activityId: id, subscribed }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);

    const { success, error } = await subscribeActivity(id);
    if (!success) {
      toast.error(error || 'Activity not subscribed. Try again');
    } else toast.success('Activity Subscribed!');

    setLoading(false);
  };

  return (
    <div className='flex-1'>
      <ConfirmationDialog
        title={'Do you want to subscribe activity?'}
        onAction={handleSubscribe}
        onCancel={() => setLoading(false)}
      >
        <LoadingButton
          loading={loading}
          disabled={loading || subscribed}
          className='w-full'
        >
          {subscribed ? 'Subscribed' : 'Subscribe'}
        </LoadingButton>
      </ConfirmationDialog>
    </div>
  );
};

export default SubButton;
