'use client';
import GroupCombobox from '@/components/group-combobox';
import { Skeleton } from '@/components/ui/skeleton';
import { useCategories } from '@/lib/data/categories/use-categories';
import React, { useState } from 'react';

const CategoriesDropdown = () => {
  const [categoryId, setCategoryId] = useState('');
  const { data: categories, isFetched } = useCategories();

  if (!isFetched) return <Skeleton className='rounded-md w-30 h-8' />;

  if (!categories || !categories.length) return null;

  const data = categories?.map(c => ({
    group: c.name,
    options: c.subcategories.map(sub => ({
      value: String(sub.id),
      label: sub.name,
    })),
  }));

  return <GroupCombobox groups={data} />;
};

export default CategoriesDropdown;
