import { getProfile } from '@/lib/data/profile/get-profile';
import PreferenceForm from './preferences/PreferenceForm';
import Block from '../layout/Block';
import H2 from '@/components/ui/typography/H2';
import H3 from '@/components/ui/typography/H3';
import SummaryCard from './preferences/SummaryCard';
import { Card, CardContent } from '@/components/ui/card';

export default async function Page() {
  const { data } = await getProfile();

  if (!data || !data.user) return null;

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
            <PreferenceForm
              data={{
                name: data?.user.name,
                phone: data?.user.phone,
                preferences:
                  data?.user.preferences?.map(p => String(p.subcategoryId)) ||
                  [],
                avatar: data?.user.avatar,
                email: data.email,
              }}
            />
          </CardContent>
        </Card>
        <div className='hidden md:block md:col-span-2 w-full'>
          <SummaryCard />
        </div>
      </div>
    </Block>
  );
}
