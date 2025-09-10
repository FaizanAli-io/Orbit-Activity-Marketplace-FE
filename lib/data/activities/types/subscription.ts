export interface ActivitySubscription {
  id: number;
  userId: number;
  activityId: number;
  status: 'active' | 'cancelled' | 'pending';
  createdAt: string;
  updatedAt: string;
}

export interface ActivitySubscriptionsResponse {
  data: ActivitySubscription[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
