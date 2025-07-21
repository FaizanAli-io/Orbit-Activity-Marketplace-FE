import React from 'react';

import { MapPin, Clock3Icon, Users2Icon, StarIcon } from 'lucide-react';

const Overview = () => {
  return (
    <>
      <h1 className='font-bold text-4xl mb-3'>Mountain Hiking Adventure</h1>
      <div className='flex items-center space-x-7 text-muted-foreground'>
        <p className='flex items-center space-x-1'>
          <MapPin size='20' /> <span>Downtown</span>
        </p>
        <p className='flex items-center space-x-1'>
          <Clock3Icon size='17' /> <span>2 Hours</span>
        </p>
        <p className='flex items-center space-x-1'>
          <Users2Icon size='17' /> <span>8/15</span>
        </p>

        <p className='flex text-muted-foreground items-center space-x-1'>
          <StarIcon size='17' fill='#eab308' stroke='#eab308' />
          <span>4/5 (125 Reviews)</span>
        </p>
      </div>
    </>
  );
};

export default Overview;
