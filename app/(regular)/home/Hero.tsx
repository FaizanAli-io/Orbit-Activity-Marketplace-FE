import React from 'react';

import Button3D from '@/components/app/Button3D';
import Block from '@/app/layout/Block';
import Link from 'next/link';
import H2 from '@/components/ui/typography/H2';

const Hero = () => {
  return (
    <Block className='text-center flex flex-col items-center space-y-5 md:max-w-lg'>
      <H2 className='font-semibold'>
        Discover Events, Connect, And Grow Your Network
      </H2>
      <p>
        Welcome to Orbit, your go-to platform for discovering exciting events
        and expanding your professional network. Join us today to explore,
        register, and manage your experiences effortlessly.
      </p>
      <div className='flex space-x-2'>
        <Button3D>
          <Link href='/explore'>Explore</Link>
        </Button3D>
        <Button3D variant={'outline'}>
          <Link href='/signup'>Sign Up</Link>
        </Button3D>
      </div>
    </Block>
  );
};

export default Hero;
