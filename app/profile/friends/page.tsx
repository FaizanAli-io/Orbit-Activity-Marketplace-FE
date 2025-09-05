import React from 'react';

import { Tabs, TabsTrigger, TabsList, TabsContent } from '@/components/ui/tabs';
import AllFriends from './AllFriends';
import SuggestedFriends from './SuggestedFriends';
import FriendRequests from './FriendRequests';
import Block from '@/app/layout/Block';
import H2 from '@/components/ui/typography/H2';
import SearchInput from '@/components/app/SearchInput';

const Page = () => {
  return (
    <Block>
      <div className='my-10 space-y-2'>
        <H2 className='font-medium md:text-4xl'>Friends</H2>
        <p>Connect with friends and discover events together.</p>
      </div>
      <SearchInput />
      <Tabs defaultValue={'suggestions'}>
        <TabsList className='bg-secondary mb-2'>
          <TabsTrigger value={'all'}>All Friends (3)</TabsTrigger>
          <TabsTrigger value={'requests'}>Requests (2)</TabsTrigger>
          <TabsTrigger value={'suggestions'}>Suggestions</TabsTrigger>
        </TabsList>
        <TabsContent value={'all'}>
          <AllFriends />
        </TabsContent>
        <TabsContent value={'requests'}>
          <FriendRequests />
        </TabsContent>
        <TabsContent value={'suggestions'}>
          <SuggestedFriends />
        </TabsContent>
      </Tabs>
    </Block>
  );
};

export default Page;
