import { getProfile } from '@/lib/data/profile/get-profile';
import Block from '../layout/Block';
import H3 from '@/components/ui/typography/H3';
import SummaryCard from './preferences/SummaryCard';
import { Card, CardContent } from '@/components/ui/card';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import PreferencesFormContainer from './preferences';
import { Loader2 } from 'lucide-react';

export default async function Page() {
  return (
    <Block space={false} className='my-10'>
      <div className='space-y-1 mb-5'>
        <H3 className='font-medium text-2xl md:text-4xl'>
          Profile and Settings
        </H3>
        <p>Manage your account preferences and settings</p>
      </div>
      <div className='md:grid md:grid-cols-6 md:gap-x-5'>
        <Card className='bg-white p-5 rounded-lg md:col-span-4'>
          <CardContent>
            <Suspense
              fallback={
                <div className='h-44 grid place-content-center'>
                  <Loader2 size='25' className='animate-spin' />
                </div>
              }
            >
              <PreferencesFormContainer />
            </Suspense>
          </CardContent>
        </Card>
        <div className='hidden md:block md:col-span-2 w-full'>
          <Suspense fallback={<Skeleton className='w-full h-48' />}>
            <SummaryCard />
          </Suspense>
        </div>
      </div>
    </Block>
  );
}
