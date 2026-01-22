import type { Metadata } from 'next'
import Image from 'next/image'
import { Container } from '@/components/hero/container'
import Beam from '@/components/packages-components/Beam/Beam'
import PricingComponents from '@/components/pricing'
import CustomRequirement from '@/components/pricing/CustomRequirement'
import { PackageComparison } from '@/components/pricing/PackageComparison'
import IncludeCard from '../../../../components/pricing/IncludeCard'

export const metadata: Metadata = {
  title: 'Pricing Plans - Axis Acquisition | Transparent Web Development Costs',
  description:
    'Explore our transparent pricing for premium web development services. From $3,000 Standard packages to Enterprise solutions. AI-powered websites, 10-day delivery, lifetime support. Compare features and find your perfect plan.',
  keywords:
    'web development pricing, website cost calculator, business website packages, AI website pricing, custom web design cost, enterprise web solutions',
  openGraph: {
    title: 'Axis Acquisition Pricing - Premium Web Development Packages',
    description:
      'Transparent pricing from $3,000. AI-powered features, fast delivery, lifetime support. Compare Standard, Premium & Enterprise packages.',
    images: ['https://webapplica.com/og-pricing.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Axis Acquisition Pricing Plans',
    description:
      'Find the perfect web development package for your business. Starting at $3,000.',
  },
}

export default function PricingPage() {
  return (
    <div className="relative overflow-hidden py-10 md:py-0">
      <div className="flex flex-col justify-center items-center pt-20 md:pt-36 md:w-3/4 mx-auto">
        <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold text-center dark:text-gray-100 text-neutral-800">
          Landing Page Design Packages.
        </h1>
        <p className="text-neutral-700 py-10 dark:text-gray-300 px-10 font-semibold leading-5 text-sm text-center  md:text-xl">
          Landing pages are key to digital marketing success, turning curiosity
          into conversions. We design stunning, purpose-driven pages that
          deliver results, starting at just $900.
        </p>
      </div>
      <div className="relative">
        <div className="relative mx-auto max-w-container px-4 pt-16 sm:px-6 lg:px-8 lg:pt-20">
          <div className="mx-auto grid max-w-[40rem] grid-cols-1 gap-y-16 gap-x-8 lg:max-w-none lg:grid-cols-2">
            <div className="relative ">
              <Beam showBeam={true} />

              <Image
                src="/images/discuss.jpg"
                width="1000"
                height="1000"
                className="  grayscale  rounded-xl bg-slate-200 shadow-xl shadow-black/5 ring-1 ring-slate-900/5 lg:-mb-8 xl:-mb-16"
                alt="thumbnail"
              />
              <div className="z-0 hidden md:block">
                <div className="absolute -top-4 -right-12 -left-12 h-px bg-slate-900/[0.1] [mask-image:linear-gradient(to_right,transparent,white_4rem,white_calc(100%-4rem),transparent)]"></div>
                <div className="absolute -top-12 bottom-0 -left-4 w-px bg-slate-900/[0.1] [mask-image:linear-gradient(to_top,white_4rem,white_calc(100%-4rem),transparent)]"></div>
                <div className="absolute -top-12 right-10 mt-px flex h-8 items-end overflow-hidden">
                  <div className="flex -mb-px h-[2px] w-80 -scale-x-100">
                    <div className="w-full flex-none blur-sm [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
                    <div className="-ml-[100%] w-full flex-none blur-[1px] [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:pb-6">
              <h1 className="mt-4 text-3xl font-extrabold leading-none tracking-tight text-slate-900 dark:text-white sm:text-4xl  md:text-5xl sm:leading-[4rem]">
                Purpose-driven landing pages that captivate attention and
                generate leads.
              </h1>

              <p className="mt-6 text-base leading-7 xl:text-xl text-slate-700 dark:text-slate-300">
                We design engaging landing pages that continue your marketing
                story and help increase your conversions.
              </p>
              <p className=" text-base pt-10 leading-7 text-sky-500">
                Our landing page packages are custom-designed to refine your
                messaging, capture user data, and drive actionable engagement.
              </p>
              <div className="mt-10 flex gap-4">
                <a
                  href="#price"
                  className="inline-flex justify-center rounded-lg text-sm font-semibold py-3 px-4 bg-slate-900 text-white hover:bg-slate-700"
                  rel="noreferrer"
                >
                  <span>
                    <span className="inline-flex items-center">
                      <span>VIEW PACKAGES AND PRICES</span>
                      <svg
                        viewBox="0 0 20 20"
                        className="ml-1.5 h-5 w-5 fill-slate-400"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      >
                        <path d="M7 3.25H3.25v13.5h13.5V13h-1.5v2.25H4.75V4.75H7v-1.5Zm9.75 0H10v1.5h4.19l-5.72 5.72 1.06 1.06 5.72-5.72V10h1.5V3.25Z"></path>
                      </svg>
                    </span>
                  </span>
                </a>
              </div>
              <div className="hidden md:block">
                <Image
                  src="/images/bg-3.jpg"
                  width="1000"
                  height="1000"
                  className="rounded-xl mt-20 "
                  alt="thumbnail"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center pt-20 md:pt-44 md:w-11/12 mx-auto">
        <h1 className="text-2xl px-5 md:text-4xl xl:text-5xl font-bold text-center dark:text-gray-200 text-neutral-800">
          What&apos;s included in our Landing Page Packages.
        </h1>
        <p className="text-neutral-700 py-10 dark:text-gray-300 text-sm px-10  leading-7 text-center  md:text-xl">
          From simple to complex designs, our landing pages are crafted with the
          key elements to maximize user engagement. With years of experience
          creating tailored solutions for businesses worldwide, we apply the
          same proven frameworks to our landing page packages.
        </p>

        <IncludeCard />
      </div>

      <Container className="flex flex-col items-center justify-between  pb-20">
        <PricingComponents />
        <PackageComparison />
        <CustomRequirement />

        {/* <div className=" max-w-7xl ">
          <MacbookScroll src={`/mokp.png`} showGradient={true} />
        </div>
        <Companies /> */}
      </Container>
    </div>
  )
}
