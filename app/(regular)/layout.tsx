import React from 'react';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';

type Props = Readonly<{ children: React.ReactNode }>;

export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
