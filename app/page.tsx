import Image from 'next/image';
import Navbar from './(regular)/layout/Navbar';

export default function Home() {
  return (
    <div className='h-screen'>
      <Navbar />
      <div className='grid place-content-center h-full'>
        <h1 className='text-9xl font-bold text-center uppercase -translate-y-[80%]'>
          ORBIT
        </h1>
      </div>
    </div>
  );
}
