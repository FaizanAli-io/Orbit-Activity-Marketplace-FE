import { getProfile } from '@/lib/data/profile/get-profile';
import Dp from './Dp';
import ProfileForm from './ProfileForm';

export default async function Page() {
  const { data } = await getProfile();

  console.log(data);

  return (
    <div className='space-y-5 mx-5 max-w-full md:max-w-lg'>
      <Dp src={data?.user.avatar} />
      <ProfileForm
        data={{
          name: data?.user.name,
          phone: data?.user.phone,
          preferences: data?.user.preferences,
          email: data?.email || '',
        }}
      />
    </div>
  );
}
