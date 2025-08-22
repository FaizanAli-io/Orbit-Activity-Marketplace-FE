import { getProfile } from '@/lib/data/profile/get-profile';
import React from 'react';

const Username = async () => {
  const profile = await getProfile();

  if (!profile || !profile.data) return null;

  const {
    user: { name },
    email,
  } = profile.data;

  return <span>{name ? name : email}</span>;
};

export default Username;
