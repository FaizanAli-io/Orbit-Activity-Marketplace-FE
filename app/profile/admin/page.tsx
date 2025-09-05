import { Suspense } from 'react';
import Block from '@/app/layout/Block';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import UsersTable from './table';
import VendorsTable from './vendors/table';

const Page = async () => {
  return (
    <Block>
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue='users' className='w-full'>
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='users'>Users</TabsTrigger>
              <TabsTrigger value='vendors'>Vendors</TabsTrigger>
            </TabsList>

            <TabsContent value='users' className='mt-6'>
              <Suspense
                fallback={
                  <div className='h-52 flex justify-center items-center'>
                    <Loader2 className='animate-spin' size='32' />
                  </div>
                }
              >
                <UsersTable />
              </Suspense>
            </TabsContent>

            <TabsContent value='vendors' className='mt-6'>
              <Suspense
                fallback={
                  <div className='h-52 flex justify-center items-center'>
                    <Loader2 className='animate-spin' size='32' />
                  </div>
                }
              >
                <VendorsTable />
              </Suspense>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </Block>
  );
};

export default Page;
