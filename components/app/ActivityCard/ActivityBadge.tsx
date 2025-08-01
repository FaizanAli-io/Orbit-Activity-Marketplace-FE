'use client';

import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useCategories } from '@/lib/data/categories/use-categories';
import React from 'react';

interface Props {
  categoryId: number;
}

const ActivityBadge = ({ categoryId }: Props) => {
  const { data: categories, isFetched } = useCategories();

  if (!isFetched && !categories) return <Skeleton className='w-20 h-5' />;

  const category = categories
    ?.flatMap(c => c.subcategories)
    .find(c => c.id === +categoryId);

  if (!category) return null;

  return <Badge>{category.name}</Badge>;
};

export default ActivityBadge;
