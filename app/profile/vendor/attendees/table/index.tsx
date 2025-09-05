import { DataTable } from '@/components/datatable';
import { columns } from './col';
import { getAttendees } from '@/lib/data/activities/get-attendees';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  eventId: number;
}

const AteendeesTable = async ({ eventId, ...props }: Props) => {
  const { data } = await getAttendees(eventId);

  return (
    <div {...props}>
      <DataTable columns={columns} data={data || []} />
    </div>
  );
};

export default AteendeesTable;
