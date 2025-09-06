'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { PaymentFormSchema } from './schema';
import { formatCardNumber, formatExpiryDate } from './formatters';
import { ReactNode } from 'react';

interface Props {
  submitButton?: ReactNode;
}

export function PaymentForm({ submitButton }: Props) {
  const form = useForm<z.infer<typeof PaymentFormSchema>>({
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

  function onSubmit(values: z.infer<typeof PaymentFormSchema>) {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-6'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='m@example.com' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <h2 className='text-lg font-semibold'>Payment Information</h2>
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
                    onChange={e => {
                      const formatted = formatCardNumber(e.target.value);
                      field.onChange(formatted);
                    }}
                    placeholder='1234 5678 9012 3456'
                    maxLength={19}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-2 space-x-2'>
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
                    <Input {...field} placeholder='123' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <h2 className='text-lg font-semibold'>Billing Address</h2>
          <div className='grid gap-3'>
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
          </div>
          <div className='grid grid-cols-2 space-x-2'>
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
          <div className='grid grid-cols-2 space-x-2'>
            <FormField
              control={form.control}
              name='zipCode'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ZIP Code</FormLabel>
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
          {submitButton ? (
            submitButton
          ) : (
            <div className='flex flex-col gap-3'>
              <Button type='submit' className='w-full cursor-pointer'>
                Complete Payment
              </Button>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
}
