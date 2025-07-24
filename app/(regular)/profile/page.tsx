import Dp from './Dp';
import ProfileForm from './ProfileForm';

export default function Page() {
  return (
    <div className='space-y-5 mx-5 max-w-full md:max-w-lg'>
      <Dp />
      <ProfileForm />
    </div>
  );
}
