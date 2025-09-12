import React from 'react';
import Image from 'next/image';

const Marquee = () => {
  return (
    <div className='overflow-hidden space-y-2'>
      <div className='flex gap-2'>
        {new Array(5)
          .fill(null)
          .map((_, i) => getImage(`/images/home/header/${i}.png`))}
      </div>
      <div className='flex gap-2'>
        {new Array(5)
          .fill(null)
          .map((_, i) => getImage(`/images/home/header/${i + 6}.png`))}
      </div>
    </div>
  );
};

function getImage(path: string) {
  return (
    <Image
      className='rounded-lg object-cover flex-1 '
      key={path}
      src={path}
      alt='activity'
      width='200'
      height='200'
      objectFit='cover'
    />
  );
}

export default Marquee;
