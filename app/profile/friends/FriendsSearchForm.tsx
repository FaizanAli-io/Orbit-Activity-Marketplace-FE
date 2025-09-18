'use client';
import LoadingButton from '@/components/app/LoadingButton';
import { Form, FormField } from '@/components/ui/form';
import { Input, InputWrapper } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const schema = z.object({
  name: z.string().max(255, 'cannot exceed 255 characters.'),
});

type Data = z.infer<typeof schema>;

interface Props {
  search?: string;
  baseURL?: string;
}

const FriendsSearchForm = ({
  search = '',
  baseURL = '/profile/friends',
}: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<Data>({
    resolver: zodResolver(schema),
    defaultValues: { name: search },
  });

  const onSubmit = ({ name }: Data) => {
    setLoading(true);
    if (name.length) router.push(`${baseURL}?name=${encodeURIComponent(name)}`);
    else router.push(baseURL);
  };

  useEffect(() => {
    setLoading(false);
  }, [searchParams.toString()]);

  return (
    <Form {...form}>
      <form
        className='flex items-stretch bg-white rounded-lg p-0'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <InputWrapper className='px-1'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <div className='flex items-center space-x-5 w-full'>
                <Search className='size-5 translate-x-2' />
                <Input
                  {...field}
                  placeholder='Search friends...'
                  className='text-[1rem]'
                  disabled={loading}
                />
              </div>
            )}
          />
          <LoadingButton className='px-5' disabled={loading} loading={loading}>
            Search
          </LoadingButton>
        </InputWrapper>
      </form>
    </Form>
  );
};

export default FriendsSearchForm;
