import { getProfile } from '@/lib/data/profile/get-profile';
import React from 'react';
import PreferenceForm from './PreferenceForm';

const PreferencesFormContainer = async () => {
  const { data } = await getProfile();

  if (!data || !data.user) return null;

  return (
    <PreferenceForm
      data={{
        name: data?.user.name,
        phone: data?.user.phone,
        preferences:
          data?.user.preferences?.map(p => String(p.subcategoryId)) || [],
        avatar: data?.user.avatar,
        email: data.email,
      }}
    />
  );
};

export default PreferencesFormContainer;
