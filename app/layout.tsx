import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';
import { Outfit, Work_Sans } from 'next/font/google';

import './globals.css';
import ReactQueryProvider from '@/lib/providers/react-query-provider';

const outfit = Outfit({
  subsets: ['latin'], // required
  variable: '--font-outfit',
});

const workSans = Work_Sans({
  subsets: ['latin'], // required
  variable: '--font-work',
});

export const metadata: Metadata = {
  title: 'Orbit - Activity Marketplace',
  description: 'Orbit where you find the activity you love.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toaster
          position='top-center'
          toastOptions={{
            duration: 3000,
          }}
        />
      </body>
    </html>
  );
}
