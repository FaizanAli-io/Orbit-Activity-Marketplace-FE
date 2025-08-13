import Tagline from '@/components/ui/typography/Tagline';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  image: string;
  title: string;
  text: string;
  linkText: string;
  link: string;
}

const DiscoverCard = ({
  image,
  title,
  text,
  link,
  linkText,
  className,
  ...props
}: Props) => {
  return (
    <article {...props} className={cn('space-y-2', className)}>
      <Image
        src={image}
        alt='People hanging out.'
        width='300'
        height='300'
        objectFit='cover'
        className='object-cover w-full '
      />

      <Tagline>{title}</Tagline>
      <p>{text}</p>

      <Link href={link}>
        <span className='flex items-center'>
          {linkText} <ChevronRight size='20' className='ml-2' />
        </span>
      </Link>
    </article>
  );
};

export default DiscoverCard;
