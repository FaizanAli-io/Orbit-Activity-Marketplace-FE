import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

import { ForgotPassForm } from './ForgotPassForm';

const Page = () => {
  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <div className='flex flex-col gap-6'>
          <Card>
            <CardHeader>
              <CardTitle>Forgot Password</CardTitle>
              <CardDescription>
                We will send you an email if you have a registered account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ForgotPassForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
