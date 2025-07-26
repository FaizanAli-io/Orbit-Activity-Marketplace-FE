import React, { Suspense } from 'react';

import { verifyEmail } from '../action';
import Block from '@/app/layout/Block';
import Link from 'next/link';
import VerifySkeleton from '../VerifySkeleton';

interface Props {
  params: Promise<{ token: string }>;
}

const Page = async ({ params }: Props) => {
  const { token } = await params;
  const { success } = await verifyEmail(token);

  return (
    <Suspense fallback={<VerifySkeleton />}>
      <Block>
        <div className='space-y-5'>
          <h2 className='text-5xl md:text-7xl font-bold'>
            {success
              ? 'Your email has been verified.'
              : 'Email could not be verified.'}
          </h2>
          <div>
            <p className='text-muted-foreground max-w-5xl text-xl leading-7 md:text-lg md:leading-10'>
              {getText(success)}
            </p>
          </div>
        </div>
      </Block>
    </Suspense>
  );
};

function getText(verified: boolean) {
  if (!verified)
    return (
      <>
        We could not verify your token. It might be invalid or no longer valid.
        Please check your email or request a new verification link.
      </>
    );

  return (
    <>
      Your token has been verified successfully, and your email is now
      confirmed. Please{' '}
      <Link href='/login' className='underline'>
        log in
      </Link>{' '}
      to continue.
    </>
  );
}

export default Page;
