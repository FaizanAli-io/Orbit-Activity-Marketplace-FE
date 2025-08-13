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
import { VendorSchema } from './vendor-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import z from 'zod';
import { useState } from 'react';
import { signupVendor } from './action';
import { toast } from 'sonner';
import { signInWithPopup } from 'firebase/auth';
import { signupWithFirebase } from '../firebase-action';
import { firebaseAuth, googleProvider } from '@/lib/data/firebase';
import { useRouter } from 'next/navigation';
import LoadingButton from '@/components/app/LoadingButton';
import LabeledSeparator from '@/components/ui/labeled-separator';

export function VendorForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof VendorSchema>>({
    resolver: zodResolver(VendorSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof VendorSchema>) {
    setLoading(true);

    const { success, error } = await signupVendor(values);

    if (!success) {
      toast.success('Verification email sent.');
      form.reset();
    } else toast.error(error);

    setLoading(false);
  }

  async function handleGoogleSignup() {
    setGoogleLoading(true);
    try {
      const { user } = await signInWithPopup(firebaseAuth, googleProvider);

      const { success, error } = await signupWithFirebase({
        email: user.email!,
        name: user.displayName!,
        firebaseId: user.uid,
        type: 'USER',
      });

      if (success) {
        toast.success('Login successful');
        router.replace('/me/profile');
      } else {
        toast.error(error, { richColors: true });
        setGoogleLoading(false);
      }
    } catch {
      toast.error('Something went wrong', { richColors: true });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-4 md:gap-6'>
          <div className='grid gap-3'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='John Smith' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='grid gap-3'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='m@example.com' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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

          <div className='grid gap-3'>
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <LoadingButton
            type='submit'
            className='w-full cursor-pointer '
            disabled={loading || googleLoading}
            loading={loading}
            variant={'accent'}
          >
            Signup
          </LoadingButton>

          <LabeledSeparator>or Continue with</LabeledSeparator>

          <div className='flex space-x-2'>
            <LoadingButton
              type='button'
              variant='outline-accent'
              className='flex-1 cursor-pointer'
              onClick={handleGoogleSignup}
              disabled={loading || googleLoading}
              loading={googleLoading}
            >
              <img src='/icons/google.svg' className='size-4' />
            </LoadingButton>

            <LoadingButton
              type='button'
              variant='outline-accent'
              className='flex-1 cursor-pointer'
              // onClick={handleGoogleLogin}
              disabled={loading || googleLoading}
              // loading={googleLoading}
            >
              <img src='/icons/apple.svg' className='size-4' />
            </LoadingButton>
          </div>
        </div>
        <div className='mt-4 text-center text-sm'>
          Already have an account?{' '}
          <Link href='/login' className='underline underline-offset-4'>
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
}
