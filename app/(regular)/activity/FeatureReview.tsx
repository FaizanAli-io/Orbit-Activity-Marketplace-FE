import React from 'react';

import ReviewCard from '@/components/app/ReviewCard';

const FeatureReview = () => {
  return (
    <div className='my-10'>
      <h2 className='text-2xl font-semibold mb-2'>Featured Review</h2>
      <ReviewCard className='shadow-xs' />
    </div>
  );
};

export default FeatureReview;
