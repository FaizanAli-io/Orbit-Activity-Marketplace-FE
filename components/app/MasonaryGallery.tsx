'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Masonry from 'react-masonry-css';
import { Play, Plus, Loader2 } from 'lucide-react';
import { Lightbox } from './Lightbox';
import clsx from 'clsx';

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  thumbnail?: string;
  alt: string;
  width: number;
  height: number;
}

interface MasonryGalleryProps {
  items: MediaItem[];
  showMoreCount?: number;
}

export function MasonryGallery({
  items,
  showMoreCount = 0,
}: MasonryGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [loadingItems, setLoadingItems] = useState<Record<string, boolean>>({});

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const showLimit =
    showMoreCount > 0 && !expanded ? showMoreCount : items.length;
  const displayItems = items.slice(0, showLimit);
  const hiddenItemCount = items.length - showLimit;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const goToPrevious = () =>
    setLightboxIndex(prev => (prev > 0 ? prev - 1 : items.length - 1));

  const goToNext = () =>
    setLightboxIndex(prev => (prev < items.length - 1 ? prev + 1 : 0));

  const handleLoad = (id: string) => {
    setLoadingItems(prev => ({ ...prev, [id]: false }));
  };

  const handleStartLoading = (id: string) => {
    setLoadingItems(prev => ({ ...prev, [id]: true }));
  };

  // Mark videos as "loaded" since solid bg doesn't trigger load event
  useEffect(() => {
    const updated: Record<string, boolean> = {};
    items.forEach(item => {
      if (item.type === 'video' && loadingItems[item.id] === undefined) {
        updated[item.id] = false;
      }
    });

    if (Object.keys(updated).length > 0) {
      setLoadingItems(prev => ({ ...prev, ...updated }));
    }
  }, [items, loadingItems]);

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className='flex w-auto -ml-4'
        columnClassName='pl-4 bg-clip-padding'
      >
        {displayItems.map((item, index) => {
          const isLoading = loadingItems[item.id] !== false;

          return (
            <div
              key={item.id}
              className='mb-4 relative group cursor-pointer overflow-hidden rounded-lg hover:shadow-lg transition-all duration-300'
              onClick={() => openLightbox(index)}
              role='button'
              tabIndex={0}
            >
              <div className='relative aspect-auto'>
                {isLoading && (
                  <div className='absolute inset-0 z-10 flex items-center justify-center bg-white/60'>
                    <Loader2 className='w-6 h-6 text-gray-500 animate-spin' />
                  </div>
                )}

                {item.type === 'image' ? (
                  <Image
                    src={item.src || '/placeholder.svg'}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    className={clsx(
                      'w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105',
                      isLoading ? 'opacity-0' : 'opacity-100'
                    )}
                    sizes='(max-width: 500px) 100vw, (max-width: 700px) 50vw, (max-width: 1100px) 33vw, 25vw'
                    onLoadStart={() => handleStartLoading(item.id)}
                    onLoadingComplete={() => handleLoad(item.id)}
                  />
                ) : (
                  <>
                    <div className='w-full h-[150px] bg-primary'></div>
                    <div className='absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors'>
                      <div className='bg-white/90 rounded-full p-3 group-hover:bg-white group-hover:scale-110 transition-all shadow-lg'>
                        <Play
                          className='w-6 h-6 text-gray-800 ml-1'
                          fill='currentColor'
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}

        {!expanded && hiddenItemCount > 0 && (
          <div
            className='mb-4 relative group cursor-pointer overflow-hidden rounded-lg hover:shadow-lg transition-all duration-300'
            onClick={() => setExpanded(true)}
            role='button'
            tabIndex={0}
          >
            <div className='relative aspect-square bg-gray-100 flex items-center justify-center'>
              <div className='text-center p-4'>
                <Plus className='w-8 h-8 mx-auto mb-2 text-gray-600 group-hover:text-gray-800 transition-colors' />
                <span className='text-lg font-semibold text-gray-700 group-hover:text-gray-900 transition-colors'>
                  +{hiddenItemCount} more
                </span>
              </div>
            </div>
          </div>
        )}
      </Masonry>

      <Lightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        items={items}
        currentIndex={lightboxIndex}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />
    </>
  );
}
