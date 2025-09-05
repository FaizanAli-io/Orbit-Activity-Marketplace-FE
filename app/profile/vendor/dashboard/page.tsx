import Block from '@/app/layout/Block';
import Header from '../../dashboard/header';
import HeaderCard from '../../dashboard/header/HeaderCard';
import ActivityListSkeleton from '../activities/ActivityListSkeleton';
import ActivitiesList from '../events/ActivitiesList';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Page = () => {
  return (
    <div>
      <Block space={false}>
        <div className='my-10 md:grid md:grid-cols-7 md:gap-x-5'>
          <div className='md:col-span-5 space-y-10'>
            <div>
              <Header text='This seems like a good day to create a new event.' />
            </div>
          </div>
          <div className='md:col-span-2'>
            <HeaderCard />
          </div>
        </div>

        <div className='mb-10'>
          <Suspense fallback={<ActivityListSkeleton />}>
            <ActivitiesList limit={4} />
            <div className='my-5 flex justify-center items-center'>
              <Button variant={'secondary'} className='min-w-44'>
                <Link href='/profile/vendor/events'>View All</Link>
              </Button>
            </div>
          </Suspense>
        </div>
      </Block>
    </div>
  );
};

export default Page;
