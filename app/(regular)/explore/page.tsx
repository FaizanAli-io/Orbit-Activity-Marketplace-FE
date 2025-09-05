// src/app/your-route/page.tsx

import React, { Suspense } from 'react';

import Block from '@/app/layout/Block';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Sidebar from '@/app/(regular)/explore/Sidebar';
import EventsList from '@/app/(regular)/explore/EventsList';
import EventsListSkeleton from '@/app/(regular)/explore/EventsListSkeleton';
import SearchForm from './SearchForm';
import {
  SimplePageProps,
  getSearchParam,
  createSearchKey,
} from '@/lib/types/page-props';

const Page = async ({ searchParams }: SimplePageProps) => {
  // Await the searchParams promise and extract values
  const resolvedSearchParams = await searchParams;
  const name = getSearchParam(resolvedSearchParams, 'name');
  const category = getSearchParam(resolvedSearchParams, 'category');
  const minPrice = getSearchParam(resolvedSearchParams, 'minPrice');
  const maxPrice = getSearchParam(resolvedSearchParams, 'maxPrice');
  const page = getSearchParam(resolvedSearchParams, 'page');

  return (
    <Sheet>
      <Block space={false} className='my-5'>
        {/* This part can now render immediately */}
        <SheetContent side='left'>
          <Sidebar />
        </SheetContent>

        <div className='my-5'>
          <SearchForm search={name} />
        </div>

        <div className='md:grid md:grid-cols-8 md:gap-x-5'>
          <div className='mt-12 max-h-min bg-white rounded-lg shadow-[0px_4px_4px_0px_#00000040] hidden md:block col-span-2 pb-5'>
            <Sidebar />
          </div>
          <div className='md:col-span-6'>
            <SheetTrigger className='md:hidden flex justify-end w-full my-2'>
              <Button variant={'secondary'} size='icon' className='md:hidden'>
                <Filter />
              </Button>
            </SheetTrigger>
            {/* Suspense will now work correctly, showing the skeleton immediately */}
            <Suspense
              key={createSearchKey(name, category, minPrice, maxPrice, page)}
              fallback={<EventsListSkeleton />}
            >
              <EventsList
                name={name}
                categoryId={category}
                minPrice={minPrice}
                maxPrice={maxPrice}
                page={page}
              />
            </Suspense>
          </div>
        </div>
      </Block>
    </Sheet>
  );
};

export default Page;
