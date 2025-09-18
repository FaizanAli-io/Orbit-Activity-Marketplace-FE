'use client';

import { Heart } from 'lucide-react';
import React, { useState, useTransition, useEffect } from 'react';
import { likeActivity, unlikeActivity } from './action-like';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface Props {
  activityId: number;
  liked?: boolean;
}

const LikeButton = ({ activityId, liked = false }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [optimisticLiked, setOptimisticLiked] = useState(liked);
  const router = useRouter();

  // Sync optimistic state with props when they change
  useEffect(() => {
    setOptimisticLiked(liked);
  }, [liked]);

  const handleLike = async () => {
    // Optimistic update
    setOptimisticLiked(true);

    startTransition(async () => {
      const { success, error } = await likeActivity(activityId);

      if (success) {
        toast.success('Activity liked!');
        // The server action already calls revalidatePath, but we can also refresh
        router.refresh();
      } else {
        // Revert optimistic update on error
        setOptimisticLiked(liked);
        toast.error(error || 'Something went wrong, try again.');
      }
    });
  };

  const handleUnlike = async () => {
    // Optimistic update
    setOptimisticLiked(false);

    startTransition(async () => {
      const { success, error } = await unlikeActivity(activityId);

      if (success) {
        toast.success('Activity unliked!');
        // The server action already calls revalidatePath, but we can also refresh
        router.refresh();
      } else {
        // Revert optimistic update on error
        setOptimisticLiked(liked);
        toast.error(error || 'Something went wrong, try again.');
      }
    });
  };

  const handleClick = async () => {
    if (isPending) return;

    if (optimisticLiked) {
      return handleUnlike();
    } else {
      return handleLike();
    }
  };

  return (
    <Heart
      onClick={handleClick}
      fill={optimisticLiked ? '#f25268' : 'transparent'}
      stroke={optimisticLiked ? '#f25268' : '#555'}
      className=' md:size-5.5 translate-y-1 md:translate-0 cursor-pointer'
    />
  );
};

export default LikeButton;
