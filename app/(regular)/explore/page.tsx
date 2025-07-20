import ActivityCard from '@/components/app/ActivityCard';
import React from 'react';
import { data } from './mock-data';
import Block from '@/app/layout/Block';

const Page = () => {
  return (
    <Block className='max-w-6xl mx-auto'>
      <h1 className='font-bold text-2xl'>Explore activities</h1>
      <p className='text-muted-foreground mb-10'>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci
        dolores, praesentium eum ea tenetur tempora.
      </p>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5  auto-rows-fr'>
        {data.map((item, i) => (
          <ActivityCard {...item} key={i} />
        ))}
      </div>
    </Block>
  );
};

export default Page;
