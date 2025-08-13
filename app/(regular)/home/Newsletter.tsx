import React, { HTMLAttributes } from 'react';

import H5 from '@/components/ui/typography/H5';
import Link from 'next/link';
import NewsletterForm from './NewsletterForm';

const Newsletter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <section className={className} {...props}>
      <div className='md:flex justify-between'>
        <div className='mb-5 md:mb-0'>
          <H5 className='font-semibold'>Subscribe to updates</H5>
          <p>Stay informed about our latest events and offers.</p>
        </div>

        <div className='space-y-2'>
          <NewsletterForm />
          <p className='text-sm'>
            By subscribing you agree to our{' '}
            <Link href='#' className='underline'>
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
