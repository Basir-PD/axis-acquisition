'use client'

import { Leaf } from 'lucide-react'
import Link from 'next/link'

interface LogoProps {
  visible?: boolean
}

export default function Logo({ visible = false }: LogoProps) {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      {/* Logo Icon */}
      <div
        className={`flex items-center justify-center rounded-xl bg-sage-600 dark:bg-sage-500 transition-all duration-300 ${
          visible ? 'w-9 h-9' : 'w-10 h-10'
        }`}
      >
        <Leaf
          className={`text-white transition-all duration-300 ${
            visible ? 'w-5 h-5' : 'w-6 h-6'
          }`}
        />
      </div>

      {/* Logo Text */}
      <div className="flex flex-col">
        <span
          className={`font-serif font-bold text-sage-900 dark:text-cream-50 leading-none transition-all duration-300 ${
            visible ? 'text-lg' : 'text-xl'
          }`}
        >
          Axis
        </span>
        <span
          className={`font-sans text-stone-500 dark:text-stone-400 leading-none tracking-wider uppercase transition-all duration-300 ${
            visible ? 'text-[9px]' : 'text-[10px]'
          }`}
        >
          Integrative Health
        </span>
      </div>
    </Link>
  )
}
