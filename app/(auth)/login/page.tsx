import H2 from '@/components/ui/typography/H2';
import { LoginForm } from './LoginForm';
import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
  return (
    <div className='min-h-screen w-full p-6 md:p-0 flex justify-center md:grid grid-cols-2'>
      <Image
        src='/images/auth/placeholder.png'
        alt='placeholder'
        width='1024'
        height='768'
        className='object-cover w-full h-full hidden md:block order-1'
      />

      <div className='w-full max-w-sm md:max-w-md md:mx-auto'>
        <div className='flex flex-col gap-6 mt-45'>
          <div className='flex flex-col text-center'>
            <H2 className='font-medium md:text-4xl'>Welcome to Orbit</H2>
            <p className='text-sm'>
              Don't have an account?{' '}
              <Link href='signup' className='font-semibold underline'>
                Sign Up
              </Link>
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
