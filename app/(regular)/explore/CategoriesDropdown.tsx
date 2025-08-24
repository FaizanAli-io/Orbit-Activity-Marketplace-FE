'use client';

import GroupCombobox from '@/components/group-combobox';
import { Skeleton } from '@/components/ui/skeleton';
import { useCategories } from '@/lib/data/categories/use-categories';
import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const CategoriesDropdown = () => {
  const [categoryId, setCategoryId] = useState('');
  const [loading, setLoading] = useState(false);

  const { data: categories, isFetched } = useCategories();

  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (params.has('category')) setCategoryId(params.get('category')!);
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [params.toString()]);

  if (!isFetched) return <Skeleton className='rounded-md w-30 h-8' />;

  if (!categories || !categories.length) return null;

  const data = categories?.map(c => ({
    group: c.name,
    options: c.subcategories.map(sub => ({
      value: String(sub.id),
      label: sub.name,
    })),
  }));

  const handleChange = (id: string) => {
    setLoading(true);
    setCategoryId(id);
    router.push(`/explore/?category=${id}`);
  };

  return (
    <div className='flex space-x-2'>
      {loading && (
        <Loader2 className='mr-2 size-6.5 animate-spin text-primary' />
      )}
      <GroupCombobox
        value={categoryId}
        onChange={handleChange}
        groups={data}
        disable={loading}
      />
    </div>
  );
};

export default CategoriesDropdown;
