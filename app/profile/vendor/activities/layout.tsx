import React from 'react';

import Block from '@/app/layout/Block';
import ActivityFormStepper from './ActivityFormStepper';

type Props = Readonly<{ children: React.ReactNode }>;

export default function Layout({ children }: Props) {
  return (
    <Block>
      <div className='grid grid-cols-3 gap-x-10'>
        <ActivityFormStepper />
        <div className='col-span-2'>{children}</div>
      </div>
    </Block>
  );
}
