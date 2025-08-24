'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Tagline from '@/components/ui/typography/Tagline';
import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ranges = [
  { id: '100', min: 0, max: 100, label: '$0 - $100' },
  { id: '1000', min: 100, max: 1000, label: '$100 - $1000' },
  { id: '2000', min: 1000, max: 2000, label: '$1000 - $2000' },
  { id: '5000', min: 2000, max: 5000, label: '$2000 - $5000' },
  { id: '10000', min: 5000, max: 10000, label: '$5000 - $10000' },
];

const PriceRange = () => {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [min, setMin] = useState<number | null>(null);
  const [max, setMax] = useState<number | null>(null);
  const params = useSearchParams();
  const router = useRouter();

  const handleChange = (checked: boolean, id: string) => {
    let updated: string[];
    if (checked) {
      updated = [...selected, id];
    } else {
      updated = selected.filter(item => item !== id);
    }
    setSelected(updated);

    if (updated.length === 0) {
      setMin(null);
      setMax(null);
    } else {
      const selectedRanges = ranges.filter(r => updated.includes(r.id));
      setMin(Math.min(...selectedRanges.map(r => r.min)));
      setMax(Math.max(...selectedRanges.map(r => r.max)));
    }
  };

  useEffect(() => {
    const minPrice = params.get('minPrice');
    const maxPrice = params.get('maxPrice');

    if (minPrice && maxPrice) {
      const minNum = Number(minPrice);
      const maxNum = Number(maxPrice);

      if (!Number.isNaN(minNum) && !Number.isNaN(maxNum)) {
        setMin(minNum);
        setMax(maxNum);

        const preselected = ranges
          .filter(r => r.min >= minNum && r.max <= maxNum)
          .map(r => r.id);
        setSelected(preselected);
      }
    }
  }, []); // run once on mount

  useEffect(() => {
    if (Number.isSafeInteger(min) && Number.isSafeInteger(max)) {
      const currentMin = Number(params.get('minPrice'));
      const currentMax = Number(params.get('maxPrice'));

      if (currentMin !== min || currentMax !== max) {
        const targetUrl = `/explore?minPrice=${min}&maxPrice=${max}`;

        router.prefetch(targetUrl);

        setLoading(true);
        router.push(targetUrl);
      }
    }
  }, [min, max, params, router]);

  useEffect(() => {
    setLoading(false);
  }, [params.toString()]);

  return (
    <div>
      <div className='flex space-x-1'>
        {loading && (
          <Loader2 className='mr-2 size-6.5 animate-spin text-primary' />
        )}
        <Tagline className='font-normal block md:text-sm'>Price Range</Tagline>
      </div>

      <div className='space-y-2 my-2'>
        {ranges.map(r => (
          <div key={r.id} className='flex items-center gap-3'>
            <Checkbox
              checked={selected.includes(r.id)}
              onCheckedChange={checked => handleChange(!!checked, r.id)}
              id={`$${r.id}`}
              className='shadow-none'
              disabled={loading}
            />
            <Label htmlFor={`$${r.id}`}>{r.label}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceRange;
