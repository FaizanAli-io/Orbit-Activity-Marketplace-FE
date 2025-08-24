import Button3D from '@/components/app/Button3D';
import { getAccessToken } from '@/lib/utils/cookies/auth-cookies';
import Link from 'next/link';
import React from 'react';

const HeroButtons = async () => {
  const token = await getAccessToken();

  return (
    <div className='flex space-x-2'>
      <Button3D>
        <Link href='/explore'>Explore</Link>
      </Button3D>
      {!token ? (
        <Button3D variant={'outline'}>
          <Link href='/signup'>Sign Up</Link>
        </Button3D>
      ) : (
        <Button3D variant={'outline'}>
          <Link href='/profile/dashboard'>Dashboard</Link>
        </Button3D>
      )}
    </div>
  );
};

export default HeroButtons;
