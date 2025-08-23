'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from './action';
import { Loader2 } from 'lucide-react';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    logout().finally(() => router.replace('/'));
  }, []);

  return (
    <div className='h-screen w-full grid place-content-center'>
      <Loader2 className='mr-2 h-20 w-20 animate-spin text-primary' />
    </div>
  );
};

export default Page;
