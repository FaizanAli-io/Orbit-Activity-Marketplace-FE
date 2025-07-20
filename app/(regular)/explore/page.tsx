import ActivityCard from '@/components/app/ActivityCard';
import React from 'react';
import { data } from './mock-data';

const Page = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-6xl mx-auto auto-rows-fr'>
      {data.map((item, i) => (
        <ActivityCard {...item} key={i} />
      ))}
    </div>
  );
};

export default Page;
