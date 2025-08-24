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
}

function ActivitiesPagination({
  page,
  limit,
  total,
  totalPages,
  hasNext,
  hasPrev,
  ...props
}: Props) {
  return (
    <Pagination {...props}>
      <PaginationContent>
        {hasPrev && (
          <PaginationItem>
            <PaginationPrevious href={`/explore?page=${page - 1}`} />
          </PaginationItem>
        )}

        {new Array(totalPages).fill(null).map((_, i) => (
          <PaginationItem>
            <PaginationLink
              isActive={i + 1 === page}
              href={`/explore?page=${i + 1}`}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {hasNext && (
          <PaginationItem>
            <PaginationNext href={`/explore?page=${page + 1}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

export default ActivitiesPagination;
