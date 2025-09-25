import React from 'react';

import H2 from '@/components/ui/typography/H2';
import HeroButtons from './HeroButtons';
import H1 from '@/components/ui/typography/H1';

const Hero = () => {
  return (
    <div className='h-screen grid place-content-center'>
      <div className='text-center -translate-y-[30%] flex flex-col items-center space-y-5 md:max-w-xl'>
        <H2 className='font-semibold md:text-6xl'>
          Discover Events, Connect, And Grow Your Network
        </H2>
        <p className='text-lg'>
          Welcome to Orbit, your go-to platform for discovering exciting events
          and expanding your professional network. Join us today to explore,
          register, and manage your experiences effortlessly.
        </p>
        <HeroButtons />
      </div>
    </div>
  );
};

export default Hero;
