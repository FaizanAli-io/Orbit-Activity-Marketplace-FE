import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { StatsCard } from './StatsCard';
import { getDashboardStats } from '@/lib/data/admin/get-dashboard-stats';
import { Users, Store, Calendar, TrendingUp } from 'lucide-react';

async function StatsContent() {
  const stats = await getDashboardStats();

  const statsConfig = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      description: 'Registered users on the platform',
    },
    {
      title: 'Total Vendors',
      value: stats.totalVendors,
      icon: Store,
      description: 'Active vendors providing services',
    },
    {
      title: 'Total Activities',
      value: stats.totalActivities,
      icon: Calendar,
      description: 'Published activities available',
    },
    {
      title: 'Revenue',
      value: 0, // Placeholder for future implementation
      icon: TrendingUp,
      description: 'Total platform revenue',
    },
  ];

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      {statsConfig.map((stat, index) => (
        <StatsCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          description={stat.description}
        />
      ))}
    </div>
  );
}

function StatsGridSkeleton() {
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className='rounded-lg border p-6'>
          <div className='flex items-center justify-between space-y-0 pb-2'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-4 w-4' />
          </div>
          <div className='space-y-1'>
            <Skeleton className='h-8 w-16' />
            <Skeleton className='h-3 w-32' />
          </div>
        </div>
      ))}
    </div>
  );
}

export function StatsGrid() {
  return (
    <Suspense fallback={<StatsGridSkeleton />}>
      <StatsContent />
    </Suspense>
  );
}
