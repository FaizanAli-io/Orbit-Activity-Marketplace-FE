import Block from '@/app/layout/Block';
import React from 'react';
import VerifySkeleton from '../../verify-email/VerifySkeleton';

const Loading = () => {
  return (
    <Block>
      <VerifySkeleton />
    </Block>
  );
};

export default Loading;
