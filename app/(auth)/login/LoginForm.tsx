'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { login } from './form-action';
import { LoginSchema } from './login-schema';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { signInWithPopup } from 'firebase/auth';
import { firebaseAuth, googleProvider } from '@/lib/data/firebase';
import z from 'zod';
import LoadingButton from '@/components/app/LoadingButton';
import { loginWithFirebase } from './firebase-action';
import LabeledSeparator from '@/components/ui/labeled-separator';

export function LoginForm() {
  const [loading, setloading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    setloading(true);

    const { success, error } = await login(values);
    if (success) {
      router.replace('/');
    } else {
      toast.error(error);
      setloading(false);
    }
  }

  async function handleGoogleLogin() {
    setGoogleLoading(true);
    try {
      const { user } = await signInWithPopup(firebaseAuth, googleProvider);

      const { success, error } = await loginWithFirebase({
        email: user.email!,
        firebaseId: user.uid,
      });

      if (success) {
        toast.success('Login successful');
        router.replace('/');
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
          <div className='grid gap-3'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <div className='flex items-center'>
                    <FormLabel>Password</FormLabel>
                    <Link
                      href='/forgot-password'
                      className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input {...field} type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex flex-col gap-3'>
            <LoadingButton
              type='submit'
              className='w-full cursor-pointer '
              disabled={loading || googleLoading}
              loading={loading}
              variant={'accent'}
            >
              Login
            </LoadingButton>

            <LabeledSeparator className='my-5'>
              or Continue with
            </LabeledSeparator>

            <LoadingButton
              type='button'
              variant='outline-accent'
              className='flex-1 cursor-pointer min-h-8'
              onClick={handleGoogleLogin}
              disabled={loading || googleLoading}
              loading={googleLoading}
            >
              <img src='/icons/google.svg' className='size-4' />
            </LoadingButton>
          </div>
        </div>
        <div className='mt-4 text-center text-xs text-neutral-light'>
          By Clicking continue you agree with our{' '}
          <Link className='underline' href='#'>
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link className='underline' href='#'>
            Privacy Policy
          </Link>
        </div>
      </form>
    </Form>
  );
}
