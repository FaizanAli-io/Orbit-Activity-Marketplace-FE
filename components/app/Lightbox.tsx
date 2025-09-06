'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  thumbnail?: string;
  alt: string;
  width: number;
  height: number;
}

interface CustomLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  items: MediaItem[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function Lightbox({
  isOpen,
  onClose,
  items,
  currentIndex,
  onPrevious,
  onNext,
}: CustomLightboxProps) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
      }
    },
    [isOpen, onClose, onPrevious, onNext]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];

  return (
    <div className='fixed inset-0 z-50 bg-black/90 flex items-center justify-center'>
      {/* Close button */}
      <button
        onClick={onClose}
        className='absolute top-4 right-4 z-10 p-2 text-white hover:bg-white/20 rounded-full transition-colors'
        aria-label='Close lightbox'
      >
        <X className='w-6 h-6' />
      </button>

      {/* Previous button */}
      {items.length > 1 && (
        <button
          onClick={onPrevious}
          className='absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white hover:bg-white/20 rounded-full transition-colors'
          aria-label='Previous image'
        >
          <ChevronLeft className='w-8 h-8' />
        </button>
      )}

      {/* Next button */}
      {items.length > 1 && (
        <button
          onClick={onNext}
          className='absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white hover:bg-white/20 rounded-full transition-colors'
          aria-label='Next image'
        >
          <ChevronRight className='w-8 h-8' />
        </button>
      )}

      {/* Main content */}
      <div className='relative w-full h-full flex items-center justify-center p-4'>
        {currentItem.type === 'image' ? (
          <div className='relative w-full h-full max-w-[95vw] max-h-[95vh]'>
            <Image
              src={currentItem.src || '/placeholder.svg'}
              alt={currentItem.alt}
              fill
              className='object-contain'
              priority
              sizes='95vw'
            />
          </div>
        ) : (
          <video
            src={currentItem.src}
            controls
            className='w-full h-full max-w-[95vw] max-h-[95vh] object-contain'
            autoPlay
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {/* Counter */}
      {items.length > 1 && (
        <div className='absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm'>
          {currentIndex + 1} / {items.length}
        </div>
      )}

      {/* Background overlay - clicking closes lightbox */}
      <div
        className='absolute inset-0 -z-10'
        onClick={onClose}
        aria-label='Close lightbox'
      />
    </div>
  );
}
