import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';

import './globals.css';
import ReactQueryProvider from '@/lib/providers/react-query-provider';

export const metadata: Metadata = {
  title: 'Orbit',
  description: 'Orbit platform.',
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
        <Toaster position='top-center' />
      </body>
    </html>
  );
}
