import { Suspense } from 'react';
import CTA from './(regular)/home/CTA';
import Discover from './(regular)/home/Discover';
import Hero from './(regular)/home/Hero';
import Marquee from './(regular)/home/Marquee';
import Oppurtunities from './(regular)/home/Oppurtunities';
import Footer from './(regular)/layout/Footer';
import Navbar from './(regular)/layout/Navbar';
import NavSkeleton from './(regular)/layout/Navbar/NavSkeleton';

export default function Home() {
  return (
    <div className='h-screen w-full'>
      <Suspense fallback={<NavSkeleton />}>
        <Navbar />
      </Suspense>
      <Hero />
      <Marquee />
      <Discover />
      <Oppurtunities />
      <CTA />
      <Footer />
    </div>
  );
}
