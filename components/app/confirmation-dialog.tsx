import React, { ReactNode } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Props {
  children: ReactNode;
  onAction?: () => void;
  onCancel?: () => void;
  title: string;
  description?: string;
  cancelText?: string;
  actionText?: string;
}

const ConfirmationDialog = ({
  children,
  title,
  description,
  cancelText,
  actionText,
  onAction,
  onCancel,
}: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className='w-full'>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>
            {cancelText || 'Cancel'}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onAction}>
            {actionText || 'Confirm'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
