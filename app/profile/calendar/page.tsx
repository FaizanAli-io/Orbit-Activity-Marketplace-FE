import Block from '@/app/layout/Block';
import { ClientContainer } from '@/calendar/components/client-container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
            <ClientContainer view='month' />
          </TabsContent>

          <TabsContent value='agenda'>
            <ClientContainer view='agenda' />
          </TabsContent>

          <TabsContent value='week'>
            <ClientContainer view='week' />
          </TabsContent>

          <TabsContent value='year'>
            <ClientContainer view='year' />
          </TabsContent>
        </div>
      </Tabs>
    </Block>
  );
}
