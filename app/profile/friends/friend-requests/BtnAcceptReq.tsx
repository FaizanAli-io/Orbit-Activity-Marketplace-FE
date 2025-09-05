'use client';
import LoadingButton from '@/components/app/LoadingButton';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { acceptFriendReq } from '../actions/request-actions';
import { toast } from 'sonner';

interface Props {
  id: number;
}

const BtnAcceptReq = ({ id }: Props) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    const { success, error } = await acceptFriendReq(id);
    if (!success) toast.error(error || 'Request was not accepted. Try again.');
    else {
      toast.success('request accepted!');
      setSuccess(true);
    }

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
          <Check /> <span className='text-sm'>Accept Request</span>
        </>
      ) : (
        <span className='text-sm'>Accepted</span>
      )}
    </LoadingButton>
  );
};

export default BtnAcceptReq;
