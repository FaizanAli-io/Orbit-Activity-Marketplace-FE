import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import H4 from '@/components/ui/typography/H4';
import FriendReqList from './FriendList';

const FriendRequests = () => {
  return (
    <div className='bg-white p-5 rounded-lg shadow-theme'>
      <div className='mb-5'>
        <H4 className='font-medium md:text-2xl'>Friend Requests</H4>
        <p className='md:text-sm'>People who wants to connect with you.</p>
      </div>
      <Suspense
        fallback={
          <div className='flex justify-center items-center'>
            <Loader2 size='20' className='animate-spin' />
          </div>
        }
      >
        <FriendReqList />
      </Suspense>
    </div>
  );
};

export default FriendRequests;
