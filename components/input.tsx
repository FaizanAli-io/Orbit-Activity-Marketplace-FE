'use client';

import { useId, useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSliderInput } from '@/hooks/use-slider-input';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider, SliderThumb } from '@/components/ui/slider';
import { Loader2 } from 'lucide-react';

const items = [
  { id: 1, price: 80 },
  { id: 2, price: 95 },
  { id: 3, price: 110 },
  { id: 4, price: 125 },
  { id: 5, price: 130 },
  { id: 120, price: 900 },
];

interface Props {
  baseURL?: string;
}

export default function PriceRangeSlider({ baseURL = '/explore' }: Props) {
  const id = useId();
  const router = useRouter();
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const minValue = Math.min(...items.map(item => item.price));
  const maxValue = Math.max(...items.map(item => item.price));

  const {
    sliderValues,
    inputValues,
    handleSliderChange,
    handleInputChange,
    validateAndUpdateValue,
  } = useSliderInput({
    minValue,
    maxValue,
    initialValue: [100, 1000],
  });

  // Function to update URL with debounce
  const updateURL = (minPrice: number, maxPrice: number) => {
    // Clear existing timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Set new timeout for 500ms delay
    debounceRef.current = setTimeout(() => {
      const currentMin = Number(params.get('minPrice'));
      const currentMax = Number(params.get('maxPrice'));

      if (currentMin !== minPrice || currentMax !== maxPrice) {
        const targetUrl = `${baseURL}?minPrice=${minPrice}&maxPrice=${maxPrice}`;

        router.prefetch(targetUrl);
        setLoading(true);
        router.push(targetUrl);
      }
    }, 500);
  };

  // Initialize values from URL parameters
  useEffect(() => {
    const minPrice = params.get('minPrice');
    const maxPrice = params.get('maxPrice');

    if (minPrice && maxPrice) {
      const minNum = Number(minPrice);
      const maxNum = Number(maxPrice);

      if (!Number.isNaN(minNum) && !Number.isNaN(maxNum)) {
        // Update slider values if URL parameters are valid
        handleSliderChange([minNum, maxNum]);
      }
    }
  }, []); // run once on mount

  // Update URL when slider values change (debounced)
  useEffect(() => {
    const [minPrice, maxPrice] = sliderValues;
    updateURL(minPrice, maxPrice);
  }, [sliderValues]);

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  // Reset loading state when URL parameters change
  useEffect(() => {
    setLoading(false);
  }, [params.toString()]);

  return (
    <div className='space-y-4'>
      {/* Slider */}
      <div className='flex flex-col gap-2.5'>
        <div className='flex space-x-1'>
          {loading && (
            <Loader2 className='mr-2 size-6.5 animate-spin text-primary' />
          )}
          <Label>Price Range</Label>
        </div>
        <Slider
          value={sliderValues}
          onValueChange={handleSliderChange}
          min={minValue}
          max={maxValue}
          step={10}
          aria-label='Price Range Slider'
          disabled={loading}
        >
          <SliderThumb />
          <SliderThumb />
        </Slider>
      </div>

      {/* Inputs */}
      <div className='flex items-center justify-between gap-4'>
        <div className='space-y-2.5'>
          <Label htmlFor={`${id}-min`}>Min Price</Label>
          <Input
            id={`${id}-min`}
            type='number'
            value={inputValues[0]}
            onChange={e => handleInputChange(e, 0)}
            onBlur={() => {
              validateAndUpdateValue(inputValues[0], 0);
              updateURL(inputValues[0], inputValues[1]);
            }}
            placeholder={`$${minValue}`}
            disabled={loading}
          />
        </div>
        <div className='space-y-2.5'>
          <Label htmlFor={`${id}-max`}>Max Price</Label>
          <Input
            id={`${id}-max`}
            type='number'
            value={inputValues[1]}
            onChange={e => handleInputChange(e, 1)}
            onBlur={() => {
              validateAndUpdateValue(inputValues[1], 1);
              updateURL(inputValues[0], inputValues[1]);
            }}
            placeholder={`$${maxValue}`}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
}
