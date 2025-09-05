import React, { Suspense } from 'react';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';

type Props = Readonly<{ children: React.ReactNode }>;

export default function Layout({ children }: Props) {
  return (
    <>
      <Suspense fallback={'loading...'}>
        <Navbar />
      </Suspense>
      {children}
      <Footer />
    </>
  );
}
