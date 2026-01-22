import React from 'react'
import { IconMail, IconPhone } from '@tabler/icons-react'

export default function ContactCard() {
  return (
    <div className=" w-full md:w-[50vw] mt-8 mx-auto backdrop-blur-lg bg-white/80 dark:bg-neutral-900/20 bg-opacity-20 rounded-xl shadow-lg overflow-hidden">
      <div className="md:flex justify-center items-center">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 text-center dark:text-white mb-3">
            Get in Touch
          </h2>
          <p className="text-xs md:text-sm text-center text-gray-800 dark:text-gray-50 mb-4">
            Let&apos;s collaborate to turn your vision into reality <br /> reach
            out and take the first step toward building something extraordinary
            together!
          </p>
          <div className="space-y-3 flex flex-col justify-center items-center">
            <div className="flex items-center space-x-3 text-gray-800 dark:text-gray-50">
              <IconPhone className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-xs md:text-sm">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-800 dark:text-gray-50">
              <IconMail className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-xs md:text-sm">hello@example.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
