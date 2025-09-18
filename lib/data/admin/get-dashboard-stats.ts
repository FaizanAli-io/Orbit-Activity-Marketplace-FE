import { getUsers } from '@/lib/data/profile/users/get-users';
import { getVendors } from '@/lib/data/profile/vendors/get-vendors';
import { getActivities } from '@/lib/data/activities/get-activities';

export interface DashboardStats {
  totalUsers: number;
  totalVendors: number;
  totalActivities: number;
  totalRevenue?: number; // Optional for future implementation
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    // Fetch all data in parallel for better performance
    const [usersResult, vendorsResult, activitiesResult] = await Promise.all([
      getUsers(),
      getVendors(),
      getActivities({ limit: 1000 }), // Get large limit to count all
    ]);

    return {
      totalUsers: usersResult.data?.data?.length || 0,
      totalVendors: vendorsResult.data?.length || 0,
      totalActivities:
        activitiesResult.data?.pagination?.total ||
        activitiesResult.data?.data?.length ||
        0,
    };
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error);
    return {
      totalUsers: 0,
      totalVendors: 0,
      totalActivities: 0,
    };
  }
}
