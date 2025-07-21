import { cn } from '@/lib/utils';
import { StarIcon } from 'lucide-react';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  ratings: number;
  iconSize?: number;
}

const Ratings = ({ ratings, className, iconSize = 17, ...props }: Props) => {
  ratings = Math.min(5, ratings);
  const remaning = 5 - ratings;

  return (
    <div {...props} className={cn('flex', className)}>
      {new Array(ratings).fill(null).map((_, i) => (
        <StarIcon size={iconSize} fill='#eab308' stroke='#eab308' key={i} />
      ))}
      {new Array(remaning).fill(null).map((_, i) => (
        <StarIcon size={iconSize} stroke='#eab308' key={i} />
      ))}
    </div>
  );
};

export default Ratings;
