import Button3D from '@/components/app/Button3D';
import { getProfile } from '@/lib/data/profile/get-profile';
import { getAccessToken } from '@/lib/utils/cookies/auth-cookies';
import Link from 'next/link';
import React from 'react';

const HeroButtons = async () => {
  const token = await getAccessToken();
  const { data: profile } = await getProfile();

  return (
    <div className='flex space-x-2'>
      <Button3D size='lg'>
        <Link href='/explore'>Explore</Link>
      </Button3D>
      {!token || !profile ? (
        <Button3D size='lg' variant={'outline'}>
          <Link href='/signup'>Sign Up</Link>
        </Button3D>
      ) : (
        <Button3D size='lg' variant={'outline'}>
          <Link
            href={
              profile.vendor
                ? '/profile/vendor/dashboard'
                : '/profile/dashboard'
            }
          >
            Dashboard
          </Link>
        </Button3D>
      )}
    </div>
  );
};

export default HeroButtons;
