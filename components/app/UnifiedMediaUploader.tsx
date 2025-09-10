'use client';

import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Star, StarOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import Uploader from '@/components/app/Uploader';

interface UnifiedMediaUploaderProps {
  images: string[];
  thumbnail: string;
  video: string;
  onImagesChange: (images: string[]) => void;
  onThumbnailChange: (thumbnail: string) => void;
  onVideoChange: (video: string) => void;
  onImageAdd: (image: string) => void;
  onImageRemove: (image: string) => void;
  onVideoRemove?: () => void;
}

export default function UnifiedMediaUploader({
  images,
  thumbnail,
  video,
  onThumbnailChange,
  onVideoChange,
  onImageAdd,
  onImageRemove,
  onVideoRemove,
}: UnifiedMediaUploaderProps) {
  const handleImageAdd = (imageUrl: string) => {
    onImageAdd(imageUrl);

    // If no thumbnail is set and this is the first image, set it as thumbnail
    if (!thumbnail && images.length === 0) {
      onThumbnailChange(imageUrl);
    }
  };

  const handleImageRemove = (imageUrl: string) => {
    onImageRemove(imageUrl);

    // If the removed image was the thumbnail, clear thumbnail
    if (thumbnail === imageUrl) {
      // Set the first remaining image as thumbnail, or empty if no images left
      const remainingImages = images.filter(img => img !== imageUrl);
      onThumbnailChange(remainingImages.length > 0 ? remainingImages[0] : '');
    }
  };

  const handleThumbnailSelect = (imageUrl: string) => {
    onThumbnailChange(imageUrl);
  };

  const handleRemoveThumbnail = () => {
    onThumbnailChange('');
  };

  const handleVideoRemove = () => {
    onVideoChange('');
    if (onVideoRemove) {
      onVideoRemove();
    }
  };

  return (
    <div className='space-y-6'>
      {/* Images Upload Section */}
      <div className='space-y-3'>
        <Label className='text-base font-medium'>Images</Label>

        <Uploader
          maxFiles={50}
          maxSizeInMbs={20}
          setUrl={handleImageAdd}
          imageUrls={images}
          removeUrl={handleImageRemove}
        />

        <p className='text-sm text-muted-foreground'>
          Upload activity images. You can select one as thumbnail after
          uploading.
        </p>
      </div>

      {/* Thumbnail Selection Section */}
      {images.length > 0 && !thumbnail && (
        <div className='space-y-3'>
          <Label className='text-base font-medium'>Select Thumbnail</Label>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {images.map((imageUrl, index) => (
              <div
                key={imageUrl}
                className={cn(
                  'relative aspect-square rounded-lg border-2 cursor-pointer transition-all hover:border-primary/50',
                  'border-border hover:border-border'
                )}
                onClick={() => handleThumbnailSelect(imageUrl)}
              >
                <img
                  src={imageUrl}
                  alt={`Image ${index + 1}`}
                  className='w-full h-full object-cover rounded-md'
                />

                {/* Selection Indicator */}
                <div className='absolute inset-0 flex items-center justify-center bg-black/20 rounded-md'>
                  <div className='opacity-0 hover:opacity-100 transition-opacity'>
                    <Button
                      type='button'
                      size='sm'
                      variant='secondary'
                      className='text-xs'
                    >
                      <StarOff className='w-3 h-3 mr-1' />
                      Set as Thumbnail
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Current Thumbnail Display */}
      {thumbnail && (
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <Label className='text-base font-medium'>Current Thumbnail</Label>
            <Button
              type='button'
              variant='outline'
              size='sm'
              onClick={handleRemoveThumbnail}
              className='text-xs text-destructive hover:text-destructive'
            >
              <X className='w-3 h-3 mr-1' />
              Remove
            </Button>
          </div>

          <div className='relative w-32 h-32 rounded-lg border border-border overflow-hidden'>
            <img
              src={thumbnail}
              alt='Selected thumbnail'
              className='w-full h-full object-cover'
            />
            <Badge variant='primary' className='absolute top-2 left-2 text-xs'>
              <Star className='w-3 h-3 mr-1 fill-current' />
              Thumbnail
            </Badge>
          </div>
        </div>
      )}

      {/* Video Upload Section */}
      <div className='space-y-3'>
        <Label className='text-base font-medium'>
          Video <span className='text-destructive'>*</span>
        </Label>
        <Uploader
          maxFiles={1}
          maxSizeInMbs={50}
          allowVideoUpload
          allowImageUpload={false}
          setUrl={onVideoChange}
          videoUrl={video}
          removeUrl={handleVideoRemove}
        />
        <p className='text-sm text-muted-foreground'>
          Upload a video to showcase your activity.
        </p>
      </div>
    </div>
  );
}
