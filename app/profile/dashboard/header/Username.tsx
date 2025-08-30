import { getProfile } from '@/lib/data/profile/get-profile';
import React, { HTMLAttributes } from 'react';

const Username = async (props: HTMLAttributes<HTMLSpanElement>) => {
  const profile = await getProfile();

  if (!profile || !profile.data) return null;

  const { user, email } = profile.data;

  return <span {...props}>{user?.name ? user?.name : email}</span>;
};

export default Username;
