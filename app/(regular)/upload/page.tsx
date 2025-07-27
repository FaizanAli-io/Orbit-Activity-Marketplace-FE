import Block from '@/app/layout/Block';
import Uploader from '@/components/app/Uploader';
import React from 'react';

const Page = () => {
  return (
    <Block>
      <h2 className='text-3xl font-bold text-center'>Upload with S3</h2>
      <Uploader />
    </Block>
  );
};

export default Page;
