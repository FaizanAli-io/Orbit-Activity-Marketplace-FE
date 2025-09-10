import { apiFetch } from '@/lib/api';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { withServerError } from '@/lib/utils/with-server-error';
import { getAccessToken } from '@/lib/utils/cookies/auth-cookies';
import { ActivitySubscriptionsResponse } from './types/subscription';

export async function getActivitySubscriptions(activityId: number) {
  const token = await getAccessToken();

  if (!token) {
    return {
      success: false,
      data: undefined,
      error: 'Unauthorized',
    };
  }

  return withServerError(async () => {
    const result = await apiFetch<unknown, ActivitySubscriptionsResponse>(
      `/activities/${activityId}/subscriptions`,
      {
        method: HTTP_VERB.GET,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: [`activity-${activityId}-subscriptions`, 'subscriptions'],
          revalidate: 300, // Cache for 5 minutes
        },
      }
    );

    return result;
  });
}
