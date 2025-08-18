import { cn } from '@/lib/utils';
import { getCategories } from '@/lib/data/categories/getCategories';
import React, { HTMLAttributes } from 'react';
import { Separator } from '@/components/ui/separator';
import H6 from '@/components/ui/typography/H6';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Tagline from '@/components/ui/typography/Tagline';
import { DropdownMenu, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import CategoriesDropdown from './CategoriesDropdown';
import { RangeDatePicker } from '@/components/app/RangeDatePicker';

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

      <div>
        <Tagline className='font-normal block md:text-sm'>Price Range</Tagline>
        <div className='space-y-2 my-2'>
          <div className='flex items-center gap-3'>
            <Checkbox id='$100' className='shadow-none' />
            <Label htmlFor='$100'>$0 - $100</Label>
          </div>
          <div className='flex items-center gap-3'>
            <Checkbox id='$1000' className='shadow-none' />
            <Label htmlFor='$1000'>$100 - $1000</Label>
          </div>
          <div className='flex items-center gap-3'>
            <Checkbox id='$2000' className='shadow-none' />
            <Label htmlFor='$2000'>$1000 - $2000</Label>
          </div>
          <div className='flex items-center gap-3'>
            <Checkbox id='$5000' className='shadow-none' />
            <Label htmlFor='$5000'>$2000 - $5000</Label>
          </div>
          <div className='flex items-center gap-3'>
            <Checkbox id='$10000' className='shadow-none' />
            <Label htmlFor='$10000'>$5000 - $10000</Label>
          </div>
        </div>
      </div>

      <div className='space-y-1'>
        <Tagline className='font-normal block md:text-sm'>Date Range</Tagline>
        <RangeDatePicker />
      </div>
    </div>
  );
};

export default Sidebar;
