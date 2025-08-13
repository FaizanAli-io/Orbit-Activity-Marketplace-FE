import React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { Button, buttonVariants } from '../ui/button';
import { Loader2 } from 'lucide-react';

type Props = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  };

const LoadingButton = ({ children, loading = false, ...props }: Props) => {
  return (
    <Button {...props}>
      {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
      {children}
    </Button>
  );
};

export default LoadingButton;
