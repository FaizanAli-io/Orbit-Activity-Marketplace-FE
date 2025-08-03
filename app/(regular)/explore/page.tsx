import React from 'react';

import ActivityCard from '@/components/app/ActivityCard/ActivityCard';
import Block from '@/app/layout/Block';
import { getActivities } from '@/lib/data/activities/get-activities';
import Sidebar from './Sidebar';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <Drawer>
      <DrawerContent>
        <Sidebar />
      </DrawerContent>

      <div className='md:grid md:grid-cols-5'>
        <Block pad={false} className='hidden md:block'>
          <Sidebar />
        </Block>
        <Block pad className='md:col-span-4'>
          <div className='flex justify-between md:block mb-2'>
            <h1 className='font-bold text-2xl'>
              {activities && activities.length
                ? 'Explore activities'
                : 'No Activities Found'}
            </h1>

            <DrawerTrigger>
              <Button size='icon' className='md:hidden'>
                <Filter />
              </Button>
            </DrawerTrigger>
          </div>
          <p className='text-muted-foreground mb-10'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci
            dolores, praesentium eum ea tenetur tempora.
          </p>
          {error && (
            <p className='text-destructive text-center'>Something went wrong</p>
          )}
          {activities && (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5  auto-rows-fr'>
              {activities.map((item, i) => (
                <ActivityCard {...item} key={i} />
              ))}
            </div>
          )}
        </Block>
      </div>
    </Drawer>
  );
};

export default Page;
