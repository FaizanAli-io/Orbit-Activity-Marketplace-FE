import React from 'react';
import FriendCard from './FriendCard';
import { Plus } from 'lucide-react';

const FindFriends = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5  auto-rows-fr'>
      {new Array(5).fill(null).map((_, i) => (
        <FriendCard
          key={i}
          buttonText={
            <>
              Add
              <Plus />
            </>
          }
        />
      ))}
    </div>
  );
};

export default FindFriends;
