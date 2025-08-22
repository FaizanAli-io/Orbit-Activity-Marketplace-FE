import React from 'react';
import FriendCard from './FriendCard';
import H4 from '@/components/ui/typography/H4';

const SuggestedFriends = () => {
  return (
    <div className='bg-white p-5 rounded-lg shadow-theme'>
      <div className='mb-5'>
        <H4 className='font-medium md:text-2xl'>Suggested Friends</H4>
        <p className='md:text-sm'>People you may know.</p>
      </div>
      <div className='space-y-3'>
        {new Array(5).fill(null).map((_, i) => (
          <FriendCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default SuggestedFriends;
