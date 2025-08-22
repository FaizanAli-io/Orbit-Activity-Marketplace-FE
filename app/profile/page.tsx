import { getProfile } from '@/lib/data/profile/get-profile';
import PreferenceForm from './preferences/PreferenceForm';
import Block from '../layout/Block';
import H2 from '@/components/ui/typography/H2';
import H3 from '@/components/ui/typography/H3';

export default async function Page() {
  const { data } = await getProfile();

  if (!data || !data.user) return null;

  return (
    // <div className='space-y-5 mx-5 max-w-full md:max-w-lg'>
    <Block space={false} className='my-10'>
      <div className='space-y-1 mb-5'>
        <H3 className='font-medium md:text-4xl'>Profile and Settings</H3>
        <p>Manage your account preferences and settings</p>
      </div>
      <div className='bg-white p-5 rounded-lg'>
        <PreferenceForm
          data={{
            name: data?.user.name,
            phone: data?.user.phone,
            preferences: data?.user.preferences,
            avatar: data?.user.avatar,
          }}
        />
      </div>
    </Block>
    // </div>
  );
}
