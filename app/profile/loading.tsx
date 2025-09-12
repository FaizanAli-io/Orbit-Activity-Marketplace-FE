import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className='h-[90vh] w-full grid place-content-center'>
      <Loader2 className='mr-2 h-20 w-20 animate-spin text-primary' />
    </div>
  );
}
