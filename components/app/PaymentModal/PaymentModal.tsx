'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Activity } from '@/lib/data/activities/types';
import { X } from 'lucide-react';
import { PaymentForm } from './PaymentForm';
import { PaymentSummary } from '.';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity: Pick<Activity, 'id' | 'name' | 'price' | 'vendorId' | 'location'>;
  onPaymentSuccess: () => void;
}

export function PaymentModal({
  isOpen,
  onClose,
  activity,
  onPaymentSuccess,
}: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePaymentComplete = () => {
    onPaymentSuccess();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader className='flex flex-row items-center justify-between space-y-0 pb-4'>
          <DialogTitle className='text-2xl font-bold'>
            Complete Your Subscription
          </DialogTitle>
        </DialogHeader>

        <div className='grid gap-6 lg:grid-cols-5'>
          {/* Payment Form - Takes up more space */}
          <div className='lg:col-span-3'>
            <PaymentForm
              activity={activity}
              onSuccess={handlePaymentComplete}
              isProcessing={isProcessing}
              setIsProcessing={setIsProcessing}
            />
          </div>

          {/* Payment Summary - Sidebar */}
          <div className='lg:col-span-2'>
            <div className='lg:sticky lg:top-0'>
              <PaymentSummary activity={activity} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
