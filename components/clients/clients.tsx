'use client'
import React, { useState } from 'react'
import Marquee from 'react-fast-marquee'
import { BlurImage } from '../shared/blur-image'

export const Clients = () => {
  const [logos] = useState([
    {
      title: 'virison',
      src: '/logos/logo-1.png',
    },
    {
      title: 'Nexora',
      src: '/logos/nexora.png',
    },

    {
      title: 'air',
      src: '/logos/air.png',
    },

    {
      title: 'Hilton',
      src: '/logos/cognizant.svg',
    },
    {
      title: 'unify',
      src: '/logos/unify.svg',
    },
    {
      title: 'OrinVista',
      src: '/logos/logo-2.png',
    },
  ])

  return (
    <div className=" mt-0 md:mt-10  flex flex-col gap-10 items-center">
      <h2 className="text-xl lg:text-2xl text-black dark:text-white text-center  whitespace-nowrap pl-5">
        Our Clients:
      </h2>
      <div className="flex justify-center gap-4 max-w-7xl mx-auto relative">
        <div className="absolute inset-0 bg-charcoal dark:grayscale z-40 pointer-events-none [mask-image:_radial-gradient(circle,_transparent_10%,_#000000_100%)]" />
        <Marquee>
          {logos.map((logo, idx) => (
            <LogoContainer key={logo.title + idx} logo={logo} />
          ))}
        </Marquee>
      </div>
    </div>
  )
}

function LogoContainer({ logo }: { logo: { title: string; src: string } }) {
  return (
    <BlurImage
      src={logo.src}
      alt={logo.title}
      width={120}
      height={120}
      className=" mx-8 md:mx-14 object-contain w-[60px] h-[60px] md:w-[90px] md:h-[90px] grayscale hover:grayscale-0 transition duration-200"
    />
  )
}
