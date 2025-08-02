import { data } from './data';
import { MountainIcon, UserCircle, UserRound } from 'lucide-react';
import Link from 'next/link';
import NavbarSheet from './NavbarSheet';
import NavLink from './NavLink';
import { getUser } from '@/lib/utils/cookies/user-cookies';
import { Button } from '@/components/ui/button';
// import SearchDropdown from './SearchDropdown';

export default async function Navbar() {
  const user = await getUser();

  return (
    <header className='sticky top-7 left-1/2 -translate-x-1/2 z-50 max-w-min flex space-x-2'>
      <div className='container mx-auto  flex h-12 max-w-6xl items-center justify-between px-8 bg-secondary rounded-[32]'>
        <div className='flex space-x-4 items-center'>
          <nav className='hidden items-center gap-2 text-sm font-medium md:flex'>
            {data.map((item, i) => (
              <NavLink key={i} href={item.href}>
                {item.text}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className='flex items-center gap-4'>
          <NavbarSheet />
        </div>
      </div>
      {/* bg-white rounded-full px-5 */}
      <div className='hidden items-center gap-2 text-sm font-medium md:flex'>
        {user ? (
          <Link href='/me/profile' className='bg-secondary rounded-full p-2.5'>
            <UserRound size='28' strokeWidth={1.6} />
          </Link>
        ) : (
          <Link href='/login'>
            <Button
              size='lg'
              className='cursor-pointer rounded-[30px] py-[25px] shadow-sm'
              variant={'secondary'}
            >
              Sign in
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
