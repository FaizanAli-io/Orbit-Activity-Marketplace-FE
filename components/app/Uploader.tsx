'use client';
import React, { useCallback, useState } from 'react';

import { Accept, FileRejection, useDropzone } from 'react-dropzone';
import { Card, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { v4 as uuid } from 'uuid';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { Loader2, Trash2 } from 'lucide-react';
import { configs } from '@/lib/config';

interface Props {
  maxFiles?: number;
  maxSizeInMbs?: number;
  allowImageUpload?: boolean;
  allowVideoUpload?: boolean;
  setUrls?: (url: string[]) => void;
  setUrl?: (url: string) => void;
  imageUrls?: string[];
  imageUrl?: string;
  videoUrl?: string;
  removeUrl?: (url: string) => void;
}

type FileType = Array<{
  id: string;
  file: File;
  uploading: boolean; // is file currently being uploaded
  progress: number; // upload progress in percentage
  key?: string; // key of the file in the storage
  isDeleting: boolean; // is currently being deleted
  error: boolean;
  objectUrl?: string; // local url (to render file while being uploaded)
}>;

const Uploader = ({
  maxFiles = 100,
  maxSizeInMbs = 100,
  allowImageUpload = true,
  allowVideoUpload = false,
  setUrls,
  setUrl,
  removeUrl,
  imageUrls = [],
  imageUrl = '',
  videoUrl = '',
}: Props) => {
  const [files, setFiles] = useState<FileType>([]);

  const removeFile = async (fileId: string) => {
    const fileToRemove = files.find(f => f.id === fileId);

    if (!fileToRemove || !fileToRemove.objectUrl) return;

    URL.revokeObjectURL(fileToRemove.objectUrl);

    try {
      setFiles(prev =>
        prev.map(f => (f.id === fileId ? { ...f, isDeleting: true } : { ...f }))
      );

      const res = await fetch('/api/s3/delete', {
        method: HTTP_VERB.DELETE,
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          key: fileToRemove.key,
        }),
      });

      if (!res.ok) {
        toast.error('Failed to delete file', { richColors: true });
        setFiles(prev =>
          prev.map(f =>
            f.id === fileId
              ? { ...f, isDeleting: false, error: true }
              : { ...f }
          )
        );

        return;
      }

      setFiles(prev => prev.filter(f => f.id !== fileId));

      toast.success('File deleted');
    } catch {
      toast.error('Failed to delete file', { richColors: true });
      setFiles(prev =>
        prev.map(f =>
          f.id === fileId ? { ...f, isDeleting: false, error: true } : { ...f }
        )
      );
    }
  };

  const uploadFile = useCallback(
    () => async (file: File) => {
      setFiles(prev =>
        prev.map(f => (f.file === file ? { ...f, uploading: true } : { ...f }))
      );

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

          setFiles(prev =>
            prev.map(f =>
              f.file === file
                ? { ...f, uploading: false, progress: 0, error: true }
                : { ...f }
            )
          );
          return;
        }

        const { presignedUrl, key } = await presignedUrlRes.json();
        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();

          xhr.upload.onprogress = e => {
            if (e.lengthComputable) {
              const progress = (e.loaded / e.total) * 100;

              setFiles(prev => {
                return prev.map(f => {
                  if (f.file === file) {
                    return {
                      ...f,
                      progress: Math.round(progress),
                      key,
                      uploading: true,
                    };
                  }

                  return { ...f };
                });
              });
            }
          };

          // In the uploadFile function, modify the success case:
          xhr.onload = () => {
            if (xhr.status === 200 || xhr.status === 204) {
              setFiles(prev =>
                prev.map(f => {
                  if (f.file === file) {
                    const objectUrl = f.key ? getS3Url(f.key) : f.objectUrl!;
                    if (objectUrl && setUrl) setUrl(objectUrl);
                    if (setUrls && objectUrl)
                      setUrls([...imageUrls, objectUrl]);

                    return {
                      ...f,
                      progress: 100,
                      uploading: false,
                      error: false,
                      objectUrl,
                    };
                  }

                  return { ...f };
                })
              );

              resolve();
            } else {
              reject(new Error(`Upload failed with a status of ${xhr.status}`));
            }
          };

          // Remove this line from onDrop:
          // if (setUrls) setUrls([...imageUrls, ...newFiles.map(f => f.objectUrl!)]);

          xhr.upload.onerror = () => {
            reject(new Error('Upload failed'));
          };

          xhr.open(HTTP_VERB.PUT, presignedUrl);
          xhr.setRequestHeader('Content-Type', file.type);
          xhr.send(file);
        });
      } catch {
        toast.error('Upload failed', { richColors: true });
      }
    },
    [imageUrls, setUrl, setUrls]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) return;

      // if (files.length + imageUrls.length + videoUrls.length >= maxFiles)
      if (files.length >= maxFiles)
        return toast.error(`You cannot upload more than ${maxFiles} file(s)`, {
          richColors: true,
        });

      const newFiles: FileType = acceptedFiles.map(file => ({
        id: uuid(),
        file,
        uploading: false,
        progress: 0,
        isDeleting: false,
        error: false,
        objectUrl: URL.createObjectURL(file),
      }));

      setFiles(prev => [...prev, ...newFiles]);

      acceptedFiles.forEach(uploadFile);
    },
    [uploadFile, files.length, maxFiles]
  );

  const onDropRejected = useCallback(
    (rejectedFiles: FileRejection[]) => {
      if (!rejectedFiles.length) return;

      const invalidFileType = rejectedFiles.find(
        fileRejection => fileRejection.errors[0].code === 'file-invalid-type'
      );

      const tooManyFiles = rejectedFiles.find(
        fileRejection => fileRejection.errors[0].code === 'too-many-files'
      );

      const tooLargeFile = rejectedFiles.find(
        fileRejection => fileRejection.errors[0].code === 'file-too-large'
      );

      if (invalidFileType)
        return toast.error('File type not supported', { richColors: true });

      if (tooManyFiles)
        return toast.error(`You can only upload ${maxFiles} files.`, {
          richColors: true,
        });

      if (tooLargeFile)
        return toast.error('File is too large', { richColors: true });
    },
    [maxFiles]
  );

  const accept: Accept = {};
  if (allowImageUpload) accept['image/*'] = [];
  if (allowVideoUpload) accept['video/mp4'] = [];

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    maxFiles: maxFiles || 5,
    maxSize: 1024 * 1024 * (maxSizeInMbs || 50), // 50 MBs,
    accept,
  });

  return (
    <>
      <Card
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed transition-colors duration_200 ease-in-out w-full h-64',
          {
            'border-primary bg-primary/10 border-solid': isDragActive,
            'border-border hover:border-primary': !isDragActive,
          }
        )}
      >
        <CardContent className='flex flex-col justify-center items-center h-full w-full'>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop files here ...</p>
          ) : (
            <div className='flex flex-col items-center justify-center h-full w-full gap-y-3'>
              <p className='text-center'>
                Drag &apos;n&apos; Drop some files here, or click to select
                files
              </p>
              <Button className='cursor-pointer'>Select Files</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className='grid grid-cols-2 md:grid-cols-4 mt-6 gap-4 mb-24'>
        {imageUrl && !files.length && (
          <div className='relative aspect-square rounded-lg overflow-hidden'>
            <img src={imageUrl} className='w-full h-full object-cover' />

            <Button
              variant='destructive'
              size='icon'
              className='cursor-pointer absolute top-2 right-2'
              onClick={() => {
                if (setUrl) setUrl('');
              }}
            >
              <Trash2 className='size-4' />
            </Button>
          </div>
        )}

        {imageUrls
          .filter(url => url && !files.some(f => f.objectUrl === url))
          .map((url, i) => (
            <div
              className='relative aspect-square rounded-lg overflow-hidden'
              key={i}
            >
              <img src={url} className='w-full h-full object-cover' />

              <Button
                variant='destructive'
                size='icon'
                className='cursor-pointer absolute top-2 right-2'
                onClick={() => {
                  if (removeUrl && url) removeUrl(url);
                }}
              >
                <Trash2 className='size-4' />
              </Button>
            </div>
          ))}

        {videoUrl && !files.length && (
          <div className='relative aspect-square rounded-lg overflow-hidden'>
            <video controls className='w-full h-full object-cover'>
              <source src={videoUrl} />
            </video>

            <Button
              variant='destructive'
              size='icon'
              className='cursor-pointer absolute top-2 right-2'
            >
              <Trash2 className='size-4' />
            </Button>
          </div>
        )}

        {files.map(file => (
          <div key={file.id} className='flex flex-col gap-1'>
            <div className='relative aspect-square rounded-lg overflow-hidden'>
              {file.file.type.startsWith('image/') && (
                <img
                  src={file.objectUrl!}
                  alt={file.file.name}
                  className='w-full h-full object-cover'
                />
              )}

              {file.file.type.startsWith('video/') && (
                <video controls className='w-full h-full object-cover'>
                  <source src={file.objectUrl} />
                </video>
              )}

              <Button
                variant='destructive'
                size='icon'
                className='cursor-pointer absolute top-2 right-2'
                onClick={e => {
                  e.preventDefault();
                  removeFile(file.id);
                  if (setUrl) setUrl('');
                  if (removeUrl && file.objectUrl) removeUrl(file.objectUrl);
                }}
                disabled={file.uploading || file.isDeleting}
              >
                {file.isDeleting ? (
                  <Loader2 className='animate-spin size-4' />
                ) : (
                  <Trash2 className='size-4' />
                )}
              </Button>

              {file.uploading && !file.isDeleting && (
                <div className='absolute inset-0 bg-black/50 flex items-center justify-center'>
                  <p className='text-white font-medium text-lg'>
                    {file.progress}%
                  </p>
                </div>
              )}

              {file.error && (
                <div className='absolute inset-0 bg-red-500/50 flex items-center justify-center'>
                  <p className='text-white font-medium text-lg'>Error</p>
                </div>
              )}
            </div>
            <p className='text-sm text-muted-foreground truncate'>
              {file.file.name}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Uploader;

function getS3Url(key: string) {
  return `https://${configs.S3BucketName}.s3.${configs.S3Region}.amazonaws.com/${key}`;
}
