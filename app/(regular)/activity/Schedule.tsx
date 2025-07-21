import React from 'react';
import ScheduleCard from './ScheduleCard';

const Schedule = () => {
  return (
    <div className='my-10'>
      <h2 className='text-2xl font-semibold'>Schedule</h2>
      <div className='divide-y divide-gray-300'>
        {new Array(3).fill(null).map((_, i) => (
          <ScheduleCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default Schedule;
