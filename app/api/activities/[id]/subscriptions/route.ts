import { NextRequest, NextResponse } from 'next/server';
import { getActivitySubscriptions } from '@/lib/data/activities/get-activity-subscriptions';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const activityId = parseInt(id, 10);

    if (isNaN(activityId)) {
      return NextResponse.json(
        { error: 'Invalid activity ID' },
        { status: 400 }
      );
    }

    const result = await getActivitySubscriptions(activityId);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to fetch subscriptions' },
        { status: result.error === 'Unauthorized' ? 401 : 500 }
      );
    }

    return NextResponse.json(result.data, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Error fetching activity subscriptions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
