'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useMediaQuery } from 'usehooks-ts';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  text?: string;
  trigger: React.ReactNode;
}

export function DrawerDialog({ trigger, title, text, children }: Props) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const getHeader = () => {
    if (!title && !text) return null;

    return (
      <DrawerHeader className='text-left'>
        {title && <DrawerTitle>{title}</DrawerTitle>}
        {text && <DrawerDescription>{text}</DrawerDescription>}
      </DrawerHeader>
    );
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className='sm:max-w-[600px] max-h-[90vh] overflow-y-auto'>
          {getHeader()}
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <div className='flex flex-col overflow-y-auto max-h-[calc(100vh-10rem)] px-4'>
          {getHeader()}
          {children}
          <DrawerFooter className='pt-2'>
            <DrawerClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
