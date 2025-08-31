// 'use client';
// import React, { useState } from 'react';
// import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
// import { logout } from './action';

// const LogoutButton = () => {
//   const [loading, setLoading] = useState(false);

//   const handleClick = async () => {
//     setLoading(true);
//     await logout();
//   };

//   return (
//     <DropdownMenuItem
//       className='cursor-pointer'
//       onClick={handleClick}
//       disabled={loading}
//     >
//       {!loading ? 'Logout' : 'logging out...'}
//     </DropdownMenuItem>
//   );
// };

// export default LogoutButton;
