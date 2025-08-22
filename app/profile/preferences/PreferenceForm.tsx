'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { schema } from './schema';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import Uploader from '@/components/app/Uploader';
import PreferencesBadges from './PreferencesBadges';
import { updateUser } from './action';
import { toast } from 'sonner';
import LoadingButton from '@/components/app/LoadingButton';

interface Props {
  data: {
    name?: string;
    phone?: string;
    preferences?: number[];
    avatar?: string;
    // email: string;
  };
}

type Data = z.infer<typeof schema>;

const PreferenceForm = ({
  data: { name, phone, preferences, avatar },
}: Props) => {
  const [loading, setLoading] = useState<boolean>();

  const form = useForm<Data>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: name || '',
      // email: email || '',
      phone: phone || '',
      preferences: preferences || [],
      avatar: avatar || '',
    },
  });

  const onSubmit = async (data: Data) => {
    setLoading(true);

    const { success, error, data: res } = await updateUser(data);

    if (success) toast.success('Record updated.');
    else toast.error(error, { richColors: true });

    setLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
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
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='preferences'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='mb-2'>Preferences</FormLabel>
              <FormControl>
                <PreferencesBadges
                  selected={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='avatar'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <Uploader
                  maxFiles={1}
                  maxSizeInMbs={5}
                  setUrl={field.onChange}
                  imageUrl={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex justify-end space-x-2 mt-10'>
          <LoadingButton type='submit' disabled={loading} loading={loading}>
            Save
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default PreferenceForm;
