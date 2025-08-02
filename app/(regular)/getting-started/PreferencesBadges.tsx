'use client';

import React from 'react';

import { Badge } from '@/components/ui/badge';
import { useCategories } from '@/lib/data/categories/use-categories';
import { toast } from 'sonner';

interface Props {
  selected: number[];
  onChange: (values: number[]) => void;
}

const PreferencesBadges = ({ selected, onChange }: Props) => {
  const { data: categories, isFetched } = useCategories();

  const handleClick = (id: number) => {
    const isSelected = selected.includes(id);

    if (isSelected) return onChange(selected.filter(val => val !== id));

    if (selected.length >= 3)
      return toast.error('Cannot select more than 3 preferences', {
        richColors: true,
      });

    onChange([...selected, id]);
  };

  if (!isFetched || !categories) return null;

  return (
    <div>
      {categories.map(c => (
        <div key={c.id} className='mb-5'>
          <p className='font-semibold mb-2 text-sm text-muted-foreground'>
            {c.name}
          </p>
          <div className='flex space-x-2'>
            {c.subcategories.map(sub => (
              <Badge
                key={sub.id}
                variant={
                  selected && selected.includes(sub.id) ? 'default' : 'outline'
                }
                className='text-md cursor-pointer'
                onClick={() => handleClick(sub.id)}
              >
                {sub.name}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PreferencesBadges;
