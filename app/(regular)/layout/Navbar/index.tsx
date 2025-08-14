import Button3D from '@/components/app/Button3D';
import { data } from './data';
import NavbarSheet from './NavbarSheet';
import NavLink from './NavLink';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import Image from 'next/image';
import Link from 'next/link';

export default async function Navbar() {
  // const user = await getUser();

  return (
    <div className='flex justify-between items-center w-full px-10'>
      <Link href='/'>
        <Image
          src='/images/logo.png'
          width={'80'}
          height={'80'}
          alt='Orbit Logo.'
          className='-translate-x-4.5 translate-y-2'
        />
      </Link>
      <NavigationMenu className='hidden md:block'>
        <NavigationMenuList>
          {data.map((item, i) => (
            <NavLink key={i} href={item.href}>
              {item.text}
            </NavLink>
          ))}

          <NavigationMenuItem className='ml-4'>
            <Button3D variant={'outline'}>
              <Link href='/signup'>Join</Link>
            </Button3D>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button3D>
              <Link href='/login'>Login</Link>
            </Button3D>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className='md:hidden'>
        <NavbarSheet />
      </div>
    </div>
  );
}
