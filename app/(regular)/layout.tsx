import React, { Suspense } from 'react';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import NavSkeleton from './layout/Navbar/NavSkeleton';

type Props = Readonly<{ children: React.ReactNode }>;

export default function Layout({ children }: Props) {
  return (
    <>
      <Suspense fallback={<NavSkeleton />}>
        <Navbar />
      </Suspense>
      {children}
      <Footer />
    </>
  );
}
