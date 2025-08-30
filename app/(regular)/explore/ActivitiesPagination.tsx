import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  baseURL?: string;
}

function ActivitiesPagination({
  page,
  limit,
  total,
  totalPages,
  hasNext,
  hasPrev,
  baseURL = '/explore',
  ...props
}: Props) {
  return (
    <Pagination {...props}>
      <PaginationContent>
        {hasPrev && (
          <PaginationItem>
            <PaginationPrevious href={`${baseURL}?page=${page - 1}`} />
          </PaginationItem>
        )}

        {totalPages > 1 &&
          new Array(totalPages).fill(null).map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                isActive={i + 1 === page}
                href={`${baseURL}?page=${i + 1}`}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

        {hasNext && (
          <PaginationItem>
            <PaginationNext href={`${baseURL}?page=${page + 1}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

export default ActivitiesPagination;
