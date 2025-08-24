import React from 'react';

import Button3D from '@/components/app/Button3D';
import Block from '@/app/layout/Block';
import Link from 'next/link';
import H2 from '@/components/ui/typography/H2';
import HeroButtons from './HeroButtons';

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
      <HeroButtons />
    </Block>
  );
};

export default Hero;
