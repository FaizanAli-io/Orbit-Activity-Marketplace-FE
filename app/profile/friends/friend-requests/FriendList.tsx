import FriendCard from '../FriendCard';
import { HTMLAttributes } from 'react';
import BtnAcceptReq from './BtnAcceptReq';
import { getFriendRequests } from '@/lib/data/profile/social/get-friend-requests';

const FriendReqList = async ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  const { data: requests, success } = await getFriendRequests();

  if (!success || !requests?.length) return <div>No Request Found.</div>;

  return (
    <div {...props}>
      {requests.map(u => (
        <FriendCard btn={<BtnAcceptReq id={u.id} />} key={u.id} {...u} />
      ))}
    </div>
  );
};

export default FriendReqList;
