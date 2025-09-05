'use client';
import LoadingButton from '@/components/app/LoadingButton';
import { UserPlus } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { sendFriendReq } from './actions/request-actions';
import { toast } from 'sonner';

interface Props {
  id: number;
}

const CardButton = ({ id }: Props) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    const { success, error } = await sendFriendReq(id);
    if (!success) toast.error(error || 'Request was not sent. Try again.');
    else toast.success('Friend request sent!');

    setLoading(false);
  };

  return (
    <LoadingButton
      loading={loading}
      disabled={loading}
      variant={'secondary'}
      size='sm'
      onClick={handleClick}
    >
      {!success ? (
        <>
          <UserPlus /> <span className='text-sm'>Add Friend</span>
        </>
      ) : (
        <span className='text-sm'>Request Sent</span>
      )}
    </LoadingButton>
  );
};

export default CardButton;
