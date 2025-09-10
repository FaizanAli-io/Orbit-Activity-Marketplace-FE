'use client';

import ConfirmationDialog from '@/components/app/confirmation-dialog';
import LoadingButton from '@/components/app/LoadingButton';
import { MouseEvent, useState } from 'react';
import { deleteAccount } from './action-delete-acc';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const BtnDeleteAcc = () => {
  const [loading, setloading] = useState(false);
  const router = useRouter();

  const handleDelete = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setloading(true);

    const { success, error } = await deleteAccount();

    if (!success || error) {
      setloading(false);
      toast.error(error || 'Something went wrong! try again later', {
        richColors: true,
      });
    } else router.replace('/logout');
  };

  return (
    <div>
      <ConfirmationDialog
        title='Are you sure you want to delete your account?'
        btnClassName='bg-red-600 hover:bg-red-500 active:bg-red-700'
        onAction={handleDelete}
        loadingAction={loading}
        loadingActionText='Deleting...'
      >
        <LoadingButton variant={'destructive'} type='button'>
          Delete Account
        </LoadingButton>
      </ConfirmationDialog>
    </div>
  );
};

export default BtnDeleteAcc;
