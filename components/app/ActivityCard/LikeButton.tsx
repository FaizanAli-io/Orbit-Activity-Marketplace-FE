'use client';

import { Heart } from 'lucide-react';
import React, { useState } from 'react';
import { handleLike } from './action-like';
import { toast } from 'sonner';

interface Props {
  activityId: number;
}

const LikeButton = ({ activityId }: Props) => {
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);

    const { success, error, data } = await handleLike(activityId);

    if (success) {
      console.log(data);
    } else toast.error(error || 'Something went wrong, try again.');

    setLoading(false);
  };

  return (
    <Heart
      onClick={!loading ? handleClick : undefined}
      className=' md:size-5 translate-y-1 md:translate-0 cursor-pointer'
    />
  );
};

export default LikeButton;
