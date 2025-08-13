import Image from 'next/image';
import Navbar from './(regular)/layout/Navbar';
import H1 from '@/components/ui/typography/H1';
import Button3D from '@/components/app/Button3D';

export default function Home() {
  return (
    <div className='h-screen'>
      <Navbar />
      <div className='grid place-content-center h-full'>
        {/* <H1 className='bg-primary-200'>Heading 1</H1> */}
        <Button3D variant={'outline'}>Explore</Button3D>
      </div>
    </div>
  );
}
