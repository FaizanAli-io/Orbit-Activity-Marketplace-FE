'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { HTMLAttributes, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props extends HTMLAttributes<HTMLDivElement> {
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  baseURL?: string;
}

// Loading state type
type LoadingState =
  | { type: 'prev'; page: number }
  | { type: 'next'; page: number }
  | { type: 'number'; page: number }
  | null;

function ActivitiesPagination({
  page,
  totalPages,
  hasNext,
  hasPrev,
  baseURL = '/explore',
  ...props
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loadingPage, setLoadingPage] = useState<LoadingState>(null);

  const handlePageChange = (
    newPage: number,
    type: 'prev' | 'next' | 'number'
  ) => {
    if (loadingPage !== null) return;

    setLoadingPage({ type, page: newPage });

    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));

    router.push(`${baseURL}?${params.toString()}`);
  };

  return (
    <Pagination {...props}>
      <PaginationContent>
        {/* Previous Button */}
        {hasPrev && (
          <PaginationItem>
            <PaginationPrevious
              href={`${baseURL}?page=${page - 1}`}
              loading={loadingPage?.type === 'prev'}
              onClick={e => {
                e.preventDefault();
                handlePageChange(page - 1, 'prev');
              }}
            />
          </PaginationItem>
        )}

        {/* Numbered Page Buttons */}
        {totalPages > 1 &&
          new Array(totalPages).fill(null).map((_, i) => {
            const pageNumber = i + 1;
            return (
              <PaginationItem key={i}>
                <PaginationLink
                  className={cn({
                    'pointer-events-none':
                      loadingPage?.type === 'number' &&
                      loadingPage.page === pageNumber,
                  })}
                  isActive={pageNumber === page}
                  href={`${baseURL}?page=${pageNumber}`}
                  onClick={e => {
                    e.preventDefault();
                    if (pageNumber !== page) {
                      handlePageChange(pageNumber, 'number');
                    }
                  }}
                >
                  {loadingPage?.type === 'number' &&
                  loadingPage.page === pageNumber ? (
                    <Loader2 className='h-4 w-4 animate-spin' />
                  ) : (
                    pageNumber
                  )}
                </PaginationLink>
              </PaginationItem>
            );
          })}

        {/* Next Button */}
        {hasNext && (
          <PaginationItem>
            <PaginationNext
              loading={loadingPage?.type === 'next'}
              className={cn({
                'pointer-events-none': loadingPage?.type === 'next',
              })}
              href={`${baseURL}?page=${page + 1}`}
              onClick={e => {
                e.preventDefault();
                handlePageChange(page + 1, 'next');
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

export default ActivitiesPagination;
