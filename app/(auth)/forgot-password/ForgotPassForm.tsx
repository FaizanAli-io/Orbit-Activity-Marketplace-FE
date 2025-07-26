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
import { requestToken } from './form-action';
import { useState } from 'react';
import { toast } from 'sonner';

const schema = z.object({ email: z.email() });

export function ForgotPassForm() {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    setLoading(true);

    const { success } = await requestToken(values);
    if (success) {
      form.reset();
      toast.success('We have sent you an email');
    } else toast.error('Something went wrong. Please try again later');

    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-6'>
          <div className='grid gap-3'>
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
          </div>
          <div className='flex flex-col gap-3'>
            <Button
              type='submit'
              className='w-full cursor-pointer'
              disabled={loading}
            >
              Send Link
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
