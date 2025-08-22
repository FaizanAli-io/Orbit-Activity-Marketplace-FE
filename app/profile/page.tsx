import { getProfile } from '@/lib/data/profile/get-profile';
import Dp from './Dp';
import ProfileForm from './ProfileForm';
import PreferenceForm from './preferences/PreferenceForm';

export default async function Page() {
  const { data } = await getProfile();

  if (!data || !data.user) return null;

  return (
    <div className='space-y-5 mx-5 max-w-full md:max-w-lg'>
      <PreferenceForm
        data={{
          name: data?.user.name,
          phone: data?.user.phone,
          preferences: data?.user.preferences,
          avatar: data?.user.avatar,
        }}
      />
    </div>
  );
}
