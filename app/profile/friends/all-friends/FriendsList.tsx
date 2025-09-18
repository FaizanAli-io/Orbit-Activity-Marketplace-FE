import FriendCard from '../FriendCard';
import { HTMLAttributes } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getFriends } from '@/lib/data/profile/social/get-friends';
import { getFriendRequests } from '@/lib/data/profile/social/get-friend-requests';
import { getUsers, User } from '@/lib/data/profile/users/get-users';

interface Props extends HTMLAttributes<HTMLDivElement> {
  searchQuery?: string;
}

const AllFriendsList = async ({ searchQuery, ...props }: Props) => {
  let friends;
  let success;

  if (searchQuery) {
    // Use getUsers for search functionality
    const result = await getUsers(searchQuery);
    success = result.success;
    // getUsers returns Response with data property containing User[]
    friends = result.success && result.data?.data ? result.data.data : [];
  } else {
    // Use getFriends for normal listing
    const result = await getFriends();
    success = result.success;
    // getFriends returns User[] directly
    friends = result.success && result.data ? result.data : [];
  }

  if (!success || !friends?.length) {
    return (
      <div>
        {searchQuery
          ? `No friends found matching "${searchQuery}".`
          : 'No friends found.'}
      </div>
    );
  }

  return (
    <div {...props}>
      {friends.map((u: User) => (
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
