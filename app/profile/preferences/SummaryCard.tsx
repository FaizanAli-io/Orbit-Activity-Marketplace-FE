import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import H5 from '@/components/ui/typography/H5';
import { getLikedActivities } from '@/lib/data/activities/get-liked-activities';
import { getUserSubs } from '@/lib/data/activities/get-user-subs';
import { getFriends } from '@/lib/data/profile/social/get-friends';
import { formatQuantity } from '@/lib/utils';

const SummaryCard = async () => {
  const { data: subs } = await getUserSubs();
  const { data: friends } = await getFriends();
  const { data: savedEvents } = await getLikedActivities();

  return (
    <Card className='max-h-fit'>
      <CardHeader>
        <H5 className='font-medium md:text-2xl'>Account Summary</H5>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='flex justify-between'>
          <p>Events Subscribed</p>
          <p className='font-semibold'>
            {formatQuantity(subs?.pagination?.total || 0, { pad: 2 })}
          </p>
        </div>

        <div className='flex justify-between'>
          <p>Friends</p>
          <p className='font-semibold'>
            {formatQuantity(friends?.length || 0, { pad: 2 })}
          </p>
        </div>

        <div className='flex justify-between'>
          <p>Saved Events</p>
          <p className='font-semibold'>
            {formatQuantity(savedEvents?.pagination.total || 0, { pad: 2 })}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
