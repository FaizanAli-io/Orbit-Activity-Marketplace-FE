'use client';

import { Heart } from 'lucide-react';
import React, { useState } from 'react';
import { likeActivity, unlikeActivity } from './action-like';
import { toast } from 'sonner';

interface Props {
  activityId: number;
  liked?: boolean;
}

const LikeButton = ({ activityId, liked = false }: Props) => {
  const [loading, setLoading] = useState(false);
  const [optLike, setOptLike] = useState(false);
  const [interacted, setInteracted] = useState(false);

  const handleLike = async () => {
    setLoading(true);
    setOptLike(true);

    const { success, error } = await likeActivity(activityId);
    if (!success) toast.error(error || 'Something went wrong, try again.');

    setLoading(false);
  };

  const handleUnlike = async () => {
    setLoading(true);
    setOptLike(false);

    const { success, error } = await unlikeActivity(activityId);
    if (!success) toast.error(error || 'Something went wrong, try again.');

    setLoading(false);
  };

  const handleClick = async () => {
    if (loading) return;

    setInteracted(true);

    if (!liked) return handleLike();

    return handleUnlike();
  };

  const finalLike = interacted ? optLike : loading ? optLike : liked;
  return (
    <Heart
      onClick={handleClick}
      fill={finalLike ? '#f25268' : 'transparent'}
      stroke={finalLike ? '#f25268' : '#555'}
      className=' md:size-5.5 translate-y-1 md:translate-0 cursor-pointer'
    />
  );
};

export default LikeButton;
