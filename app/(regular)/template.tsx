'use client';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className='animate-in fade-in-0 slide-in-from-bottom-2 duration-200'>
      {children}
    </div>
  );
}
