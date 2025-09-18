import FriendCard from '../FriendCard';
import { HTMLAttributes } from 'react';
import BtnSendReq from './BtnSendReq';
import { getSuggestedFriends } from '@/lib/data/profile/social/get-suggested-friends';

const SuggestedFriendsList = async ({
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const { data, success } = await getSuggestedFriends();

  if (!success || !data || !data.data?.length) {
    return (
      <div {...props}>
        <p className='text-gray-500'>No users available at the moment.</p>
      </div>
    );
  }

  return (
    <div {...props}>
      {data.data.map(user => (
        <FriendCard key={user.id} btn={<BtnSendReq id={user.id} />} {...user} />
      ))}
    </div>
  );
};

export default SuggestedFriendsList;
