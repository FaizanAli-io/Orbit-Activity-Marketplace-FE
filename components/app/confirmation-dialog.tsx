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
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface Props {
  children: ReactNode;
  onAction?: (() => void) | ((e: React.MouseEvent<HTMLElement>) => void);
  onCancel?: () => void;
  title: string;
  description?: string;
  cancelText?: string;
  actionText?: string;
  btnClassName?: string;
  loadingAction?: boolean;
  loadingActionText?: string;
}

const ConfirmationDialog = ({
  children,
  title,
  description,
  cancelText,
  actionText,
  onAction,
  onCancel,
  btnClassName,
  loadingAction = false,
  loadingActionText = '',
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
          <AlertDialogCancel disabled={loadingAction} onClick={onCancel}>
            {cancelText || 'Cancel'}
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={loadingAction}
            onClick={onAction}
            className={cn(btnClassName)}
          >
            {loadingAction ? (
              <>
                <Loader2 className='animate-spin' /> {loadingActionText}
              </>
            ) : (
              actionText || 'Confirm'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
