import Button3D from '@/components/app/Button3D';
import { Button } from '@/components/ui/button';
import H4 from '@/components/ui/typography/H4';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const CTA = () => {
  return (
    <section className='px-5 md:py-20 grid place-content-center text-center space-y-5 md:bg-theme-secondary'>
      <H4>Join Us and Explore Events</H4>
      <p>
        Sign up or log in to discover exciting events and connect with
        like-minded individuals today!
      </p>

      <div className='flex  justify-center space-2'>
        <Button3D>
          <Link href='#'>Join</Link>
        </Button3D>
        <Button variant={'ghost'}>
          <Link href='#' className='flex items-center'>
            Learn More <ChevronRight className='ml-2' size='20' />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default CTA;
