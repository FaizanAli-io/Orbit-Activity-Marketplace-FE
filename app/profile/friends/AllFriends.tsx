import React from 'react';
import FriendCard from './FriendCard';
import H4 from '@/components/ui/typography/H4';

const AllFriends = () => {
  return (
    <div className='bg-white p-5 rounded-lg shadow-theme'>
      <div className='mb-5'>
        <H4 className='font-medium md:text-2xl'>Your Friends</H4>
        <p className='md:text-sm'>People you're connected with on Orbit</p>
      </div>
      <div className='space-y-3'>
        {new Array(5).fill(null).map((_, i) => (
          <FriendCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default AllFriends;
