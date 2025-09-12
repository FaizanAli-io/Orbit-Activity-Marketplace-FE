'use client';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen animate-in fade-in-0 slide-in-from-bottom-4 duration-200'>
      {children}
    </div>
  );
}
