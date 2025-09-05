import Block from '@/app/layout/Block';
import Button3D from '@/components/app/Button3D';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getUsers } from '@/lib/data/profile/users/get-users';
import { Check, Loader2, UserPlus } from 'lucide-react';
import { Suspense } from 'react';
import GroupRecommendationList from './GroupRecommendationList';

interface Props {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: Props) => {
  const { id } = await params;

  const { data: users, success } = await getUsers();
  const user = users?.find(u => u.id === +id);

  if (!success || !users?.length || !user)
    return (
      <Block>
        <p className='text-center text-3xl font-medium'>User Not Found</p>
      </Block>
    );

  const initials = user?.name?.match(/\b\w/g)?.join('').toUpperCase();

  return (
    <Block className='space-y-5 md:max-w-4xl'>
      <div className=' md:flex md:justify-between md:items-center space-y-5 md:space-y-0'>
        <div className='flex items-center space-x-2 '>
          <Avatar className='size-24'>
            <AvatarImage
              width='100'
              height='100'
              src={user.avatar}
              className='object-cover'
              alt={'User Profile Picture'}
            />
            <AvatarFallback className='text-2xl bg-secondary'>
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className='text-2xl font-medium'>
              {user?.name || 'Orbit User'}
            </h1>
            <p>{user.email}</p>
          </div>
        </div>

        <Button3D disabled>
          <Check />
          Friends
        </Button3D>
      </div>

      <div>
        <h2 className='text-2xl font-medium'>Find Events Together</h2>
        <p>Explore activities that are fit for both.</p>
      </div>

      <Suspense
        fallback={
          <div className='flex justify-center items-center'>
            <Loader2 className='animate-spin' size='32' />
          </div>
        }
      >
        <GroupRecommendationList friendId={+id} />
      </Suspense>
    </Block>
  );
};

export default Page;
