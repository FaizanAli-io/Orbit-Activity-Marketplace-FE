import React from 'react';

import { CheckCircle } from 'lucide-react';

const WhatsIncluded = () => {
  return (
    <div className='my-10'>
      <h2 className='text-2xl font-semibold mb-2'>Whats included</h2>
      <ul className='text-muted-foreground space-y-4'>
        {new Array(5).fill(null).map((_, i) => (
          <li className='flex space-x-2' key={i}>
            <CheckCircle size='25' className='mt-1.5 text-emerald-600' />
            <span>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea fugit
              odit officia, debitis fugiat nesciunt esse similique, modi aut
              deleniti ducimus a qui ex illum facilis neque, maxime labore
              nobis?
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WhatsIncluded;
