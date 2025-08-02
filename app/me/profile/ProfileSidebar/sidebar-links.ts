import { getUser } from '@/lib/utils/cookies/user-cookies';

const data = {
  items: [
    {
      title: 'Profile',
      url: '/me/profile',
    },
    {
      title: 'Calendar',
      url: '/me/profile/calendar',
    },
    {
      title: 'Subscribed Activities',
      url: '/me/profile/subscribed-activities',
    },
    {
      title: 'Liked Activities',
      url: '/me/profile/liked-activities',
    },
    {
      title: 'Friends',
      url: '/me/profile/friends',
    },
    {
      title: 'Billing',
      url: '/me/profile/billing',
    },
  ],
};

export const getLinks = async () => {
  const user = await getUser();

  if (!user || !user.type || user.type !== 'VENDOR') return data;

  data.items.splice(2, 0, {
    title: 'Create Activity',
    url: '/activity-form/basic-details',
  });
};
