import React from 'react';

import ActivityCard from '@/components/app/ActivityCard/ActivityCard';

const Page = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5  auto-rows-fr mx-2 md:mx-5'>
      {/* {data.map((item, i) => (
        <ActivityCard {...item} key={i} />
      ))} */}
    </div>
  );
};

export default Page;
