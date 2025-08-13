import Block from '@/app/layout/Block';
import Button3D from '@/components/app/Button3D';
import { Button } from '@/components/ui/button';
import H3 from '@/components/ui/typography/H3';
import Tagline from '@/components/ui/typography/Tagline';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const Oppurtunities = () => {
  return (
    <section>
      <Block className='md:grid md:grid-cols-2 md:gap-x-5'>
        <div className='md:self-center space-y-5'>
          <Tagline className='font-semibold'>Explore</Tagline>
          <H3 className='font-semibold mb-2'>
            Unlock New Opportunities with Orbit
          </H3>
          <p>
            Orbit connects you with exciting events and like-minded individuals.
            Whether you're attending or hosting, our platform simplifies the
            experience.
          </p>
          <div className='py-5 space-y-3 md:space-y-0 md:grid md:grid-cols-2'>
            <article className='space-y-2'>
              <img className='w-10' src='/icons/interests.svg' />
              <Tagline className='font-semibold'>For Attendees</Tagline>
              <p>
                Discover events tailored to your interests and expand your
                network effortlessly.
              </p>
            </article>

            <article className='space-y-2'>
              <img className='w-10' src='/icons/event_available.svg' />
              <Tagline className='font-semibold'>For Vendors</Tagline>
              <p>
                Easily manage and promote your events to reach a wider audience.
              </p>
            </article>
          </div>
          <div className='flex  space-2'>
            <Button3D variant={'outline'}>Join</Button3D>
            <Button variant={'ghost'}>
              <span className='flex items-center'>
                Learn More <ChevronRight className='ml-2' size='20' />
              </span>
            </Button>
          </div>
        </div>

        <Image
          className='hidden md:block object-cover w-full h-full'
          src='/images/home/oppurtunities/placeholder.png'
          alt={'Girl in a suite sitting on a chair.'}
          width={'500'}
          height={'500'}
          objectFit='cover'
        />
      </Block>
    </section>
  );
};

export default Oppurtunities;
