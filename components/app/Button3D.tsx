import React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { Button, buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';

type Props = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button3D = ({ children, className, variant, ...props }: Props) => {
  return (
    <Button
      variant={variant}
      className={cn(
        'shadow-none border-y-[1.5px] border-x-[1.5px] border-b-[4px] border-primary-500 active:border-b-[1.5px] cursor-pointer',
        {
          'border-gray-400/60': variant === 'outline',
        },
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default Button3D;
