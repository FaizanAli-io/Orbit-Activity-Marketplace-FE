import { Button } from '@/components/ui/button';
import { data } from './data';
import { MountainIcon } from 'lucide-react';
import Link from 'next/link';
import NavbarSheet from './NavbarSheet';
import NavLink from './NavLink';
import SearchDropdown from './SearchDropdown';

export default function Navbar() {
  return (
    <header className='sticky top-0 z-50 w-full  border-b bg-white'>
      <div className='container mx-auto flex h-16 max-w-6xl items-center justify-between px-4'>
        <div className='flex space-x-4 items-center'>
          <Link href='/' className='flex items-center gap-2' prefetch={false}>
            <MountainIcon className='h-6 w-6' />
            <span className='sr-only'>Orbit</span>
          </Link>

          <nav className='hidden items-center gap-2 text-sm font-medium md:flex'>
            {data.map((item, i) => (
              <NavLink key={i} href={item.href}>
                {item.text}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className='flex items-center gap-4'>
          <SearchDropdown />
          <div className='hidden items-center gap-2 text-sm font-medium md:flex'>
            <Button variant='outline'>
              <Link href='/login'>Sign in</Link>
            </Button>
          </div>
          <NavbarSheet />
        </div>
      </div>
    </header>
  );
}
