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

const schema = z.object({
  password: z
    .string()
    .min(5, 'must be atleast 5 character long')
    .max(50, 'cannot exceed 50 chars')
    .regex(/[A-Z]/, 'must contain atleast one uppercase character')
    .regex(/[a-z]/, 'must contain atleast one lowercase character'),
});

export function ResetPassForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-6'>
          <div className='grid gap-3'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex flex-col gap-3'>
            <Button type='submit' className='w-full cursor-pointer'>
              Reset Password
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
