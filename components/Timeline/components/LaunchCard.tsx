'use client'

import { FormattedMessage } from 'react-intl'
import Lottie from 'react-lottie'
import checkmarkAnimation from '@/public/images/projectWalkthrough/checkmark.json'
import { IpadCard } from './IpadCard'

const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData: checkmarkAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
  animationSpeed: 1.5,
}

export function LaunchCard() {
  return (
    <IpadCard>
      <div className="flex justify-center w-full h-full p-1 md:p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900 rounded-xl">
        <div className="flex flex-col justify-center items-center rounded-lg h-full my-auto max-w-xs sm:max-w-sm">
          <Lottie options={lottieOptions} height={80} width={80} />
          <h3 className="text-base sm:text-xl xl:text-2xl text-center font-semibold text-gray-800 dark:text-gray-200 mb-3">
            <FormattedMessage
              id="launch.title"
              defaultMessage="Your Website is Launched!"
            />
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-center text-xs sm:text-sm md:text-base px-2 sm:px-4 lg:px-8 mb-3">
            <FormattedMessage
              id="launch.congratulations"
              defaultMessage="Congratulations! Your new website is now {live} and ready to make an {impact}."
              values={{
                live: (
                  <span className="font-bold">
                    <FormattedMessage id="launch.live" defaultMessage="live" />
                  </span>
                ),
                impact: (
                  <span className="font-bold">
                    <FormattedMessage
                      id="launch.impact"
                      defaultMessage="impact"
                    />
                  </span>
                ),
              }}
            />
          </p>
          <a
            href="https://www.yourwebsite.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-700 dark:text-indigo-400 text-sm sm:text-base hover:underline"
          >
            <FormattedMessage
              id="launch.websiteUrl"
              defaultMessage="www.yourwebsite.com"
            />
          </a>
        </div>
      </div>
    </IpadCard>
  )
}
