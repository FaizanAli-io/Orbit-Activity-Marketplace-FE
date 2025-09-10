import { Skeleton } from '@/components/ui/skeleton';

const FormSkeleton = () => {
  return (
    <>
      <Skeleton className='w-56 h-10' />
      <div className='space-y-2 mb-5 mt-10'>
        <Skeleton className='w-15 h-5' />
        <Skeleton className='w-full h-10' />
      </div>
      <div className='space-y-2 mb-5 mt-10'>
        <Skeleton className='w-15 h-5' />
        <Skeleton className='w-full h-10' />
      </div>
      <div className='space-y-2'>
        <Skeleton className='w-15 h-5' />
        <Skeleton className='w-full h-72' />
      </div>

      <div className='flex justify-end my-20'>
        <Skeleton className='w-28 h-10' />
      </div>
    </>
  );
};

export default FormSkeleton;
