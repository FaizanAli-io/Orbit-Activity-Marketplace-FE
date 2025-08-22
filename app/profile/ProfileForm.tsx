'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { profileSchema } from './schema';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import PreferencesBadges from '@/app/me/profile/preferences/PreferencesBadges';

interface Props {
  data: {
    name?: string;
    phone?: string;
    preferences?: number[];
    email: string;
  };
}
type Data = z.infer<typeof profileSchema>;

const ProfileForm = ({ data: { name, phone, preferences, email } }: Props) => {
  const form = useForm<Data>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: name || '',
      email: email || '',
      phone: phone || '',
      preferences: preferences || [],
    },
  });

  const onSubmit = (data: Data) => {
    console.log(data, 'profile data');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder='profile@email.com' />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input {...field} placeholder='+92318732875' />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='preferences'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferences</FormLabel>
              <FormControl>
                <PreferencesBadges
                  selected={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type='submit'>Save changes</Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
