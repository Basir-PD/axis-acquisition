import { QuoteIcon } from 'lucide-react'
import React from 'react'

export default function Quote() {
  return (
    <BlockQuote
      quote="Crafting digital experiences isn’t just about building websites; it’s about weaving dreams into code, where each pixel meets purpose, and every line of code tells a story"
      author=""
    />
  )
}

const BlockQuote = ({ quote, author }: { quote: string; author: string }) => {
  return (
    <blockquote className="bg-amber-500/15 md:w-3/4 mx-4 md:mx-auto mb-10 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-l-4 border-amber-500/70 py-2 px-4 rounded-xl">
      <p className="inline italic">
        <QuoteIcon
          aria-hidden="true"
          className="size-3 mr-1 fill-amber-700 stroke-none -translate-y-1 inline"
        />
        {quote}
        <QuoteIcon
          aria-hidden="true"
          className="size-3 ml-1 fill-amber-700 stroke-none translate-y-1 inline"
        />
      </p>
      <p className="text-sm text-end tracking-tighter italic font-semibold mt-1.5">
        {author}
      </p>
    </blockquote>
  )
}
