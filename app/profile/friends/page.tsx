import { Tabs, TabsTrigger, TabsList, TabsContent } from '@/components/ui/tabs';
import AllFriends from './AllFriends';
import Block from '@/app/layout/Block';
import H2 from '@/components/ui/typography/H2';
import SuggestedFriends from './suggested-friends';
import FriendRequests from './friend-requests';

const Page = () => {
  return (
    <Block>
      <div className='my-10 space-y-2'>
        <H2 className='font-medium md:text-4xl'>Friends</H2>
        <p>Connect with friends and discover events together.</p>
      </div>
      <Tabs defaultValue={'requests'}>
        <TabsList className='bg-secondary mb-2'>
          <TabsTrigger value={'all'}>All Friends</TabsTrigger>
          <TabsTrigger value={'requests'}>Requests</TabsTrigger>
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
