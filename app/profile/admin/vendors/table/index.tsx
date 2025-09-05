import { DataTable } from '@/components/datatable';
import { HTMLAttributes } from 'react';
import { getVendors } from '@/lib/data/profile/vendors/get-vendors';
import { columns } from './col';

interface Props extends HTMLAttributes<HTMLDivElement> {}

const VendorsTable = async ({ ...props }: Props) => {
  const { data } = await getVendors();

  return (
    <div {...props}>
      <DataTable columns={columns} data={data || []} />
    </div>
  );
};

export default VendorsTable;
