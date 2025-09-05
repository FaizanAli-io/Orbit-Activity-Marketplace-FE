import { DataTable } from '@/components/datatable';
import { columns } from './col';
import { HTMLAttributes } from 'react';
import { getUsers } from '@/lib/data/profile/users/get-users';

interface Props extends HTMLAttributes<HTMLDivElement> {}

const UsersTable = async ({ ...props }: Props) => {
  const { data } = await getUsers();

  return (
    <div {...props}>
      <DataTable columns={columns} data={data || []} />
    </div>
  );
};

export default UsersTable;
