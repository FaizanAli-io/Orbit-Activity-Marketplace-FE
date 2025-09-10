import { getUsers, User } from '@/lib/data/profile/users/get-users';
import FriendCard from '../FriendCard';
import { HTMLAttributes } from 'react';
import { getProfile } from '@/lib/data/profile/get-profile';
import BtnSendReq from './BtnSendReq';
import { getFriends } from '@/lib/data/profile/social/get-friends';
import { getFriendRequests } from '@/lib/data/profile/social/get-friend-requests';

interface SuggestedFriendsListProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * Filters out users who are already friends or have pending friend requests
 */
const filterAvailableUsers = (
  users: User[],
  friends: User[] = [],
  requests: User[] = [],
  currentUserId?: number
): User[] => {
  const friendIds = new Set(friends.map(f => f.id));
  const requestIds = new Set(requests.map(r => r.id));

  return users.filter(user => {
    if (currentUserId && user.id === currentUserId) return false;

    if (friendIds.has(user.id)) return false;

    if (requestIds.has(user.id)) return false;

    return true;
  });
};

/**
 * Randomly selects a specified number of users from the array
 */
const getRandomUsers = (users: User[], count: number = 10): User[] => {
  if (users.length <= count) return users;

  return [...users].sort(() => Math.random() - 0.5).slice(0, count);
};

const SuggestedFriendsList = async ({
  ...props
}: SuggestedFriendsListProps) => {
  try {
    const [
      { data: users, success: usersSuccess },
      { data: friends },
      { data: requests },
      { data: profile },
    ] = await Promise.all([
      getUsers(),
      getFriends(),
      getFriendRequests(),
      getProfile(),
    ]);

    if (!usersSuccess || !users?.length) {
      return (
        <div {...props}>
          <p className='text-gray-500'>No users available at the moment.</p>
        </div>
      );
    }

    const availableUsers = filterAvailableUsers(
      users,
      friends,
      requests,
      profile?.user?.id
    );

    if (availableUsers.length === 0) {
      return (
        <div {...props}>
          <p className='text-gray-500'>No new friend suggestions available.</p>
        </div>
      );
    }

    const suggestedUsers = getRandomUsers(availableUsers, 10);

    return (
      <div {...props}>
        {suggestedUsers.map(user => (
          <FriendCard
            key={user.id}
            btn={<BtnSendReq id={user.id} />}
            {...user}
          />
        ))}
      </div>
    );
  } catch (error) {
    return (
      <div {...props}>
        <p className='text-red-500'>
          Failed to load friend suggestions. Please try again later.
        </p>
      </div>
    );
  }
};

export default SuggestedFriendsList;
