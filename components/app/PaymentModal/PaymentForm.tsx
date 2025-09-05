'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, CreditCard, Lock } from 'lucide-react';
import { Activity } from '@/lib/data/activities/types';
import { processPaymentWithValidation } from '@/lib/data/payments/process-payment-server';
import {
  PaymentFormSchema,
  type PaymentFormData,
} from '@/lib/schemas/payment-schemas';

interface PaymentFormProps {
  activity: Pick<Activity, 'id' | 'name' | 'price' | 'vendorId'>;
  onSuccess: () => void;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
}

export function PaymentForm({
  activity,
  onSuccess,
  isProcessing,
  setIsProcessing,
}: PaymentFormProps) {
  const form = useForm<PaymentFormData>({
    resolver: zodResolver(PaymentFormSchema),
    defaultValues: {
      email: '',
      cardholderName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
  });

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const onSubmit = async (data: PaymentFormData) => {
    setIsProcessing(true);

    try {
      // Combine form data with activity information
      const paymentData = {
        ...data,
        activityId: activity.id,
        vendorId: activity.vendorId,
        amount: activity.price,
        method: 'CREDIT_CARD' as const,
      };

      const result = await processPaymentWithValidation(paymentData);

      if (result.success) {
        toast.success(
          'Payment successful! You are now subscribed to this activity.'
        );
        onSuccess();
      } else {
        toast.error(result.error || 'Payment failed. Please try again.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
      console.error('Payment error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-2 text-sm text-muted-foreground'>
        <Lock className='h-4 w-4' />
        <span>Your payment information is secure and encrypted</span>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          {/* Contact Information */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Contact Information</h3>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='email'
                      placeholder='john@example.com'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Payment Information */}
          <div className='space-y-4'>
            <div className='flex items-center gap-2'>
              <CreditCard className='h-5 w-5' />
              <h3 className='text-lg font-semibold'>Payment Information</h3>
            </div>

            <FormField
              control={form.control}
              name='cardholderName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cardholder Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='John Doe' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='cardNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='1234 5678 9012 3456'
                      maxLength={19}
                      onChange={e => {
                        const formatted = formatCardNumber(e.target.value);
                        field.onChange(formatted);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='expiryDate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='MM/YY'
                        maxLength={5}
                        onChange={e => {
                          const formatted = formatExpiryDate(e.target.value);
                          field.onChange(formatted);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='cvv'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVV</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='123'
                        maxLength={4}
                        onChange={e => {
                          const value = e.target.value.replace(/[^0-9]/g, '');
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Billing Address */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Billing Address</h3>

            <FormField
              control={form.control}
              name='streetAddress'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='123 Main Street' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='city'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='New York' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='state'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='NY' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='zipCode'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip Code</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='10001' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='country'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='United States' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button
            type='submit'
            className='w-full'
            size='lg'
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Processing Payment...
              </>
            ) : (
              `Pay $${activity.price.toFixed(2)} & Subscribe`
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
