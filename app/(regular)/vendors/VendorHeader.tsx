import { getVendors } from '@/lib/data/profile/vendors/get-vendors';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  vendorId: number;
}

const VendorHeader = async ({ vendorId, ...props }: Props) => {
  const { success, data } = await getVendors();

  if (!success || !data?.length) return <p>Vendor Not Found.</p>;

  const vendor = data.find(v => v.id === vendorId);
  if (!vendor) return <p>Vendor Not Found.</p>;

  return (
    <div {...props}>
      <h1 className='text-4xl font-semibold'>Events By {vendor.name}</h1>
      <p className='text-2xl'>{vendor.email}</p>
    </div>
  );
};

export default VendorHeader;
