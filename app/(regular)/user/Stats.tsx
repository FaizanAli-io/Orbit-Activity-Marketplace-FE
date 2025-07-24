import React from 'react';

const Stats = () => {
  return (
    <div className='flex items-end space-x-10'>
      <div className='flex flex-col text-center items-center'>
        <span className='font-semibold leading-tight'>
          Subscribed Activities
        </span>
        <p className='font-bold text-4xl'>25</p>
      </div>

      <div className='flex flex-col items-center'>
        <span className='font-semibold text-center'>Liked Activities</span>
        <p className='font-bold text-4xl'>25</p>
      </div>

      <div className='flex flex-col items-center'>
        <span className='font-semibold text-center'>Friends</span>
        <p className='font-bold text-4xl'>135</p>
      </div>
    </div>
  );
};

export default Stats;
