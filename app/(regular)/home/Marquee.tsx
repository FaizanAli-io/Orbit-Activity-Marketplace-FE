import React from 'react';
import Image from 'next/image';

const Marquee = () => {
  return (
    <div className='overflow-hidden space-y-2'>
      <div className='flex md:grid md:grid-cols-6 gap-2 translate-x-2 md:-translate-x-5 md:px-8'>
        {new Array(6)
          .fill(null)
          .map((_, i) => getImage(`/images/home/header/${i}.png`))}
      </div>
      <div className='flex md:grid md:grid-cols-6 gap-2 md:translate-x-5 md:px-8'>
        {new Array(6)
          .fill(null)
          .map((_, i) => getImage(`/images/home/header/${i + 6}.png`))}
      </div>
    </div>
  );
};

function getImage(path: string) {
  return (
    <Image
      className='rounded-lg w-full h-full object-cover'
      src={path}
      alt='activity'
      width='200'
      height='200'
      objectFit='cover'
    />
  );
}

export default Marquee;
