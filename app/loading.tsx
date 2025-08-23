import { Loader2 } from 'lucide-react';
import React from 'react';

const Loading = () => {
  return (
    <div className='h-screen w-full grid place-content-center'>
      <Loader2 className='mr-2 h-20 w-20 animate-spin text-primary' />
    </div>
  );
};

export default Loading;
