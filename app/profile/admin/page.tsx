import { Suspense } from 'react';
import Block from '@/app/layout/Block';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import UsersTable from './table';

const Page = async () => {
  return (
    <Block>
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense
            fallback={
              <div className='h-52 flex justify-center items-center'>
                <Loader2 className='animate-spin' size='32' />
              </div>
            }
          >
            <UsersTable />
          </Suspense>
        </CardContent>
      </Card>
    </Block>
  );
};

export default Page;
