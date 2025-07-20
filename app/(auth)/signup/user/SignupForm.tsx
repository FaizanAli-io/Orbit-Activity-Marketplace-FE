import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserForm } from './UserForm';
import { VendorForm } from '../vendor/VendorForm';

enum values {
  user = 'user',
  vendor = 'vendor',
}

const SignupForm = () => {
  return (
    <Tabs defaultValue={values.user}>
      <TabsList className='mb-5 w-full'>
        <TabsTrigger value={values.user}>User</TabsTrigger>
        <TabsTrigger value={values.vendor}>Vendor</TabsTrigger>
      </TabsList>
      <TabsContent value={values.user}>
        <UserForm />
      </TabsContent>
      <TabsContent value={values.vendor}>
        <VendorForm />
      </TabsContent>
    </Tabs>
  );
};

export default SignupForm;
