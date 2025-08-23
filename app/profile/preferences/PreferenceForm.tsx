'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { schema } from './schema';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { updateUser } from './action';
import { toast } from 'sonner';
import LoadingButton from '@/components/app/LoadingButton';
import { MultiGroupCombobox } from '@/components/multi-combobox';
import { useCategories } from '@/lib/data/categories/use-categories';
import { Skeleton } from '@/components/ui/skeleton';
import Avatar from './ProfileAvatar';
import ProfileAvatar from './ProfileAvatar';

interface Props {
  data: {
    name?: string;
    phone?: string;
    preferences?: number[];
    avatar?: string;
    email?: string;
  };
}

type Data = z.infer<typeof schema>;

const PreferenceForm = ({
  data: { name, phone, preferences, avatar, email },
}: Props) => {
  const [loading, setLoading] = useState<boolean>();

  const { data: categories, isFetched } = useCategories();

  const form = useForm<Data>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: name || '',
      email: email || '',
      phone: phone || '',
      preferences: [],
      avatar: avatar || '',
    },
  });

  const onSubmit = async (data: Data) => {
    setLoading(true);

    // const { success, error, data: res } = await updateUser(data);

    // if (success) toast.success('Record updated.');
    // else toast.error(error, { richColors: true });

    console.log(data);

    setLoading(false);
  };

  useEffect(() => {
    console.log(form.getFieldState('preferences'));
  }, [form.getFieldState('preferences')]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
        <FormField
          control={form.control}
          name='avatar'
          render={({ field }) => (
            <FormItem className='w-full flex justify-center'>
              <FormControl>
                <ProfileAvatar />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex flex-col md:flex-row space-x-2 space-y-5 md:space-y-0'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Email</FormLabel>
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
              <FormItem className='flex-1'>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='preferences'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferences</FormLabel>
              <FormControl>
                {!isFetched || !categories || !categories?.length ? (
                  <Skeleton className='w-full h-9 rounded-md' />
                ) : (
                  <MultiGroupCombobox
                    groups={categories.map(c => ({
                      group: c.name,
                      options: c.subcategories.map(sub => ({
                        value: String(sub.id),
                        label: sub.name,
                      })),
                    }))}
                    onChange={field.onChange}
                    placeholder='Select Preferences'
                    value={field.value.map(v => String(v))}
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 
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
        /> */}

        <div className='flex justify-end space-x-2 mt-10'>
          <LoadingButton
            variant={'secondary'}
            type='submit'
            disabled={loading}
            loading={loading}
          >
            Save
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default PreferenceForm;
