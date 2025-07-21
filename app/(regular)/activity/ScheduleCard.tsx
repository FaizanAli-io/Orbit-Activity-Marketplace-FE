import React from 'react';

const ScheduleCard = () => {
  return (
    <div className='p-5 flex justify-between items-center text-muted-foreground'>
      <div>
        <p>Aug 15, 2025</p>
        <p>2:00 - 5:00</p>
      </div>

      <p className='text-emerald-600 font-semibold'>Available</p>
    </div>
  );
};

export default ScheduleCard;
