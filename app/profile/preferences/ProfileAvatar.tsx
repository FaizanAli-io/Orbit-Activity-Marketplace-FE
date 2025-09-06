'use client';

import {
  Avatar,
  AvatarIndicator,
  AvatarImage,
  AvatarFallback,
} from '@/components/ui/avatar';
import { configs } from '@/lib/config';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { Camera, UserRound } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { updateAvatar } from './action-update-avatar';

interface Props {
  value?: string;
  onChange: (url: string) => void;
}

const ProfileAvatar = ({ value, onChange }: Props) => {
  const [dp, setDp] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  // const [key, setKey] = useState('');

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const url = URL.createObjectURL(file);
        onChange?.(url);
        setDp(URL.createObjectURL(file));
        uploadFile(file);
      }
    },
    [onChange]
  );

  const uploadFile = async (file: File) => {
    setUploading(true);

    try {
      const presignedUrlRes = await fetch('/api/s3/upload', {
        method: HTTP_VERB.POST,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name.replace(/\s+/g, '-'),
          contentType: file.type,
          size: file.size,
        }),
      });

      if (!presignedUrlRes.ok) {
        toast.error('Failed to get presigned URL', { richColors: true });
        setUploading(false);
        setProgress(0);
        return;
      }

      const { presignedUrl, key } = await presignedUrlRes.json();
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = e => {
          if (e.lengthComputable) {
            const progress = (e.loaded / e.total) * 100;
            setProgress(progress);
          }
        };

        // In the uploadFile function, modify the success case:
        xhr.onload = async () => {
          if (xhr.status === 200 || xhr.status === 204) {
            if (key) {
              const url = getS3Url(key);
              onChange(url);
              setDp(url);

              // Automatically update user avatar using the dedicated action
              try {
                const { success, error } = await updateAvatar({ avatar: url });
                if (success) {
                  toast.success('Profile picture updated successfully');
                } else {
                  toast.error(error || 'Failed to update profile picture');
                }
              } catch (updateError) {
                toast.error('Failed to update profile picture');
                console.error('Avatar update error:', updateError);
              }
            }

            resolve();
          } else
            reject(new Error(`Upload failed with a status of ${xhr.status}`));
        };

        xhr.upload.onerror = () => {
          reject(new Error('Upload failed'));
        };

        xhr.open(HTTP_VERB.PUT, presignedUrl);
        xhr.setRequestHeader('Content-Type', file.type);
        xhr.send(file);
      });
    } catch {
      toast.error('Upload failed', { richColors: true });
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  });

  const getAvatar = () => {
    if (isDragActive)
      return (
        <div className='bg-primary text-white flex justify-center items-center rounded-full p-2 text-center min-w-20 min-h-5'>
          <p>Drop</p>
        </div>
      );

    if (uploading)
      return (
        <div className='bg-primary text-white flex justify-center items-center rounded-full p-2 text-center min-w-20 min-h-5'>
          <p>{Math.floor(progress)}%</p>
        </div>
      );

    return (
      <>
        <AvatarImage
          src={dp || value}
          alt='Profile picture.'
          className='object-cover bg-secondary aspect-square ring-3'
        />
        <AvatarFallback className='bg-secondary'>
          <UserRound size='36' />
        </AvatarFallback>

        <AvatarIndicator className='size-8 -end-2 -bottom-2 bg-black rounded-full p-2 hover:bg-gray-800 transition-colors'>
          <Camera className='text-white' />
        </AvatarIndicator>
      </>
    );
  };

  return (
    <div className='flex flex-wrap gap-6'>
      <div {...getRootProps()} className='relative cursor-pointer'>
        <input {...getInputProps()} />
        <Avatar className='size-20'>{getAvatar()}</Avatar>
      </div>
    </div>
  );
};

export default ProfileAvatar;

function getS3Url(key: string) {
  return `https://${configs.S3BucketName}.s3.${configs.S3Region}.amazonaws.com/${key}`;
}
