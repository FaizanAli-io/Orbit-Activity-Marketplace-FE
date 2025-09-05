import { Suspense } from 'react';
import Block from '@/app/layout/Block';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ArrowLeft, Star, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getActivities } from '@/lib/data/activities/get-activities';
import { getVendors } from '@/lib/data/profile/vendors/get-vendors';
import { Badge } from '@/components/ui/badge';
import ActivityCard from '@/components/app/ActivityCard/ActivityCard';

interface Props {
  params: Promise<{ id: string }>;
}

const VendorActivitiesPage = async ({ params }: Props) => {
  const { id: vendorId } = await params;

  // Fetch vendor activities and vendor details
  const [activitiesResult, vendorsResult] = await Promise.all([
    getActivities({ vendorId, limit: 50 }),
    getVendors(),
  ]);

  const vendor = vendorsResult.data?.find(v => v.id.toString() === vendorId);
  const activities = activitiesResult.data?.data || [];

  if (!vendor) {
    return (
      <Block>
        <Card>
          <CardContent className='p-6'>
            <div className='text-center'>
              <h2 className='text-xl font-semibold mb-2'>Vendor Not Found</h2>
              <p className='text-muted-foreground mb-4'>
                The vendor you're looking for doesn't exist.
              </p>
              <Button asChild>
                <Link href='/profile/admin'>Back to Admin</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </Block>
    );
  }

  return (
    <Block>
      <div className='space-y-6'>
        {/* Header with back button */}
        <div className='flex items-center gap-4'>
          <Button variant='outline' size='sm' asChild>
            <Link href='/profile/admin' className='flex items-center gap-2'>
              <ArrowLeft className='h-4 w-4' />
              Back to Admin
            </Link>
          </Button>
        </div>

        {/* Vendor Info Card */}
        <Card>
          <CardHeader>
            <div className='flex items-start justify-between'>
              <div>
                <CardTitle className='text-2xl'>{vendor.name}</CardTitle>
                <div className='flex items-center gap-2 mt-2'>
                  <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                  <span className='font-medium'>
                    {vendor.rating.toFixed(1)}
                  </span>
                  <Badge variant='secondary'>Vendor ID: {vendor.id}</Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className='grid md:grid-cols-2 gap-4'>
              <div className='flex items-center gap-2'>
                <Mail className='h-4 w-4 text-muted-foreground' />
                <span>{vendor.email}</span>
              </div>
              {vendor.phone && (
                <div className='flex items-center gap-2'>
                  <Phone className='h-4 w-4 text-muted-foreground' />
                  <span>{vendor.phone}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Activities Section */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center justify-between'>
              <span>Activities ({activities.length})</span>
              {activities.length > 0 && (
                <Badge variant='outline'>
                  {activities.length}{' '}
                  {activities.length === 1 ? 'Activity' : 'Activities'}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activities.length === 0 ? (
              <div className='text-center py-12'>
                <div className='text-muted-foreground'>
                  <h3 className='text-lg font-medium mb-2'>
                    No Activities Found
                  </h3>
                  <p>This vendor hasn't created any activities yet.</p>
                </div>
              </div>
            ) : (
              <div className='space-y-5 md:grid md:grid-cols-3 md:gap-5'>
                {activities.map(activity => (
                  <Suspense
                    key={activity.id}
                    fallback={
                      <div className='h-64 bg-muted animate-pulse rounded-lg' />
                    }
                  >
                    <ActivityCard
                      variant='grid'
                      {...activity}
                      viewLink={`/activity/${activity.id}`}
                    />
                  </Suspense>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Block>
  );
};

export default VendorActivitiesPage;
