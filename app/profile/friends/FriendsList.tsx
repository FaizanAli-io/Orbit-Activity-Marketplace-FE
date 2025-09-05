import { getUsers } from '@/lib/data/profile/users/get-users';
import FriendCard from './FriendCard';
import { HTMLAttributes } from 'react';
import { Button } from '@/components/ui/button';
import BtnSendReq from './btnSendReq';
import { getProfile } from '@/lib/data/profile/get-profile';

const FriendsList = async ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  const { data: users, success } = await getUsers();
  const { data: profile } = await getProfile();

  if (!success || !users?.length) return <div>No Users Found.</div>;

  const randomUsers = [...users]
    .sort(() => Math.random() - 0.5)
    .slice(0, 10)
    .filter(u => u.id !== profile?.user.id);

  return (
    <div {...props}>
      {randomUsers.map(u => (
        <FriendCard btn={<BtnSendReq id={u.id} />} key={u.id} {...u} />
      ))}
    </div>
  );
};

export default FriendsList;
