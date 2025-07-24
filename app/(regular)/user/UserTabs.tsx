import React from 'react';

import { Tabs, TabsTrigger, TabsContent, TabsList } from '@/components/ui/tabs';
import SubscribedActivities from './SubscribedActivites';
import LikedActivities from './LikedActivities';
import FindFriends from '@/app/me/profile/friends/FindFriends';

const friends = 'friends';
const likedActivities = 'liked-activities';
const subscribedActivities = 'subscribed-activities';

const triggerClass =
  'data-[state=active]:shadow-none data-[state=active]:underline underline-offset-12 px-0 cursor-pointer';

const contentClass = '-mx-4 px-0';

const UserTabs = () => {
  return (
    <Tabs defaultValue={subscribedActivities}>
      <TabsList className='bg-white border-b w-full border-gray-300 rounded-none space-x-5 mb-5 block '>
        <TabsTrigger value={subscribedActivities} className={triggerClass}>
          Subscribed Activities
        </TabsTrigger>
        <TabsTrigger value={likedActivities} className={triggerClass}>
          Liked Activities
        </TabsTrigger>
        <TabsTrigger value={friends} className={triggerClass}>
          Friends
        </TabsTrigger>
      </TabsList>
      <TabsContent value={subscribedActivities} className={contentClass}>
        <SubscribedActivities />
      </TabsContent>
      <TabsContent value={likedActivities} className={contentClass}>
        <LikedActivities />
      </TabsContent>
      <TabsContent value={friends} className={contentClass}>
        <FindFriends />
      </TabsContent>
    </Tabs>
  );
};

export default UserTabs;
