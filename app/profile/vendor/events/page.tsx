import React, { Suspense } from 'react';
import ActivitiesList from './ActivitiesList';
import Block from '@/app/layout/Block';
import ActivityListSkeleton from '../activities/ActivityListSkeleton';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const Page = () => {
  return (
    <Block>
      <div className='flex mb-5'>
        <Link href='/profile/vendor/activities/basic-details'>
          <Button>
            <Plus /> Add Event
          </Button>
        </Link>
      </div>
      <Suspense fallback={<ActivityListSkeleton />}>
        <ActivitiesList />
      </Suspense>
    </Block>
  );
};

export default Page;
