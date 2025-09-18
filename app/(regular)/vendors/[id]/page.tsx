import Block from '@/app/layout/Block';
import VendorEventsList from '../VendorEventList';
import { Suspense } from 'react';
import EventListSkeleton from '@/app/profile/dashboard/EventListSkeleton';
import { Skeleton } from '@/components/ui/skeleton';
import VendorHeader from '../VendorHeader';

interface Props {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: Props) => {
  const { id } = await params;

  return (
    <Block>
      <Suspense
        fallback={
          <div className='space-y-2'>
            <Skeleton className='h-10 w-sm' />
            <Skeleton className='h-6 w-2xs' />
          </div>
        }
      >
        <VendorHeader vendorId={+id} />
      </Suspense>
      <div></div>
      <Suspense fallback={<EventListSkeleton />}>
        <VendorEventsList vendorId={id} />
      </Suspense>
    </Block>
  );
};

export default Page;
