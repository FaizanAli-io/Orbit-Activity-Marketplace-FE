import H2 from '@/components/ui/typography/H2';
import Link from 'next/link';
import Image from 'next/image';
import SignupForm from './user/SignupForm';

export default function Page() {
  return (
    <div className='min-h-screen w-full p-6 md:p-0 flex items-center justify-center md:grid grid-cols-2'>
      <Image
        src='/images/auth/placeholder.png'
        alt='placeholder'
        width='1024'
        height='768'
        className='object-cover w-full h-full hidden md:block order-1'
      />

      <div className='w-full max-w-sm md:max-w-md md:mx-auto'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col items-center text-center'>
            <H2 className='font-normal'>Create Account</H2>
            <p className='text-sm'>
              Already have an account?{' '}
              <Link href='/login' className='font-semibold underline'>
                Login
              </Link>
            </p>
          </div>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
