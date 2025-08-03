import { cn } from '@/lib/utils';
import { getCategories } from '@/lib/data/categories/getCategories';
import Link from 'next/link';
import React, { HTMLAttributes } from 'react';
import SidebarAccordion from './SidebarAccordion';

const Sidebar = async ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const { success, data } = await getCategories();

  if (!success || !data) return null;

  return (
    <div {...props} className={cn('mx-5', className)}>
      <Link href='/explore' className='font-semibold'>
        All activities
      </Link>
      <h2 className='font-bold my-2'>Filter by Categories</h2>

      {data.map(c => (
        <SidebarAccordion
          key={c.id}
          categories={c.subcategories}
          title={c.name}
          value={String(c.id)}
        />
      ))}
    </div>
  );
};

export default Sidebar;
