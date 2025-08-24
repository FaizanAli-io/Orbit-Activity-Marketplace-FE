import React from 'react';
import Navbar from './navbar';
type Props = Readonly<{ children: React.ReactNode }>;

export default function Layout({ children }: Props) {
  return (
    <>
      <header className='shadow-theme'>
        <Navbar />
      </header>
      {children}
    </>
  );
}
