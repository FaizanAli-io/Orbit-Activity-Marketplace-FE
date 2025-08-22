import React from 'react';

import ActivityCard from '@/components/app/ActivityCard/ActivityCard';
import Block from '@/app/layout/Block';
import { getActivities } from '@/lib/data/activities/get-activities';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchInput from '@/components/app/SearchInput';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import Sidebar from '@/app/(regular)/explore/Sidebar';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const Page = async ({ searchParams }: Props) => {
  const { data, error } = await getActivities();

  const { category } = await searchParams;

  const filtered =
    data && category && data.filter(a => a.categoryId === +category);

  const activities = filtered ? filtered : data;

  return (
    <Sheet>
      <Block space={false} className='my-5'>
        <SheetContent side='left'>
          <Sidebar />
        </SheetContent>

        <SearchInput />
        <div className='md:grid md:grid-cols-8 md:gap-x-5'>
          <div className='bg-white rounded-lg shadow-[0px_4px_4px_0px_#00000040] hidden md:block col-span-2'>
            <Sidebar />
          </div>
          <div className='md:col-span-6'>
            <SheetTrigger className='md:hidden flex justify-end w-full my-2'>
              <Button variant={'secondary'} size='icon' className='md:hidden'>
                <Filter />
              </Button>
            </SheetTrigger>
            {error && (
              <p className='text-destructive text-center'>
                Something went wrong
              </p>
            )}

            <Tabs defaultValue='list'>
              <div className='w-full hidden md:flex md:justify-end'>
                <TabsList>
                  <TabsTrigger value='list'>List View</TabsTrigger>
                  <TabsTrigger value='grid'>Grid View</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value='list'>
                {activities && (
                  <div className='space-y-5'>
                    {activities.map((item, i) => (
                      <ActivityCard {...item} key={i} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value='grid'>
                {activities && (
                  <div className='space-y-5 md:grid md:grid-cols-2 md:gap-x-5'>
                    {activities.map((item, i) => (
                      <ActivityCard variant='grid' {...item} key={i} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Block>
    </Sheet>
  );
};

export default Page;
