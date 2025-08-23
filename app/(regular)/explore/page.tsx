import React, { Suspense } from 'react';

import Block from '@/app/layout/Block';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchInput from '@/components/app/SearchInput';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Sidebar from '@/app/(regular)/explore/Sidebar';
import EventsList from '@/app/profile/events/EventsList';
import EventsListSkeleton from '@/app/profile/events/EventsListSkeleton';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const Page = async ({ searchParams }: Props) => {
  return (
    <Sheet>
      <Block space={false} className='my-5'>
        <SheetContent side='left'>
          <Sidebar />
        </SheetContent>

        <SearchInput />
        <div className='md:grid md:grid-cols-8 md:gap-x-5'>
          <div className='mt-12 bg-white rounded-lg shadow-[0px_4px_4px_0px_#00000040] hidden md:block col-span-2'>
            <Sidebar />
          </div>
          <div className='md:col-span-6'>
            <SheetTrigger className='md:hidden flex justify-end w-full my-2'>
              <Button variant={'secondary'} size='icon' className='md:hidden'>
                <Filter />
              </Button>
            </SheetTrigger>
            <Suspense fallback={<EventsListSkeleton />}>
              <EventsList />
            </Suspense>
          </div>
        </div>
      </Block>
    </Sheet>
  );
};

export default Page;
