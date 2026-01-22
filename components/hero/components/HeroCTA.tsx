'use client'

import { CalButton } from '@/components/shared/CalButton'
import { Cpu, Globe } from 'lucide-react'

interface HeroCTAProps {
  onAIAutomationClick: () => void
  onWebsiteClick: () => void
}

export function HeroCTA({ onAIAutomationClick, onWebsiteClick }: HeroCTAProps) {
  return (
    <div className="w-full max-w-6xl mx-auto mt-12 mb-8">
      {/* Mobile Buttons - Hidden on desktop */}
      <div className="flex gap-3 px-4 sm:px-6 md:hidden">
        {/* AI & Automation Button */}
        <button
          onClick={onAIAutomationClick}
          className="flex-1 h-12 min-h-[3rem] rounded-lg bg-sage-900 dark:bg-sage-800 text-white border border-sage-800 dark:border-sage-700 shadow-sm transition-none font-semibold flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500"
        >
          <Cpu className="w-5 h-5" />
          <span className="text-base">Contact us</span>
        </button>

        {/* Book Call Button */}
        <CalButton
          variant="primary"
          size="lg"
          className="flex-1 h-12 min-h-[3rem] !rounded-lg !bg-sage-900 !text-white !border !border-sage-800 dark:!bg-sage-800 dark:!border-sage-700 !shadow-sm !transition-none hover:!shadow-sm hover:!scale-100 focus-visible:!outline-none focus-visible:!ring-2 focus-visible:!ring-sage-500"
        />
      </div>

      {/* Desktop Buttons Container - Hidden on mobile */}
      <div className="hidden md:flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-4 px-4 sm:px-6 lg:px-0">
        {/* AI & Automation Button */}
        <button
          onClick={onAIAutomationClick}
          className="w-fit h-12 min-h-[3rem] bg-sage-900 dark:bg-sage-800 hover:bg-sage-800 dark:hover:bg-sage-700 text-white shadow-lg hover:shadow-xl border border-sage-800 dark:border-sage-700 hover:border-sage-700 dark:hover:border-sage-600 transition-all duration-200 backdrop-blur-sm font-semibold rounded-xl px-6"
        >
          <div className="flex items-center justify-center gap-2">
            <Cpu className="w-4 h-4" />
            AI Automation
          </div>
        </button>

        {/* Website Development Button */}
        <button
          onClick={onWebsiteClick}
          className="w-fit h-12 min-h-[3rem] bg-sage-900 dark:bg-sage-800 hover:bg-sage-800 dark:hover:bg-sage-700 text-white shadow-lg hover:shadow-xl border border-sage-800 dark:border-sage-700 hover:border-sage-700 dark:hover:border-sage-600 transition-all duration-200 backdrop-blur-sm font-semibold rounded-xl px-6"
        >
          <div className="flex items-center justify-center gap-2">
            <Globe className="w-4 h-4" />
            Website
          </div>
        </button>

        {/* Book Call Button */}
        <div className="w-fit h-12">
          <CalButton
            variant="primary"
            size="md"
            className="h-full min-h-[3rem]"
          />
        </div>
      </div>
    </div>
  )
}
