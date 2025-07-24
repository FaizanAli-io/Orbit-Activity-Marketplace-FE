import React from 'react';

import { Tabs, TabsTrigger, TabsList, TabsContent } from '@/components/ui/tabs';
import MyFriends from './MyFriends';
import FindFriends from './FindFriends';
import FriendRequests from './FriendRequests';

const myFriends = 'my-friends';
const findFriends = 'find-friends';
const friendRequests = 'friend-requests';

const Page = () => {
  return (
    <div>
      <Tabs defaultValue={myFriends}>
        <TabsList>
          <TabsTrigger value={myFriends}>My Friends</TabsTrigger>
          <TabsTrigger value={friendRequests}>Friend Requests</TabsTrigger>
          <TabsTrigger value={findFriends}>Find Friends</TabsTrigger>
        </TabsList>
        <TabsContent value={myFriends}>
          <MyFriends />
        </TabsContent>
        <TabsContent value={findFriends}>
          <FindFriends />
        </TabsContent>
        <TabsContent value={friendRequests}>
          <FriendRequests />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
