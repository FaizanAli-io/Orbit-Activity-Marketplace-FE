import SuggestedFriendsList from './FriendsList';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import H4 from '@/components/ui/typography/H4';

const SuggestedFriends = () => {
  return (
    <div className='bg-white p-5 rounded-lg shadow-theme'>
      <div className='mb-5'>
        <H4 className='font-medium md:text-2xl'>Suggested Friends</H4>
        <p className='md:text-sm'>People you may know.</p>
      </div>
      <Suspense
        fallback={
          <div className='flex justify-center items-center'>
            <Loader2 size='20' className='animate-spin' />
          </div>
        }
      >
        <SuggestedFriendsList />
      </Suspense>
    </div>
  );
};

export default SuggestedFriends;
