'use client';
import React, { useState } from 'react';
import LoadingButton from '../LoadingButton';
import { PaymentModal } from '../PaymentModal';
import { Activity } from '@/lib/data/activities/types';
import { toast } from 'sonner';

interface Props {
  activityId: number;
  subscribed?: boolean;
  activity?: Pick<Activity, 'id' | 'name' | 'price' | 'vendorId' | 'location'>;
}

const SubButton = ({ activityId: id, subscribed, activity }: Props) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(subscribed);

  const handleSubscribeClick = () => {
    if (isSubscribed) {
      toast.info('You are already subscribed to this activity');
      return;
    }

    if (!activity) {
      toast.error('Activity information is not available');
      return;
    }

    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setIsSubscribed(true);
    setShowPaymentModal(false);
    toast.success('Successfully subscribed to the activity!');
  };

  return (
    <div className='flex-1'>
      <LoadingButton
        onClick={handleSubscribeClick}
        disabled={isSubscribed}
        className='w-full'
      >
        {isSubscribed ? 'Booked' : 'Book'}
      </LoadingButton>

      {activity && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          activity={activity}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default SubButton;
