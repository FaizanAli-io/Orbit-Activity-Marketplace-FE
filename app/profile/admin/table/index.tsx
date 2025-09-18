import { DataTable } from '@/components/datatable';
import { columns } from './col';
import { HTMLAttributes } from 'react';
import { getUsers } from '@/lib/data/profile/users/get-users';

interface Props extends HTMLAttributes<HTMLDivElement> {}

const UsersTable = async ({ ...props }: Props) => {
  const response = await getUsers();
  const users = Array.isArray(response?.data) ? response.data : [];

  return (
    <div {...props}>
      <DataTable columns={columns} data={users} />
    </div>
  );
};

export default UsersTable;
