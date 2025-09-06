import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getProfile } from '@/lib/data/profile/get-profile';
import { cn } from '@/lib/utils';
import { AvatarImage } from '@radix-ui/react-avatar';
import Link from 'next/link';

interface Props {
  dropdown?: boolean;
}

const UserAvatar = async ({ dropdown = true }: Props) => {
  const profile = await getProfile();

  if (profile.error || !profile.data) return null;

  const { user, email, role } = profile.data;
  const isVendor = role === 'VENDOR';

  const getFallback = () => {
    if (user?.name) return user.name.match(/\b\w/g)?.join('').toUpperCase();

    return email[0].toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn({ 'cursor-pointer': dropdown })}>
        <Avatar className='size-9 rounded-full overflow-hidden'>
          <AvatarImage
            width={'100'}
            height={'100'}
            src={user?.avatar || ''}
            className='object-cover'
            alt={getFallback()}
          />
          <AvatarFallback>{getFallback()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      {dropdown && (
        <>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link
                href={
                  isVendor ? '/profile/vendor/dashboard' : '/profile/dashboard'
                }
              >
                Dashboard
              </Link>
            </DropdownMenuItem>

            {isVendor && (
              <DropdownMenuItem>
                <Link href='/profile/vendor/events'>Events</Link>
              </DropdownMenuItem>
            )}

            {!isVendor && (
              <DropdownMenuItem>
                <Link href='/profile'>Settings</Link>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem>
              <Link href='/logout'>Logout</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </>
      )}
    </DropdownMenu>
  );
};

export default UserAvatar;
