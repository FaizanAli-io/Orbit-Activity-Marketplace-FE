import FriendCard from '../FriendCard';
import { HTMLAttributes } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getFriends } from '@/lib/data/profile/social/get-friends';

const AllFriendsList = async ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  const { data: friends, success } = await getFriends();

  if (!success || !friends?.length) return <div>No Friend Found.</div>;

  return (
    <div {...props}>
      {friends.map(u => (
        <FriendCard
          btn={
            <Button variant={'secondary'}>
              <Link href={`/profile/friends/${u.id}`}>
                Find events together
              </Link>
            </Button>
          }
          key={u.id}
          {...u}
        />
      ))}
    </div>
  );
};

export default AllFriendsList;
