import Image from 'next/image';
import React from 'react';

import Block from '@/app/layout/Block';
import PriceCard from '../PriceCard';
import HostCard from '../HostCard';
import Overview from '../Overview';
import AboutIntinery from '../AboutIntinery';
import WhatsIncluded from '../WhatsIncluded';
import Schedule from '../Schedule';
import FeatureReview from '../FeatureReview';

const Page = async () => {
  return (
    <div>
      <Image
        width='1500'
        height='1500'
        objectFit='cover'
        alt='Cover image'
        src='/images/hiking.jpg'
        className='w-full max-h-[50vh] object-cover'
      />

      <Block space={false} className='my-10 md:grid md:grid-cols-3 gap-x-5'>
        <div className='order-1'>
          <PriceCard />
          <HostCard />
        </div>

        <div className='col-span-2'>
          <Overview />
          <AboutIntinery />
          <WhatsIncluded />
          <Schedule />
          <FeatureReview />
        </div>
      </Block>
    </div>
  );
};

export default Page;
