import Hero from './(regular)/home/Hero';
import Marquee from './(regular)/home/Marquee';
import Navbar from './(regular)/layout/Navbar';

export default function Home() {
  return (
    <div className='h-screen'>
      <Navbar />
      <Hero />
      <Marquee />
    </div>
  );
}
