import React from 'react';
import Image from 'next/image';

import { Lock, StarIcon } from 'lucide-react';

const HostCard = () => {
  return (
    <div className='border rounded-sm shadow-sm p-5 my-5'>
      <h2 className='font-semibold text-lg mb-2'>Meet Your Host</h2>
      <div className='flex items-center space-x-2'>
        <Image
          width={50}
          height={50}
          src='/images/dp.jpg'
          alt='Display picture of the host.'
          objectFit='cover'
          className='w-15 h-15 rounded-full object-cover'
        />
        <div>
          <h3>Chef Marco</h3>
          <div className='flex items-center space-x-2'>
            <StarIcon size='18' fill='#eab308' stroke='#eab308' />{' '}
            <span>4.9 Ratings</span>
          </div>
        </div>
      </div>

      <p className='text-muted-foreground my-2'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur,
        expedita!
      </p>

      <div className='text-muted-foreground flex flex-col items-center mt-5'>
        <span>
          <Lock />
        </span>
        <p className='text-muted-foreground'>
          Contact Information available after booking
        </p>
      </div>
      {/* <Button className='w-full mt-5 cursor-pointer' variant='outline'>
        <Phone />
        Contact on WhatsApp
      </Button> */}
    </div>
  );
};

export default HostCard;
