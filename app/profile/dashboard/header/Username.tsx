import { getProfile } from '@/lib/data/profile/get-profile';
import React, { HTMLAttributes } from 'react';

const Username = async (props: HTMLAttributes<HTMLSpanElement>) => {
  const profile = await getProfile();

  if (!profile || !profile.data) return null;

  const { user, email, vendor } = profile.data;

  const getName = () => {
    if (user?.name) return user.name;
    if (vendor?.name) return vendor.name;

    return email;
  };

  return <span {...props}>{getName()}</span>;
};

export default Username;
