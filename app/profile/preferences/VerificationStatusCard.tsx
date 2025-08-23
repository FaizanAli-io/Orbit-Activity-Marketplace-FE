import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import H5 from '@/components/ui/typography/H5';
import React from 'react';

const VerificationStatusCard = () => {
  return (
    <Card className='max-h-fit'>
      <CardHeader>
        <H5 className='font-medium md:text-2xl'>Account Summary</H5>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='flex justify-between'>
          <p>Email verified</p>
          <Badge variant={'primary'} className='rounded-full px-3'>
            Verified
          </Badge>
        </div>

        <div className='flex justify-between'>
          <p>Events Attended</p>
          <p className='font-semibold'>Jan 2024</p>
        </div>

        <div className='flex justify-between'>
          <p>Friends</p>
          <p className='font-semibold'>156</p>
        </div>
        <div className='flex justify-between'>
          <p>Saved Events</p>
          <p className='font-semibold'>03</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VerificationStatusCard;
