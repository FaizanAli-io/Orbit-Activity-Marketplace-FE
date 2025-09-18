import { Tabs, TabsTrigger, TabsList, TabsContent } from '@/components/ui/tabs';
import Block from '@/app/layout/Block';
import H2 from '@/components/ui/typography/H2';
import SuggestedFriends from './suggested-friends';
import FriendRequests from './friend-requests';
import AllFriends from './all-friends';
import FriendsSearchForm from './FriendsSearchForm';
import { SimplePageProps, getSearchParam } from '@/lib/types/page-props';

const Page = async ({ searchParams }: SimplePageProps) => {
  // Await the searchParams promise and extract values
  const resolvedSearchParams = await searchParams;
  const name = getSearchParam(resolvedSearchParams, 'name');

  return (
    <Block space={false} className='my-5'>
      <div className='my-10 space-y-2'>
        <H2 className='font-medium md:text-4xl'>Friends</H2>
        <p>Connect with friends and discover events together.</p>
      </div>

      <div className='my-5'>
        <FriendsSearchForm search={name} />
      </div>

      <Tabs defaultValue={'all'}>
        <TabsList className='bg-secondary mb-2'>
          <TabsTrigger value={'all'}>All Friends</TabsTrigger>
          <TabsTrigger value={'requests'}>Requests</TabsTrigger>
          <TabsTrigger value={'suggestions'}>Suggestions</TabsTrigger>
        </TabsList>
        <TabsContent value={'all'}>
          <AllFriends searchQuery={name} />
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
