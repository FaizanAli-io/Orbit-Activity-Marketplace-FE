import Block from '@/app/layout/Block';
import { ClientContainer } from '@/calendar/components/client-container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Block space={false} className='my-10'>
      <Tabs defaultValue='month'>
        <div className='w-full flex md:justify-end'>
          <TabsList className='bg-secondary'>
            <TabsTrigger value='month'>Month View</TabsTrigger>
            <TabsTrigger value='agenda'>Agenda</TabsTrigger>
            <TabsTrigger className='hidden md:block' value='week'>
              Week View
            </TabsTrigger>
            <TabsTrigger value='year'>Year View</TabsTrigger>
          </TabsList>
        </div>
        <div className='bg-white p-5 shadow-theme'>
          <TabsContent value='month'>
            <Suspense
              fallback={
                <div className='h-screen w-full grid place-content-center'>
                  <Loader2 className='animate-spin' size='32' />
                </div>
              }
            >
              <ClientContainer view='month' />
            </Suspense>
          </TabsContent>

          <TabsContent value='agenda'>
            <Suspense
              fallback={
                <div className='h-screen w-full grid place-content-center'>
                  <Loader2 className='animate-spin' size='32' />
                </div>
              }
            >
              <ClientContainer view='agenda' />
            </Suspense>
          </TabsContent>

          <TabsContent value='week'>
            <Suspense
              fallback={
                <div className='h-screen w-full grid place-content-center'>
                  <Loader2 className='animate-spin' size='32' />
                </div>
              }
            >
              <ClientContainer view='week' />
            </Suspense>
          </TabsContent>

          <TabsContent value='year'>
            <Suspense
              fallback={
                <div className='h-screen w-full grid place-content-center'>
                  <Loader2 className='animate-spin' size='32' />
                </div>
              }
            >
              <ClientContainer view='year' />
            </Suspense>
          </TabsContent>
        </div>
      </Tabs>
    </Block>
  );
}
