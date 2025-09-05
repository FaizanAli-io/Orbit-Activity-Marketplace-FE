import { Suspense } from 'react';
import AteendeesTable from '../table';
import Block from '@/app/layout/Block';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface Props {
  params: Promise<{ id: number }>;
}

const Page = async ({ params }: Props) => {
  const { id } = await params;

  if (!id)
    return (
      <Block>
        <p className='text-center font-medium'>Event Not Found</p>
      </Block>
    );

  return (
    <Block>
      <Card>
        <CardHeader>
          <CardTitle>Attendees</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense
            fallback={
              <div className='h-52 flex justify-center items-center'>
                <Loader2 className='animate-spin' size='32' />
              </div>
            }
          >
            <AteendeesTable eventId={id} />
          </Suspense>
        </CardContent>
      </Card>
    </Block>
  );
};

export default Page;
