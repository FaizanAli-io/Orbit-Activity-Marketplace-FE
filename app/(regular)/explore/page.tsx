import React from 'react';

import ActivityCard from '@/components/app/ActivityCard/ActivityCard';
import Block from '@/app/layout/Block';
import { getActivities } from '@/lib/data/activities/get-activities';

const Page = async () => {
  const { data, error } = await getActivities();

  return (
    <Block pad>
      <h1 className='font-bold text-2xl'>Explore activities</h1>
      <p className='text-muted-foreground mb-10'>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci
        dolores, praesentium eum ea tenetur tempora.
      </p>
      {error && (
        <p className='text-destructive text-center'>Something went wrong</p>
      )}
      {data && (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5  auto-rows-fr'>
          {data.map((item, i) => (
            <ActivityCard {...item} key={i} />
          ))}
        </div>
      )}
    </Block>
  );
};

export default Page;
