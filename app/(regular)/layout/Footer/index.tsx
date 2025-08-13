import React from 'react';
import { data } from './links';
import Tagline from '@/components/ui/typography/Tagline';
import Link from 'next/link';
import Block from '@/app/layout/Block';
import Image from 'next/image';
import Newsletter from '../../home/Newsletter';

const Footer = () => {
  return (
    <Block>
      <footer className='divide-y space-y-10'>
        <Newsletter className='pb-10' />
        <div className='space-y-5 md:space-y-0 grid grid-cols-2 md:grid-cols-6 md:gap-x-5 pb-10'>
          {data.map((item, i) => (
            <ul key={i} className='space-y-1'>
              <Tagline className='font-semibold'>{item.title}</Tagline>
              {item.links.map(({ href, label }, j) => (
                <li key={j}>
                  <Link className='text-sm' href={href}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>

        <div className='flex flex-col items-center justify-center md:flex-row md:justify-between  pb-10'>
          <Image
            src='/images/logo.png'
            width={100}
            height={100}
            alt='Orbit Logo'
            className='md:-translate-x-5 w-18'
          />
          <p className='text-sm'>© 2025 Orbit. All rights reserved.</p>
        </div>
      </footer>
    </Block>
  );
};

export default Footer;
