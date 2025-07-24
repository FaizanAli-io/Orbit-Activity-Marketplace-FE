import React from 'react';
import { ChartArea } from './ChartArea';
import { DataTable } from './DataTable';

import data from './data.json';
import { SectionCards } from './SectionCards';

const Page = () => {
  return (
    <div className='flex flex-1 flex-col'>
      <div className='@container/main flex flex-1 flex-col gap-2'>
        <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
          <SectionCards />
          <div className='px-4 lg:px-6'>
            <ChartArea />
          </div>
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
};

export default Page;
