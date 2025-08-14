'use client';
import Button3D from '@/components/app/Button3D';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

const schema = z.object({
  email: z.email(),
});

type Data = z.infer<typeof schema>;

const NewsletterForm = () => {
  const form = useForm<Data>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (_: Data) => {
    toast.success('Subscribed to the Newsletter!');
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        className='space-y-2 md:space-y-0 md:space-x-2 md:flex md:items-center '
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder='Your Email Here' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button3D className='w-full md:w-auto' variant={'outline'}>
          Join
        </Button3D>
      </form>
    </Form>
  );
};

export default NewsletterForm;
