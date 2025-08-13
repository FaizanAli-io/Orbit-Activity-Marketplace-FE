import CTA from './(regular)/home/CTA';
import Discover from './(regular)/home/Discover';
import Hero from './(regular)/home/Hero';
import Marquee from './(regular)/home/Marquee';
import Oppurtunities from './(regular)/home/Oppurtunities';
import Navbar from './(regular)/layout/Navbar';

export default function Home() {
  return (
    <div className='h-screen'>
      <Navbar />
      <Hero />
      <Marquee />
      <Discover />
      <Oppurtunities />
      <CTA />
    </div>
  );
}
