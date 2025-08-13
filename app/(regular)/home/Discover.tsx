import React from 'react';

import Block from '@/app/layout/Block';
import DiscoverCard from './DiscoverCard';
import H4 from '@/components/ui/typography/H4';
import { discoverCardsData } from './discover-cards-data';

const Discover = () => {
  return (
    <section className='md:bg-theme-secondary md:py-1 md:my-20'>
      <Block>
        <div className='mb-5 md:mb-15 md:flex'>
          <H4 className='font-semibold mb-2'>
            Discover Exciting Events and Seamlessly Connect with Your Network
          </H4>
          <p className='md:mt-2'>
            With Orbit, finding the perfect event has never been easier. Our
            intuitive platform allows you to explore a diverse range of events
            tailored to your interests. Join a community of like-minded
            individuals and expand your network effortlessly.
          </p>
        </div>

        <div className='space-y-12 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-5'>
          {discoverCardsData.map((card, i) => (
            <DiscoverCard {...card} key={i} />
          ))}
        </div>
      </Block>
    </section>
  );
};

export default Discover;
