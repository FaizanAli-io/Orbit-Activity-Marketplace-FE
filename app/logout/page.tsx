'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from './action';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    logout().finally(() => router.replace('/'));
  }, []);

  return <>logging out...</>;
};

export default Page;
