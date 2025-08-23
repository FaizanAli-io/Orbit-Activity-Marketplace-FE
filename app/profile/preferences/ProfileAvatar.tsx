import {
  Avatar,
  AvatarIndicator,
  AvatarImage,
  AvatarFallback,
} from '@/components/ui/avatar';
import { Camera, UserRound } from 'lucide-react';

const ProfileAvatar = () => {
  return (
    <div className='flex flex-wrap gap-6'>
      <Avatar className='size-20'>
        <AvatarImage src='/media/avatars/14.png' alt='Profile picture.' />
        <AvatarFallback className='bg-secondary'>
          <UserRound size='36' />
        </AvatarFallback>
        <AvatarIndicator className='size-8 -end-2 -bottom-2 bg-black rounded-full p-2'>
          <Camera className='text-white' />
        </AvatarIndicator>
      </Avatar>
    </div>
  );
};

export default ProfileAvatar;
