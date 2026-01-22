import type { Metadata, NextPage } from 'next'
import Image from 'next/image'
import { Container } from '@/components/hero/container'
import Beam from '@/components/packages-components/Beam/Beam'
import { CallToAction } from '@/components/packages-components/CTA'
import { Products } from '@/components/packages-components/Products'
import { Testimonial } from '@/components/packages-components/Testimonial'
import { testimonials } from '@/components/packages-components/testimonials'
import ScrollToTopButton from '@/components/shared/ScrollTopButton'

export const metadata: Metadata = {
  title: 'Packages - Axis Acquisition',
  description:
    'Axis Acquisition is a platform that provides a wide range of AI tools and services to help you stay on top of your business. Generate images, text and everything else that you need to get your business off the ground.',
  openGraph: {
    images: ['https://ai-saas-template-webapplica.vercel.app/banner.png'],
  },
}

const PackagesPage: NextPage = () => {
  return (
    <Container className="py-20 max-w-[90rem] mx-auto">
      <div className="relative">
        <div className="relative mx-auto max-w-container px-4 pt-16 sm:px-6 lg:px-8 lg:pt-20">
          <div className="mx-auto grid max-w-[40rem] grid-cols-1 gap-y-16 gap-x-8 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col lg:pb-6">
              <h1 className="mt-4 text-4xl font-extrabold leading-none tracking-tight text-slate-900 dark:text-white sm:text-5xl sm:leading-[3.5rem]">
                $4,995
              </h1>
              <p className="order-first text-base font-semibold leading-7 text-sky-500">
                Landing Page Development
              </p>
              <p className="mt-6 text-base leading-7 text-slate-700 dark:text-slate-300">
                A landing page can make or break your business. We create
                world-class, professional landing pages that convert and help
                you achieve your sales targets.
              </p>

              <div className="mt-10 flex gap-4">
                <a
                  href="mailto:youremail@yourgmail.com"
                  className="inline-flex justify-center rounded-lg text-sm font-semibold py-3 px-4 bg-slate-900 text-white hover:bg-slate-700"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>
                    <span className="inline-flex items-center">
                      <span>Buy Package</span>
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
            </div>

            <div className="relative lg:col-span-2">
              <Beam showBeam={true} />

              <Image
                src="/images/products/webapplica.png"
                width="1600"
                height="1600"
                className=" -mb-36 aspect-[1600/1600]  rounded-xl bg-slate-200 shadow-xl shadow-black/5 ring-1 ring-slate-900/5 sm:-mb-16 lg:-mb-8 xl:-mb-16"
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
          </div>
        </div>
      </div>
      <WhatsIncluded />
      <div id="work" className=" max-w-6xl mx-auto antialiased">
        <h2 className="font-bold text-4xl text-center text-slate-700 dark:text-slate-100">
          Some of the websites that we have{' '}
          <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-pink-500 z-10">
            built
          </span>
        </h2>
        <p className="text-base text-slate-500 dark:text-slate-400 font-normal text-center max-w-2xl mx-auto my-4">
          A look at some of the amazing websites that we&apos;ve built recently.
        </p>

        <Products />
      </div>

      <Testimonial testimonial={testimonials[0]} />

      <CallToAction
        headerText={'Want a custom website or more features? Talk to us.'}
        bodyText={
          'See the blue chat box and the bottom? Click on it and talk to us. We will get back to you within 24 hours. Or just email us, just talk. :)'
        }
      />
      <ScrollToTopButton />
    </Container>
  )
}

const WhatsIncluded = () => {
  const details = [
    {
      id: 0,
      title: 'Top Notch Design',
      description:
        'We design great looking websites that stand out. We use the latest design trends and techniques to make your website look great.',
    },
    {
      id: 1,
      title: 'Development',
      description:
        'We build your website using the latest technologies and frameworks. We use the best tools to make sure your website is fast and secure.',
    },
    {
      id: 2,
      title: 'Performance Optimized',
      description:
        "We focus heavily on performance optimizations. Whether it's Image optimization or website load speed, we have got you covered.",
    },
    {
      id: 3,
      title: 'Responsive Design',
      description:
        'Your website will look amazing on any device. We make sure your website looks great on mobile, tablet, and desktop.',
    },
    {
      id: 4,
      title: 'Search Engine Optimized',
      description:
        'We make sure you get found on Google. We use the latest SEO techniques to make sure your website is optimized for search engines.',
    },
    {
      id: 6,
      title: 'Contact Forms',
      description:
        'We know that you want to get reached out. We make sure you get all the leads you need. We integrate your website with your favorite email marketing service.',
    },
    {
      id: 7,
      title: 'Revisions',
      description:
        'We make sure you are happy with the website. We provide revisions until you are happy with the website.',
    },
    {
      id: 8,
      title: 'Analytics and Tracking',
      description:
        'We make sure you know how your website is performing. We integrate your website with Google Analytics and Google Search Console.',
    },
    {
      id: 5,
      title: 'Built by experts',
      description:
        'We are the people behind websites like Algochurn and TailwindMasterKit. We have been building websites for over 5+ years now and we know what we are doing.',
    },
  ]
  return (
    <div className="mx-auto mt-52 w-full max-w-container px-4 pb-20 sm:mt-36 sm:px-6 sm:pb-24 lg:mt-28 lg:px-8 lg:pb-32 xl:mt-36">
      <div className="mx-auto max-w-[40rem] space-y-20 divide-y divide-slate-200 sm:space-y-24 lg:max-w-none lg:space-y-32">
        <section className="grid grid-cols-1 items-baseline gap-y-10 gap-x-6 lg:grid-cols-3">
          <h2 className="text-2xl font-semibold leading-9 tracking-tight text-slate-900 dark:text-white">
            What’s included
          </h2>
          <div className="max-w-2xl space-y-10 lg:col-span-2 prose prose-slate prose-a:font-semibold prose-a:text-sky-500 hover:prose-a:text-sky-600 ">
            {details.map((detail, idx) => (
              <p
                key={`detail-${idx}`}
                className="text-slate-700 dark:text-slate-400"
              >
                <span className="text-slate-900 dark:text-white">
                  {detail.title}
                </span>{' '}
                — {detail.description}
              </p>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default PackagesPage
