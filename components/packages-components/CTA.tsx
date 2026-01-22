'use client'

import React from 'react'
import { FormattedMessage } from 'react-intl'
// import { BlurImage } from "../blur-image";

export const CallToAction = ({ headerText, bodyText }: any) => {
  return (
    <div className="relative rounded-2xl bg-slate-800   mb-20 mt-20 text-gray-100 max-w-6xl  xl:mx-auto min-h-96 h-full  overflow-hidden pb-4">
      <div
        className="absolute inset-0 top-0  bg-grid-slate-700/50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(51 65 85 / 0.5)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
          maskImage:
            'linear-gradient(to bottom, transparent, white, transparent)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent, white, transparent)',
        }}
      ></div>

      <div className=" lg:grid lg:grid-cols-1 gap-10 p-2 md:p-8 relative z-20">
        <div className="text-center lg:text-left">
          <h2 className="text-2xl md:text-4xl font-bold my-4  text-center">
            {headerText || (
              <FormattedMessage
                id="cta.readyToStart"
                defaultMessage="Ready to start your project?"
              />
            )}
          </h2>
          <p className="my-4 text-base text-gray-300 md:text-lg tracking-wide font-light  text-center max-w-lg mx-auto">
            {bodyText || (
              <FormattedMessage
                id="cta.contactPromise"
                defaultMessage="Contact us and we will get back within 24 hours. We mean it."
              />
            )}
          </p>

          <div className="flex justify-center">
            <a
              href="mailto:youremail@yourgmail.com"
              className="inline-flex justify-center rounded-lg text-sm font-semibold py-3 px-4 bg-white/0 text-white ring-1 ring-slate-100 hover:bg-white/25 dark:hover:bg-slate-700 hover:ring-slate-900/15 mx-auto"
            >
              <FormattedMessage
                id="cta.contactUs"
                defaultMessage="Contact Us"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
