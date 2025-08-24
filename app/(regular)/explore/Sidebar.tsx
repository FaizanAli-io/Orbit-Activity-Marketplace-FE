import { cn } from '@/lib/utils';
import { getCategories } from '@/lib/data/categories/getCategories';
import { RangeDatePicker } from '@/components/app/RangeDatePicker';
import { Separator } from '@/components/ui/separator';
import CategoriesDropdown from './CategoriesDropdown';
import H6 from '@/components/ui/typography/H6';
import PriceRange from './PriceRange';
import React, { HTMLAttributes } from 'react';
import Tagline from '@/components/ui/typography/Tagline';

const Sidebar = async ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const { success, data } = await getCategories();

  if (!success || !data) return null;

  return (
    <div {...props} className={cn('mx-5 space-y-5', className)}>
      <H6 className='my-3 font-semibold'>Filter By:</H6>
      <Separator className='mb-5' />

      <div className='space-y-1'>
        <Tagline className='font-normal block md:text-sm'>Event Type</Tagline>
        <CategoriesDropdown />
      </div>

      <PriceRange />

      {/* <div className='space-y-1'>
        <Tagline className='font-normal block md:text-sm'>Date Range</Tagline>
        <RangeDatePicker />
      </div> */}
    </div>
  );
};

export default Sidebar;
